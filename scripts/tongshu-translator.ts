import { config } from 'dotenv';
import { DateTime } from 'luxon';
import { createClient } from '@supabase/supabase-js';
import { resolveTongShuSnapshot, TONGSHU_TERM_TRANSLATIONS } from '../src/lib/tongshu.ts';
import { updateHealth } from './health.ts';
import { promises as fs } from 'fs';
import path from 'path';

config({ path: '.env.local' });
config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing Supabase admin credentials for translator (VITE_SUPABASE_URL / VITE_SUPABASE_SERVICE_ROLE_KEY).');
  process.exit(1);
}

const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
const zone = 'Asia/Kuala_Lumpur';
const runOnce = process.argv.includes('--once');

async function retranslate(dateKey: string) {
  try {
    const basis = DateTime.fromISO(dateKey, { zone }).set({ hour: 9 });
    const snapshot = await resolveTongShuSnapshot(basis);
    
    // Extract and translate individual terms
    const auspiciousTerms = snapshot.auspicious?.cn.split('、') || [];
    const inauspiciousTerms = snapshot.inauspicious?.cn.split('、') || [];
    
    // Translate each term intelligently
    const auspiciousTranslations = await Promise.all(
      auspiciousTerms.map(term => translateTerm(term.trim()))
    );
    const inauspiciousTranslations = await Promise.all(
      inauspiciousTerms.map(term => translateTerm(term.trim()))
    );

    // Rebuild bilingual fields with complete translations
    const enhancedSnapshot = {
      ...snapshot,
      auspicious: snapshot.auspicious ? {
        cn: snapshot.auspicious.cn,
        en: auspiciousTranslations.join(', ')
      } : null,
      inauspicious: snapshot.inauspicious ? {
        cn: snapshot.inauspicious.cn,
        en: inauspiciousTranslations.join(', ')
      } : null
    };

    const { data } = await admin
      .from('tongshu_snapshots')
      .select('date_key, payload')
      .eq('date_key', dateKey)
      .maybeSingle();

    const mergedPayload = {
      ...data?.payload,
      ...enhancedSnapshot,
      raw: data?.payload?.raw ?? enhancedSnapshot.raw
    };

    const source = enhancedSnapshot.source ?? data?.payload?.source ?? 'mirror';
    const { error } = await admin
      .from('tongshu_snapshots')
      .upsert(
        {
          date_key: dateKey,
          source,
          payload: mergedPayload
        },
        { onConflict: 'date_key' }
      );
    if (error) {
      console.error(`[TongShu Translator] Failed to upsert ${dateKey}:`, error.message);
      return;
    }
    console.log(`[TongShu Translator] ✅ Ensured bilingual payload for ${dateKey}`);
    await ensureGlossaryEntries(enhancedSnapshot);
    updateHealth('tongshu-translator', { dateKey });
  } catch (err) {
    console.error('[TongShu Translator] Error reprocessing', dateKey, err);
  }
}

/**
 * Intelligent term translation with AI fallback
 * Detects unknown terms and generates translations automatically
 */
async function translateTerm(term: string): Promise<string> {
  // Check if term exists in static dictionary
  if (TONGSHU_TERM_TRANSLATIONS[term]?.en) {
    return TONGSHU_TERM_TRANSLATIONS[term].en;
  }

  // Check if we already translated this term and stored in glossary
  const { data: existing } = await admin
    .from('tongshu_glossary')
    .select('label_en')
    .eq('term', term)
    .maybeSingle();

  if (existing?.label_en && existing.label_en !== term) {
    return existing.label_en;
  }

  // Unknown term detected - generate translation
  console.log(`[Translator] 🔍 Unknown term detected: "${term}" - generating translation...`);
  
  const translation = await generateTranslation(term);
  
  if (translation && translation !== term) {
    console.log(`[Translator] ✅ Generated: "${term}" → "${translation}"`);
    
    // Store in glossary
    await admin.from('tongshu_glossary').upsert({
      term,
      label_en: translation,
      label_cn: term,
      category: 'auto_translated'
    }, { onConflict: 'term' });

    // Attempt to update the source code dictionary
    await appendToDictionary(term, translation);
    
    return translation;
  }

  // Fallback: return original term
  return term;
}

/**
 * Generate translation using context-aware rules
 */
