#!/usr/bin/env ts-node

/**
 * Universal Database Translation Monitor - Phase 2
 * 
 * Monitors ALL database tables for bilingual content
 * Automatically detects CN/EN text in database changes
 * Generates missing translations and updates records
 * 
 * Tables monitored:
 * - subscription_plans (plan names, features, descriptions)
 * - services (service names, descriptions)
 * - academy_courses (titles, descriptions, content)
 * - tongshu_snapshots (already monitored, enhanced here)
 * - user_profiles (bio, notes - optional)
 * - Future: bazi/ziwei/qimen readings
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({ path: '.env.local' });
config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('[DB Translator] Missing Supabase credentials');
  process.exit(1);
}

const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Language detection patterns
const CHINESE_REGEX = /[\u4e00-\u9fa5]+/g;

interface TableConfig {
  table: string;
  bilingualFields: Array<{
    en: string;
    cn: string;
  }>;
  enabled: boolean;
  description: string;
}

// Table configurations for monitoring
const MONITORED_TABLES: TableConfig[] = [
  {
    table: 'subscription_plans',
    bilingualFields: [
      { en: 'plan_name_en', cn: 'plan_name_cn' },
      { en: 'description_en', cn: 'description_cn' },
      { en: 'features_en', cn: 'features_cn' }
    ],
    enabled: true,
    description: 'Subscription plan names, descriptions, and features'
  },
  {
    table: 'services',
    bilingualFields: [
      { en: 'name_en', cn: 'name_cn' },
      { en: 'description_en', cn: 'description_cn' }
    ],
    enabled: true,
    description: 'Service names and descriptions'
  },
  {
    table: 'academy_courses',
    bilingualFields: [
      { en: 'title_en', cn: 'title_cn' },
      { en: 'description_en', cn: 'description_cn' },
      { en: 'content_en', cn: 'content_cn' }
    ],
    enabled: false, // Enable when table exists
    description: 'Academy course titles, descriptions, and content'
  },
  {
    table: 'user_profiles',
    bilingualFields: [
      { en: 'bio', cn: 'bio' } // Single field - detect language
    ],
    enabled: false, // Optional - user-generated content
    description: 'User profile bios (optional translation)'
  }
];

/**
 * Check if table exists
 */
async function tableExists(tableName: string): Promise<boolean> {
  try {
    const { error } = await admin.from(tableName).select('*').limit(0);
    return !error;
  } catch {
    return false;
  }
}

/**
 * Detect language of text
 */
function detectLanguage(text: string): 'CN' | 'EN' | 'MIXED' | 'UNKNOWN' {
  if (!text || text.trim().length === 0) return 'UNKNOWN';
  
  const hasChinese = CHINESE_REGEX.test(text);
  const hasEnglish = /[a-zA-Z]/.test(text);
  
  if (hasChinese && hasEnglish) return 'MIXED';
  if (hasChinese) return 'CN';
  if (hasEnglish) return 'EN';
  return 'UNKNOWN';
}

/**
 * Translate text using universal glossary
 */
async function translateFromGlossary(text: string, sourceLanguage: 'CN' | 'EN'): Promise<string | null> {
  try {
    const { data, error } = await admin
      .from('universal_glossary')
      .select(sourceLanguage === 'CN' ? 'english_text' : 'chinese_text')
      .eq(sourceLanguage === 'CN' ? 'chinese_text' : 'english_text', text)
      .maybeSingle();
    
    if (error || !data) return null;
    
    return sourceLanguage === 'CN' ? data.english_text : data.chinese_text;
  } catch (err) {
    console.error('[DB Translator] Error querying glossary:', err);
    return null;
  }
}

/**
 * Generate translation (simple pattern matching for now)
 */
async function generateTranslation(text: string, sourceLanguage: 'CN' | 'EN'): Promise<string> {
  // First check glossary
  const fromGlossary = await translateFromGlossary(text, sourceLanguage);
  if (fromGlossary) return fromGlossary;
  
  // Mark as needs translation
  return sourceLanguage === 'CN' ? `${text} (needs translation)` : `${text} (需要翻译)`;
}

