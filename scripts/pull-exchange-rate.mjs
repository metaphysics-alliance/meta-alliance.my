#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve } from 'path';

function loadEnvFile(path = '.env.local') {
  try {
    const absolute = resolve(path);
    const content = readFileSync(absolute, 'utf8');
    content
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('#'))
      .forEach((line) => {
        const index = line.indexOf('=');
        if (index === -1) return;
        const key = line.slice(0, index).trim();
        let value = line.slice(index + 1).trim();
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        if (!process.env[key]) {
          process.env[key] = value;
        }
      });
  } catch (err) {
    console.warn(`Could not read ${path}:`, err.message);
  }
}

loadEnvFile();

const url = process.env.VITE_SUPABASE_URL;
const anonKey = process.env.VITE_SUPABASE_ANON_KEY;
const email = process.env.VITE_SUPABASE_EMAIL;
const password = process.env.VITE_SUPABASE_PASSWORD;

if (!url || !anonKey) {
  console.error('Missing Supabase URL or anon key in .env.local');
  process.exit(1);
}

const supabase = createClient(url, anonKey);

async function ensureSession() {
  if (!email || !password) {
    console.warn('No Supabase email/password in env; skipping sign-in (anon session only).');
    return;
  }
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    throw error;
  }
}

function parsePair(input) {
  const pair = (input || 'USD/MYR').toUpperCase().trim();
  const parts = pair.split('/');
  if (parts.length !== 2 || !parts[0] || !parts[1]) {
    throw new Error(`Invalid currency pair "${input}". Expected format BASE/QUOTE, e.g. USD/MYR.`);
  }
  return { pair, base: parts[0], quote: parts[1] };
}

async function fetchRate(base, quote) {
  const endpoint = `https://open.er-api.com/v6/latest/${encodeURIComponent(base)}`;
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`Failed to fetch rate from ${endpoint} (${response.status} ${response.statusText})`);
  }
  const payload = await response.json();
  if (payload?.result !== 'success') {
    throw new Error(`Exchange API error: ${payload?.error_type || 'unknown error'}`);
  }
  const rate = payload?.rates?.[quote];
  if (typeof rate !== 'number') {
    throw new Error(`No ${quote} rate found for ${base} in API response.`);
  }
  const capturedAt = payload.time_last_update_utc
    ? new Date(payload.time_last_update_utc).toISOString()
    : new Date().toISOString();
  return { rate, capturedAt, source: 'open.er-api.com' };
}

function getDayBounds(isoTimestamp) {
  const start = new Date(isoTimestamp);
  start.setUTCHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 1);
  return { start: start.toISOString(), end: end.toISOString() };
}

async function upsertRate(pair, rate, capturedAt, source) {
  const { start, end } = getDayBounds(capturedAt);

  const { error: deleteError } = await supabase
    .from('currency_rates')
    .delete()
    .eq('pair', pair)
    .gte('captured_at', start)
    .lt('captured_at', end);

  if (deleteError && deleteError.code !== 'PGRST116') {
    throw deleteError;
  }

  const { data, error } = await supabase
    .from('currency_rates')
    .insert({
      pair,
      rate,
      captured_at: capturedAt,
      source,
    })
    .select('id, captured_at')
    .single();

  if (error) {
    if (error.message?.toLowerCase?.().includes('relation') && error.message?.includes('does not exist')) {
      console.warn('currency_rates table is missing. Run the SQL migration and try again.');
      return;
    }
    throw error;
  }

  console.log(`Stored ${pair} rate ${rate} at ${data.captured_at}`);
}

async function main() {
  const { pair, base, quote } = parsePair(process.argv[2]);
  await ensureSession();
  const { rate, capturedAt, source } = await fetchRate(base, quote);
  await upsertRate(pair, rate, capturedAt, source);
}

main().catch((err) => {
  console.error('Failed to pull exchange rate:', err);
  process.exit(1);
});