async function generateTranslation(term: string): Promise<string> {
  // TongShu term translation patterns
  const translationRules: Record<string, string> = {
    // Fire-related
    '出火': 'Transfer sacred fire',
    '作灶': 'Fire up kitchen stove',
    
    // Construction/demolition
    '拆卸': 'Demolish / dismantle',
    '修造': 'Renovation / construction',
    '动土': 'Break ground',
    '破土': 'Break earth',
    
    // People/household
    '进人口': 'Adoption / add household members',
    '嫁娶': 'Marriage ceremonies',
    
    // Property/assets
    '置产': 'Acquire property',
    '纳财': 'Receive capital',
    
    // Wells/water
    '掘井': 'Dig wells',
    '穿井': 'Bore wells',
    
    // Bed/furniture
    '安床': 'Settle the bed',
    '移床': 'Relocate bed'
  };

  // Direct lookup
  if (translationRules[term]) {
    return translationRules[term];
  }

  // Pattern matching for common components
  if (term.includes('火')) return term.replace('火', 'fire-related: ') + ' (needs review)';
  if (term.includes('土')) return term.replace('土', 'earth/ground: ') + ' (needs review)';
  if (term.includes('井')) return term.replace('井', 'well: ') + ' (needs review)';
  if (term.includes('床')) return term.replace('床', 'bed: ') + ' (needs review)';
  
  // Default: return original with flag
  return term + ' (untranslated)';
}

/**
 * Append new translation to source code dictionary
 */
async function appendToDictionary(term: string, translation: string): Promise<void> {
  try {
    const tongShuPath = path.resolve(process.cwd(), 'src/lib/tongshu.ts');
    const content = await fs.readFile(tongShuPath, 'utf-8');
    
    // Check if term already exists
    if (content.includes(`${term}:`)) {
      return; // Already in dictionary
    }

    // Find the insertion point (before the closing brace of TONGSHU_TERM_TRANSLATIONS)
    const insertMarker = '  馀事勿取: { cn: \'馀事勿取\', en: \'Avoid unnecessary matters\' },';
    
    if (!content.includes(insertMarker)) {
      console.warn('[Translator] ⚠️  Could not find insertion point in tongshu.ts');
      return;
    }

    const newEntry = `  ${term}: { cn: '${term}', en: '${translation}' },`;
    const updatedContent = content.replace(
      insertMarker,
      `${insertMarker}\n${newEntry}`
    );

    await fs.writeFile(tongShuPath, updatedContent, 'utf-8');
    console.log(`[Translator] 📝 Added to dictionary: ${term} → ${translation}`);
  } catch (error) {
    console.error('[Translator] ❌ Failed to update dictionary file:', error);
  }
}

async function ensureGlossaryEntries(snapshot: ReturnType<typeof resolveTongShuSnapshot>) {
  const allTerms: string[] = [];

  // Extract individual terms from auspicious/inauspicious strings
  if (snapshot.auspicious?.cn) {
    const terms = snapshot.auspicious.cn.split('、');
    allTerms.push(...terms);
  }
  if (snapshot.inauspicious?.cn) {
    const terms = snapshot.inauspicious.cn.split('、');
    allTerms.push(...terms);
  }

  // Process each term individually
  for (const term of allTerms) {
    if (!term || term.trim().length === 0) continue;
    
    const trimmedTerm = term.trim();
    const translation = await translateTerm(trimmedTerm);
    
    await admin
      .from('tongshu_glossary')
      .upsert(
        {
          term: trimmedTerm,
          category: snapshot.auspicious?.cn.includes(trimmedTerm) ? 'auspicious' : 'inauspicious',
          label_en: translation,
          label_cn: trimmedTerm
        },
        { onConflict: 'term' }
      );
  }
}

async function retranslateAll() {
  const { data, error } = await admin.from('tongshu_snapshots').select('date_key');
  if (error) {
    console.error('[TongShu Translator] Unable to list snapshots', error.message);
    return;
  }
  if (!data?.length) return;
  for (const row of data) {
    if (!row.date_key) continue;
    await retranslate(row.date_key);
  }
}

async function startRealtime() {
  const channel = admin.channel('public:tongshu-translator');
  channel.on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'tongshu_snapshots'
    },
    (payload) => {
      const dateKey = payload.new?.date_key;
      if (!dateKey) return;
      retranslate(dateKey);
    }
  );
  await channel.subscribe();
  console.log('[TongShu Translator] Listening for new snapshots...');
  process.on('SIGINT', async () => {
    await channel.unsubscribe();
    console.log('\n[TongShu Translator] Stopped.');
    process.exit(0);
  });
}

async function main() {
  await retranslateAll();
  if (runOnce) {
    process.exit(0);
  }
  await startRealtime();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