/**
 * Store translation in universal glossary
 */
async function storeInGlossary(
  chineseText: string,
  englishText: string,
  sourceLanguage: 'CN' | 'EN',
  source: string
): Promise<void> {
  try {
    const { error } = await admin
      .from('universal_glossary')
      .upsert({
        chinese_text: chineseText,
        english_text: englishText,
        source_language: sourceLanguage,
        category: 'database-content',
        source,
        context: '',
        auto_generated: true,
        needs_review: englishText.includes('needs translation') || chineseText.includes('需要翻译'),
        created_at: new Date().toISOString()
      }, { onConflict: 'chinese_text,english_text' });
    
    if (error) {
      console.error('[DB Translator] Error storing in glossary:', error);
    }
  } catch (err) {
    console.error('[DB Translator] Error in storeInGlossary:', err);
  }
}

/**
 * Process record and generate missing translations
 */
async function processRecord(
  tableConfig: TableConfig,
  record: any
): Promise<Record<string, any> | null> {
  const updates: Record<string, any> = {};
  let hasUpdates = false;
  
  for (const fieldPair of tableConfig.bilingualFields) {
    const enValue = record[fieldPair.en];
    const cnValue = record[fieldPair.cn];
    
    // Case 1: Has EN, missing CN
    if (enValue && !cnValue) {
      const language = detectLanguage(enValue);
      if (language === 'EN') {
        console.log(`[DB Translator] 🔍 ${tableConfig.table}.${fieldPair.en}: "${enValue}" (missing CN)`);
        const translation = await generateTranslation(enValue, 'EN');
        updates[fieldPair.cn] = translation;
        hasUpdates = true;
        
        // Store in glossary
        await storeInGlossary(translation, enValue, 'EN', `db:${tableConfig.table}:${fieldPair.en}`);
        
        console.log(`[DB Translator] ✅ Generated CN: "${translation}"`);
      }
    }
    
    // Case 2: Has CN, missing EN
    if (cnValue && !enValue) {
      const language = detectLanguage(cnValue);
      if (language === 'CN') {
        console.log(`[DB Translator] 🔍 ${tableConfig.table}.${fieldPair.cn}: "${cnValue}" (missing EN)`);
        const translation = await generateTranslation(cnValue, 'CN');
        updates[fieldPair.en] = translation;
        hasUpdates = true;
        
        // Store in glossary
        await storeInGlossary(cnValue, translation, 'CN', `db:${tableConfig.table}:${fieldPair.cn}`);
        
        console.log(`[DB Translator] ✅ Generated EN: "${translation}"`);
      }
    }
    
    // Case 3: Has both - validate they're in glossary
    if (enValue && cnValue) {
      const enLang = detectLanguage(enValue);
      const cnLang = detectLanguage(cnValue);
      
      if (enLang === 'EN' && cnLang === 'CN') {
        // Store in glossary for future lookups
        await storeInGlossary(cnValue, enValue, 'MIXED' as any, `db:${tableConfig.table}`);
      }
    }
  }
  
  return hasUpdates ? updates : null;
}

/**
 * Scan existing records in a table
 */
async function scanExistingRecords(tableConfig: TableConfig): Promise<void> {
  console.log(`[DB Translator] 📊 Scanning existing records in ${tableConfig.table}...`);
  
  try {
    const { data: records, error } = await admin
      .from(tableConfig.table)
      .select('*');
    
    if (error) {
      console.error(`[DB Translator] ❌ Error scanning ${tableConfig.table}:`, error);
      return;
    }
    
    if (!records || records.length === 0) {
      console.log(`[DB Translator] ℹ️  No records found in ${tableConfig.table}`);
      return;
    }
    
    console.log(`[DB Translator] Found ${records.length} records in ${tableConfig.table}`);
    
    let updatedCount = 0;
    for (const record of records) {
      const updates = await processRecord(tableConfig, record);
      
      if (updates) {
        // Update record with missing translations
        const { error: updateError } = await admin
          .from(tableConfig.table)
          .update(updates)
          .eq('id', record.id);
        
        if (updateError) {
          console.error(`[DB Translator] ❌ Error updating record ${record.id}:`, updateError);
        } else {
          updatedCount++;
        }
      }
    }
    
    console.log(`[DB Translator] ✅ Updated ${updatedCount} records in ${tableConfig.table}`);
  } catch (err) {
    console.error(`[DB Translator] ❌ Error in scanExistingRecords:`, err);
  }
}

