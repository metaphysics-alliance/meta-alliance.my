#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve } from 'path';

import { dictionary } from '../shared/i18n/dictionary.js';

// ---------------------------------------------------------------------------
// Environment helpers
// ---------------------------------------------------------------------------

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
const anonKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const email = process.env.VITE_SUPABASE_EMAIL;
const password = process.env.VITE_SUPABASE_PASSWORD;

if (!url || !anonKey) {
  console.error('Missing Supabase URL or anon key in .env.local');
  process.exit(1);
}

const supabase = createClient(url, anonKey);

// ---------------------------------------------------------------------------
// Utility helpers
// ---------------------------------------------------------------------------

const normalizedTables = [
  'pricing_metadata',
  'pricing_sections',
  'pricing_items',
  'pricing_addons',
  'pricing_notice_points',
  'pricing_fine_print',
];

function isMissingRelation(error) {
  const message = error?.message?.toLowerCase?.() ?? '';
  return (
    message.includes('relation') && message.includes('does not exist')
  ) || message.includes('could not find the table') || error?.code === 'PGRST205';
}

function isRLSError(error) {
  const message = error?.message?.toLowerCase?.() ?? '';
  return message.includes('row-level security');
}

async function tableExists(table) {
  try {
    const { error } = await supabase.from(table).select('*').limit(1);
    if (!error) return true;
    if (isMissingRelation(error)) return false;
    if (isRLSError(error)) {
      throw new Error(`RLS prevented access to ${table}. Grant the authenticated role full access before seeding.`);
    }
    throw error;
  } catch (err) {
    if (isMissingRelation(err)) return false;
    throw err;
  }
}

function ensureArray(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value.map((item) => (item == null ? '' : String(item)));
  return [String(value)];
}

function extractCurrencyObject(value) {
  if (!value) return { myr: null, usd: null };
  if (typeof value === 'object') {
    return {
      myr: value?.myr ?? value?.MYR ?? null,
      usd: value?.usd ?? value?.USD ?? null,
    };
  }
  const text = String(value);
  const lower = text.toLowerCase();
  if (lower.includes('usd')) {
    return { myr: null, usd: text };
  }
  if (lower.includes('myr') || lower.includes('rm')) {
    return { myr: text, usd: null };
  }
  return { myr: text, usd: null };
}

// ---------------------------------------------------------------------------
// Auth helpers
// ---------------------------------------------------------------------------

async function ensureSession() {
  // When using a service role key, we don't need an auth session; RLS is bypassed.
  if (process.env.VITE_SUPABASE_SERVICE_ROLE_KEY) {
    console.log('Using service role key; skipping email/password sign-in.');
    return;
  }

  if (!email || !password) {
    console.warn('No Supabase email/password in env; skipping sign-in (anon session only).');
    return;
  }

  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (authError) {
    console.warn('Supabase email/password sign-in failed; proceeding without auth session:', authError.message);
    return;
  }
  console.log('Signed in as', authData.user?.email);
}

// ---------------------------------------------------------------------------
// Legacy JSON snapshot (pricing_content)
// ---------------------------------------------------------------------------

function buildLegacyRows() {
  const locales = Object.keys(dictionary).filter((locale) => dictionary[locale]?.pricing);
  if (!locales.length) {
    throw new Error('No pricing content found in shared dictionary.');
  }
  return locales.map((locale) => {
    const pricing = dictionary[locale].pricing;
    return {
      locale,
      content: pricing ?? {},
      currency_pair: pricing?.currencyPair ?? pricing?.currency_pair ?? 'MYR/USD',
      published: true,
    };
  });
}

async function upsertLegacyRows(rows) {
  const { data, error } = await supabase
    .from('pricing_content')
    .upsert(rows, { onConflict: 'locale' })
    .select('locale, updated_at');

  if (error) {
    if (isMissingRelation(error)) {
      console.warn('pricing_content table does not exist; skipping legacy snapshot upsert.');
      return;
    }
    throw error;
  }

  if (!data?.length) {
    console.log('Legacy pricing_content table available but no rows upserted.');
    return;
  }

  console.log('Upserted pricing_content rows:');
  for (const row of data) {
    console.log(`- ${row.locale} (updated ${row.updated_at})`);
  }
}

// ---------------------------------------------------------------------------
// Normalized seeding helpers
// ---------------------------------------------------------------------------

async function seedMetadata(locale, pricing) {
  const payload = {
    locale,
    hero_title: pricing?.heroTitle ?? null,
    hero_subtitle: pricing?.heroSubtitle ?? null,
    hero_description: pricing?.heroDescription ?? null,
    cta_label: pricing?.cta?.label ?? null,
    cta_href: pricing?.cta?.href ?? null,
    currency_note: pricing?.currencyNote ?? null,
    currency_pair: pricing?.currencyPair ?? pricing?.currency_pair ?? 'MYR/USD',
    default_currency: pricing?.defaultCurrency ?? null,
    notice_title: pricing?.noticeTitle ?? null,
    add_ons_title: pricing?.addOnsTitle ?? null,
    fine_print_title: pricing?.finePrintTitle ?? null,
  };

  const { error } = await supabase.from('pricing_metadata').upsert(payload, { onConflict: 'locale' });
  if (error) throw error;
}