/**
 * Setup real-time listener for a table
 */
async function setupRealtimeListener(tableConfig: TableConfig): Promise<void> {
  console.log(`[DB Translator] 👂 Setting up listener for ${tableConfig.table}...`);
  
  const channel = admin.channel(`db-translator:${tableConfig.table}`);
  
  channel.on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: tableConfig.table
    },
    async (payload) => {
      console.log(`[DB Translator] 📥 Change detected in ${tableConfig.table}:`, payload.eventType);
      
      if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
        const updates = await processRecord(tableConfig, payload.new);
        
        if (updates && payload.new.id) {
          // Update record with missing translations
          const { error } = await admin
            .from(tableConfig.table)
            .update(updates)
            .eq('id', payload.new.id);
          
          if (error) {
            console.error(`[DB Translator] ❌ Error updating record:`, error);
          } else {
            console.log(`[DB Translator] ✅ Auto-updated record ${payload.new.id} in ${tableConfig.table}`);
          }
        }
      }
    }
  );
  
  await channel.subscribe();
  console.log(`[DB Translator] ✅ Listener active for ${tableConfig.table}`);
}

/**
 * Initialize database monitoring
 */
async function initializeMonitoring(): Promise<void> {
  console.log('');
  console.log('═══════════════════════════════════════════════════════');
  console.log('  🗄️  UNIVERSAL DATABASE TRANSLATION MONITOR - PHASE 2');
  console.log('═══════════════════════════════════════════════════════');
  console.log('');
  
  const enabledTables = MONITORED_TABLES.filter(t => t.enabled);
  
  if (enabledTables.length === 0) {
    console.log('⚠️  No tables enabled for monitoring');
    console.log('   Edit MONITORED_TABLES in this script to enable tables');
    return;
  }
  
  console.log('📋 Monitoring tables:');
  for (const table of enabledTables) {
    console.log(`  ✅ ${table.table} - ${table.description}`);
  }
  console.log('');
  
  // Check which tables exist
  const existingTables: TableConfig[] = [];
  for (const table of enabledTables) {
    const exists = await tableExists(table.table);
    if (exists) {
      existingTables.push(table);
      console.log(`✅ Table exists: ${table.table}`);
    } else {
      console.log(`⚠️  Table not found: ${table.table} (skipping)`);
    }
  }
  console.log('');
  
  if (existingTables.length === 0) {
    console.log('❌ No monitored tables exist in database');
    return;
  }
  
  // Scan existing records
  console.log('🔍 Scanning existing records...');
  for (const table of existingTables) {
    await scanExistingRecords(table);
  }
  console.log('');
  
  // Setup real-time listeners
  console.log('👂 Setting up real-time listeners...');
  for (const table of existingTables) {
    await setupRealtimeListener(table);
  }
  console.log('');
  
  console.log('✅ Database monitoring active!');
  console.log('   Monitoring', existingTables.length, 'tables for bilingual content');
  console.log('   Press Ctrl+C to stop');
  console.log('');
  
  // Keep process alive
  process.on('SIGINT', () => {
    console.log('\n[DB Translator] 🛑 Stopping...');
    process.exit(0);
  });
}

/**
 * Main entry point
 */
async function main() {
  await initializeMonitoring();
}

main().catch((err) => {
  console.error('[DB Translator] Fatal error:', err);
  process.exit(1);
});