async function seedSectionsAndItems(locale, pricing) {
  const categories = Array.isArray(pricing?.categories) ? pricing.categories : [];

  await supabase.from('pricing_items').delete().eq('locale', locale);
  await supabase.from('pricing_sections').delete().eq('locale', locale);

  for (let index = 0; index < categories.length; index += 1) {
    const category = categories[index];
    if (!category?.title) continue;

    const sectionPayload = {
      locale,
      key: category.key ?? `section_${index + 1}`,
      title: category.title,
      subtitle: category.subtitle ?? null,
      description: category.description ?? null,
      order_index: index,
    };

    const { data: sectionRows, error: sectionError } = await supabase
      .from('pricing_sections')
      .insert(sectionPayload)
      .select('id')
      .single();

    if (sectionError) throw sectionError;
    const sectionId = sectionRows.id;
    const tiers = Array.isArray(category.tiers) ? category.tiers : [];

    if (!tiers.length) continue;

    const itemsPayload = tiers.map((tier, tierIndex) => {
      const priceObj = extractCurrencyObject(tier.price);
      const cadenceObj = extractCurrencyObject(tier.cadence);
      return {
        locale,
        section_id: sectionId,
        name: tier.name ?? `Tier ${tierIndex + 1}`,
        price_myr: priceObj.myr,
        price_usd: priceObj.usd,
        cadence_myr: cadenceObj.myr,
        cadence_usd: cadenceObj.usd,
        href: tier.href ?? null,
        features: ensureArray(tier.features),
        order_index: tierIndex,
      };
    });

    const { error: itemsError } = await supabase.from('pricing_items').insert(itemsPayload);
    if (itemsError) throw itemsError;
  }
}

async function seedAddOns(locale, pricing) {
  const addOns = Array.isArray(pricing?.addOns) ? pricing.addOns : [];

  await supabase.from('pricing_addons').delete().eq('locale', locale);

  if (!addOns.length) return;

  const payload = addOns.map((addOn, index) => {
    const priceObj = extractCurrencyObject(addOn.price);
    return {
      locale,
      name: addOn.name ?? `Add-on ${index + 1}`,
      price_myr: priceObj.myr,
      price_usd: priceObj.usd,
      features: ensureArray(addOn.features),
      order_index: index,
    };
  });

  const { error } = await supabase.from('pricing_addons').insert(payload);
  if (error) throw error;
}

async function seedNoticePoints(locale, pricing) {
  const points = Array.isArray(pricing?.noticePoints) ? pricing.noticePoints : [];

  await supabase.from('pricing_notice_points').delete().eq('locale', locale);

  if (!points.length) return;

  const payload = points.map((body, index) => ({
    locale,
    body: String(body),
    order_index: index,
  }));

  const { error } = await supabase.from('pricing_notice_points').insert(payload);
  if (error) throw error;
}

async function seedFinePrint(locale, pricing) {
  const entries = Array.isArray(pricing?.finePrint) ? pricing.finePrint : [];

  await supabase.from('pricing_fine_print').delete().eq('locale', locale);

  if (!entries.length) return;

  const payload = entries.map((body, index) => ({
    locale,
    body: String(body),
    order_index: index,
  }));

  const { error } = await supabase.from('pricing_fine_print').insert(payload);
  if (error) throw error;
}

async function seedNormalizedRows(rows) {
  const availability = await Promise.all(normalizedTables.map((table) => tableExists(table).catch((err) => {
    if (isMissingRelation(err)) return false;
    throw err;
  })));

  const missing = normalizedTables.filter((_, index) => !availability[index]);
  if (missing.length) {
    console.log('Skipping normalized pricing tables; missing tables:', missing.join(', '));
    console.log('Run the SQL migration from docs/pricing-supabase-schema.md and re-run this script.');
    return;
  }

  for (const row of rows) {
    const locale = row.locale;
    const pricing = dictionary[locale]?.pricing;
    if (!pricing) continue;

    await seedMetadata(locale, pricing);
    await seedSectionsAndItems(locale, pricing);
    await seedAddOns(locale, pricing);
    await seedNoticePoints(locale, pricing);
    await seedFinePrint(locale, pricing);
  }

  console.log('Normalized pricing tables seeded successfully.');
}

// ---------------------------------------------------------------------------
// Main execution flow
// ---------------------------------------------------------------------------

async function main() {
  await ensureSession();
  const rows = buildLegacyRows();

  await upsertLegacyRows(rows);
  await seedNormalizedRows(rows);
}

main().catch((err) => {
  console.error('Failed to seed pricing content:', err);
  process.exit(1);
});
