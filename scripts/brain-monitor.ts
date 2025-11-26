#!/usr/bin/env ts-node

/**
 * BRAIN AGENT: Progression Monitor & Status Tracker (AI-Enhanced)
 * 
 * Purpose: Monitor and update implementation progress across all phase documents
 * Responsibilities:
 * - Track completion status of each phase
 * - Update phase documents with current progress
 * - Maintain CHANGELOG.md with implementation milestones
 * - Sync status across MASTER-IMPLEMENTATION-PLAN.md
 * - Generate intelligent weekly progress reports using LLM
 * 
 * Usage: npm run brain:monitor
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import { LLMClient } from './lib/llm-client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });
dotenv.config();

interface PhaseStatus {
  phase: string;
  file: string;
  progress: number; // 0-100
  status: 'not_started' | 'in_progress' | 'blocked' | 'completed';
  blockers: string[];
  lastUpdated: string;
  completedTasks: number;
  totalTasks: number;
  criticalGaps: string[];
  summary?: string; // AI summary
}

interface ProgressReport {
  timestamp: string;
  overallProgress: number;
  phases: PhaseStatus[];
  recentChanges: string[];
  upcomingMilestones: string[];
  blockers: string[];
  aiAnalysis?: {
    executiveSummary: string;
    riskAssessment: string;
    strategicRecommendations: string;
    modelUsed: string;
  };
}

class BrainProgressMonitor {
  private docsPath = resolve(process.cwd(), 'docs');
  private changelogPath = resolve(process.cwd(), 'CHANGELOG.md');
  private reportPath = resolve(process.cwd(), 'docs', 'PROGRESS-REPORT.md');
  private llmClient: LLMClient;
  
  private phaseFiles = [
    'PHASE-0-FOUNDATION.md',
    'PHASE-1-AUTH-PAYMENT.md',
    'PHASE-2-DASHBOARD-REPLICA.md',
    'PHASE-3-SERVICE-TOOLS-FOUNDATION.md',
    'PHASE-4-IMPERIAL-FENGSHUI.md',
    'PHASE-5-REPORTS-ACADEMY.md',
    'PHASE-6-PRODUCTION-DEPLOYMENT.md'
  ];

  constructor() {
    this.llmClient = new LLMClient();
  }

  async analyzePhases(): Promise<PhaseStatus[]> {
    const phases: PhaseStatus[] = [];

    for (const file of this.phaseFiles) {
      const filePath = resolve(this.docsPath, file);
      
      if (!existsSync(filePath)) {
        console.log(`[Brain] ⚠️  Phase file not found: ${file}`);
        continue;
      }

      const content = readFileSync(filePath, 'utf-8');
      const phaseStatus = this.parsePhaseStatus(file, content);
      phases.push(phaseStatus);
    }

    return phases;
  }

  private parsePhaseStatus(file: string, content: string): PhaseStatus {
    const phaseNumber = file.match(/PHASE-(\d+)/)?.[1] || '0';
    // Clean up phase name and truncate if needed for console display
    let phaseName = file
      .replace('.md', '')
      .replace(/^PHASE-\d+-/, '')
      .replace(/-/g, ' ')
      .toUpperCase();
    
    // Map common abbreviations for cleaner display
    const nameMap: Record<string, string> = {
      'SERVICE TOOLS FOUNDATION': 'SERVICE TOOLS',
      'PRODUCTION DEPLOYMENT': 'PROD DEPLOYMENT',
      'REPORTS ACADEMY': 'REPORTS & ACADEMY'
    };
    
    if (nameMap[phaseName]) {
      phaseName = nameMap[phaseName];
    }

    // Extract progress from document - try multiple patterns
    const progressMatch = content.match(/\*\*Current Progress:\*\*\s*(\d+)%/i) ||
                         content.match(/\*\*Progress:\*\*\s*(\d+)%/i) ||
                         content.match(/Progress:\s*🔴\s*\*\*(\d+)%/i) ||
                         content.match(/Current Progress:\*\*\s*(\d+)%/i);
    
    const progress = progressMatch ? parseInt(progressMatch[1]) : 0;

    // Count checkboxes
    const totalTasks = (content.match(/- \[[ x]\]/g) || []).length;
    const completedTasks = (content.match(/- \[x\]/gi) || []).length;

    // Determine status - improved logic
    let status: PhaseStatus['status'] = 'not_started';
    
    // Check explicit status markers first
    if (content.includes('Status:** ✅ COMPLETE') || content.includes('Status:** ✅')) {
      status = 'completed';
    } else if (content.includes('Status:** 🔴') || content.includes('BLOCKER') || content.includes('Status:** ❌')) {
      status = 'blocked';
    } else if (content.includes('Status:** ⏳') || content.includes('Status:** 🟡') || content.includes('Ready to Start')) {
      status = 'in_progress';
    } else if (progress === 100) {
      status = 'completed';
    } else if (progress > 0 || completedTasks > 0) {
      status = 'in_progress';
    }

    // Extract blockers
    const blockers: string[] = [];
    const blockerRegex = /❌\s*([^\n]+)/g;
    let match;
    while ((match = blockerRegex.exec(content)) !== null) {
      if (match[1].includes('Missing') || match[1].includes('BLOCKER') || match[1].includes('exposed')) {
        blockers.push(match[1].trim());
      }
    }

    // Extract critical gaps
    const criticalGaps: string[] = [];
    const gapRegex = /🚨\s*CRITICAL[:\s]*([^\n]+)/gi;
    while ((match = gapRegex.exec(content)) !== null) {
      criticalGaps.push(match[1].trim());
    }

    // Get last updated timestamp
    const updateMatch = content.match(/\*\*Last Updated:\*\*\s*([\d-T:.Z]+)/i);
    const lastUpdated = updateMatch ? updateMatch[1] : 'Unknown';

    return {
      phase: `Phase ${phaseNumber}: ${phaseName}`,
      file,
      progress,
      status,
      blockers: blockers.slice(0, 5), // Top 5 blockers
      lastUpdated,
      completedTasks,
      totalTasks,
      criticalGaps: criticalGaps.slice(0, 3) // Top 3 critical gaps
    };
  }

  async generateProgressReport(): Promise<ProgressReport> {
    console.log('[Brain] 🧠 Analyzing implementation progress...\n');

    const phases = await this.analyzePhases();
    const recentChanges = await this.getRecentChanges();
    
    const overallProgress = phases.length > 0
      ? Math.round(phases.reduce((sum, p) => sum + p.progress, 0) / phases.length)
      : 0;

    const allBlockers = phases
      .flatMap(p => p.blockers)
      .filter((v, i, a) => a.indexOf(v) === i); // Unique

    const report: ProgressReport = {
      timestamp: new Date().toISOString(),
      overallProgress,
      phases,
      recentChanges,
      upcomingMilestones: this.getUpcomingMilestones(phases),
      blockers: allBlockers
    };

    // Attempt AI Analysis if configured
    if (this.llmClient.isConfigured) {
      try {
        console.log('[Brain] 🤖 Engaging Neural Engine for analysis...');
        const analysis = await this.generateAIAnalysis(report);
        report.aiAnalysis = analysis;
        console.log(`[Brain] ✅ Analysis complete (Model: ${analysis.modelUsed})`);
      } catch (error) {
        console.warn('[Brain] ⚠️  AI Analysis failed, falling back to standard reporting:', error);
      }
    } else {
      console.log('[Brain] ℹ️  AI Analysis skipped (No API Key configured)');
    }

    return report;
  }

  private async generateAIAnalysis(report: ProgressReport): Promise<NonNullable<ProgressReport['aiAnalysis']>> {
    const prompt = `
    You are the "Brain" of the Meta Alliance project - a supreme AI strategist.
    Analyze the current project status and provide an executive summary.
    
    Current Date: ${new Date().toLocaleString()}
    Overall Progress: ${report.overallProgress}%
    
    Phases:
    ${report.phases.map(p => `- ${p.phase}: ${p.progress}% (${p.status}) - ${p.completedTasks}/${p.totalTasks} tasks`).join('\n')}
    
    Critical Blockers:
    ${report.blockers.join('\n') || 'None'}
    
    Recent Changes:
    ${report.recentChanges.join('\n')}
    
    Please provide a response in the following JSON format ONLY:
    {
      "executiveSummary": "A concise, high-level summary of the project state, tone should be professional but authoritative.",
      "riskAssessment": "Analysis of potential risks based on blockers and progress gaps.",
      "strategicRecommendations": "3-5 actionable bullet points for the team to focus on next."
    }
    `;

    const response = await this.llmClient.generate(prompt);
    
    try {
      // Clean up markdown code blocks if present
      const cleanJson = response.content.replace(/```json/g, '').replace(/```/g, '').trim();
      const data = JSON.parse(cleanJson);
      
      return {
        executiveSummary: data.executiveSummary,
        riskAssessment: data.riskAssessment,
        strategicRecommendations: data.strategicRecommendations,
        modelUsed: response.model
      };
    } catch (e) {
      throw new Error('Failed to parse AI response');
    }
  }

  private async getRecentChanges(): Promise<string[]> {
    if (!existsSync(this.changelogPath)) {
      return [];
    }

    const changelog = readFileSync(this.changelogPath, 'utf-8');
    const lines = changelog.split('\n');
    const recentChanges: string[] = [];

    for (let i = 0; i < lines.length && recentChanges.length < 5; i++) {
      if (lines[i].startsWith('- ')) {
        recentChanges.push(lines[i].substring(2));
      }
    }

    return recentChanges;
  }

  private getUpcomingMilestones(phases: PhaseStatus[]): string[] {
    const milestones: string[] = [];

    for (const phase of phases) {
      if (phase.status === 'in_progress' || phase.status === 'not_started') {
        if (phase.progress < 100) {
          milestones.push(`${phase.phase}: ${100 - phase.progress}% remaining`);
        }
      }
    }

    return milestones.slice(0, 5);
  }

  async updatePhaseDocument(phaseFile: string, updates: Partial<PhaseStatus>): Promise<void> {
    const filePath = resolve(this.docsPath, phaseFile);
    
    if (!existsSync(filePath)) {
      console.error(`[Brain] ❌ Phase file not found: ${phaseFile}`);
      return;
    }

    let content = readFileSync(filePath, 'utf-8');

    // Update progress
    if (updates.progress !== undefined) {
      content = content.replace(
        /\*\*Current Progress:\*\*\s*\d+%/gi,
        `**Current Progress:** ${updates.progress}%`
      );
    }

    // Update last updated timestamp
    const timestamp = new Date().toISOString();
    content = content.replace(
      /\*\*Last Updated:\*\*\s*[\d-T:.Z]+/gi,
      `**Last Updated:** ${timestamp}`
    );

    // Update status emoji
    if (updates.status) {
      const statusEmoji = {
        'not_started': '⚪',
        'in_progress': '🟡',
        'blocked': '🔴',
        'completed': '✅'
      }[updates.status];

      content = content.replace(
        /\*\*Status:\*\*\s*[⚪🟡🔴✅]/g,
        `**Status:** ${statusEmoji}`
      );
    }

    writeFileSync(filePath, content, 'utf-8');
    console.log(`[Brain] ✅ Updated ${phaseFile}`);
  }

  async generateMarkdownReport(report: ProgressReport): Promise<void> {
    const statusEmoji = {
      'not_started': '⚪',
      'in_progress': '🟡',
      'blocked': '🔴',
      'completed': '✅'
    };

    let aiSection = '';
    if (report.aiAnalysis) {
      aiSection = `
## 🧠 Supreme Brain Analysis
> **Model:** ${report.aiAnalysis.modelUsed}

### 📋 Executive Summary
${report.aiAnalysis.executiveSummary}

### 🛡️ Risk Assessment
${report.aiAnalysis.riskAssessment}

### 🧭 Strategic Recommendations
${report.aiAnalysis.strategicRecommendations}

---
`;
    } else {
      aiSection = `
## 🧠 Brain Agent Recommendations (Fallback Mode)
*AI Analysis skipped - Configure GEMINI_API_KEY for intelligent insights.*

${report.overallProgress < 50 ? `
### Priority Actions:
1. **Focus on Phase 0 completion** - Foundation must be solid before proceeding
2. **Resolve critical blockers** immediately
3. **Rotate exposed credentials** (if any security issues detected)
4. **Complete RLS policies** to secure data access
5. **Create missing database tables** for subscription infrastructure
` : report.overallProgress < 100 ? `
### Priority Actions:
1. **Maintain momentum** on in-progress phases
2. **Address remaining blockers** systematically
3. **Begin user testing** on completed features
4. **Document implementation decisions** in CHANGELOG.md
5. **Prepare for next phase** handoff
` : `
### Maintenance Mode:
1. **Monitor production metrics**
2. **Address bug reports** promptly
3. **Plan feature enhancements**
4. **Update documentation** as system evolves
5. **Conduct security audits** quarterly
`}
---
`;
    }

    const md = `# 🧠 Brain Agent: Implementation Progress Report
**Generated:** ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kuala_Lumpur' })} (MYT)  
**Overall Progress:** ${report.overallProgress}%  
**Status:** ${report.overallProgress === 100 ? '✅ Complete' : report.overallProgress > 50 ? '🟡 In Progress' : '🔴 Early Stage'}

---

${aiSection}

## 📊 Phase Progress Summary

| Phase | Progress | Status | Tasks | Last Updated |
|-------|----------|--------|-------|--------------|
${report.phases.map(p => 
  `| ${p.phase} | ${p.progress}% | ${statusEmoji[p.status]} ${p.status.replace(/_/g, ' ').toUpperCase()} | ${p.completedTasks}/${p.totalTasks} | ${p.lastUpdated.split('T')[0]} |`
).join('\n')}

---

## 🔥 Critical Blockers

${report.blockers.length > 0 ? report.blockers.map((b, i) => `${i + 1}. ❌ ${b}`).join('\n') : '✅ No critical blockers identified'}

---

## 📋 Detailed Phase Status

${report.phases.map(phase => `
### ${phase.phase}
**Progress:** ${phase.progress}% | **Status:** ${statusEmoji[phase.status]} ${phase.status.toUpperCase()}  
**Tasks:** ${phase.completedTasks}/${phase.totalTasks} completed  
**File:** \`${phase.file}\`

${phase.criticalGaps.length > 0 ? `
**Critical Gaps:**
${phase.criticalGaps.map(g => `- 🚨 ${g}`).join('\n')}
` : ''}

${phase.blockers.length > 0 ? `
**Blockers:**
${phase.blockers.map(b => `- ❌ ${b}`).join('\n')}
` : '✅ No blockers'}

---
`).join('\n')}

## 🎯 Upcoming Milestones

${report.upcomingMilestones.length > 0 ? report.upcomingMilestones.map((m, i) => `${i + 1}. ${m}`).join('\n') : '✅ All milestones completed'}

---

## 📝 Recent Changes (from CHANGELOG.md)

${report.recentChanges.length > 0 ? report.recentChanges.map((c, i) => `${i + 1}. ${c}`).join('\n') : 'No recent changes logged'}

---

## 📈 Progress Chart

\`\`\`
Overall:   [${'█'.repeat(Math.floor(report.overallProgress / 5))}${'░'.repeat(20 - Math.floor(report.overallProgress / 5))}] ${report.overallProgress}%

${report.phases.map(p => 
  `${p.phase.padEnd(40)}: [${'█'.repeat(Math.floor(p.progress / 5))}${'░'.repeat(20 - Math.floor(p.progress / 5))}] ${p.progress}%`
).join('\n')}
\`\`\`

---

**Report Generated by:** Brain Agent (AI-Enhanced)  
**Next Update:** Auto-scheduled daily or on-demand via \`npm run brain:monitor\`  
**Data Sources:** Phase documents, CHANGELOG.md, DB Admin analysis

---
`;

    writeFileSync(this.reportPath, md, 'utf-8');
    console.log(`\n[Brain] 📄 Progress report saved to: ${this.reportPath}`);
  }

  async printConsoleReport(report: ProgressReport): Promise<void> {
    const statusEmoji = {
      'not_started': '⚪',
      'in_progress': '🟡',
      'blocked': '🔴',
      'completed': '✅'
    };

    console.log('\n' + '='.repeat(70));
    console.log('🧠 BRAIN AGENT: IMPLEMENTATION PROGRESS MONITOR');
    console.log('='.repeat(70));
    console.log(`📅 Generated: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kuala_Lumpur' })} (MYT)`);
    console.log(`📊 Overall Progress: ${report.overallProgress}%`);
    console.log('='.repeat(70));

    if (report.aiAnalysis) {
      console.log('\n🤖 AI EXECUTIVE SUMMARY:\n');
      console.log(report.aiAnalysis.executiveSummary);
      console.log('\n🛡️  RISK ASSESSMENT:\n');
      console.log(report.aiAnalysis.riskAssessment);
      console.log('\ncompass STRATEGIC RECOMMENDATIONS:\n');
      console.log(report.aiAnalysis.strategicRecommendations);
      console.log('\n' + '-'.repeat(70));
    }

    console.log('\n📋 PHASE BREAKDOWN:\n');
    report.phases.forEach(phase => {
      // Extract just phase number and short name
      const phaseMatch = phase.phase.match(/Phase (\d+):\s*(.+)/);
      const phaseNum = phaseMatch ? phaseMatch[1] : '?';
      const phaseName = phaseMatch ? phaseMatch[2] : phase.phase;
      
      // Format: Status Phase# Name | Progress | Tasks
      const statusIcon = statusEmoji[phase.status];
      const progressBar = `${phase.progress}%`.padStart(4);
      const taskInfo = `${phase.completedTasks}/${phase.totalTasks}`.padStart(8);
      
      console.log(`${statusIcon} Phase ${phaseNum}: ${phaseName}`);
      console.log(`   Progress: ${progressBar} | Tasks: ${taskInfo}${phase.blockers.length > 0 ? ` | ⚠️  ${phase.blockers.length} blockers` : ''}`);
      console.log('');
    });

    if (report.blockers.length > 0) {
      console.log('🚨 CRITICAL BLOCKERS:\n');
      report.blockers.slice(0, 5).forEach((b, i) => {
        console.log(`   ${i + 1}. ${b}`);
      });
      console.log('');
    }

    console.log('🎯 UPCOMING MILESTONES:\n');
    if (report.upcomingMilestones.length > 0) {
      report.upcomingMilestones.slice(0, 5).forEach((m, i) => {
        console.log(`   ${i + 1}. ${m}`);
      });
    } else {
      console.log('   ✅ All current milestones completed!');
    }

    console.log('\n' + '='.repeat(70));
    console.log(`📄 Full report saved to: docs/PROGRESS-REPORT.md`);
    console.log('='.repeat(70) + '\n');
  }

  async logToChangelog(entry: string): Promise<void> {
    if (!existsSync(this.changelogPath)) {
      console.error('[Brain] ❌ CHANGELOG.md not found');
      return;
    }

    let changelog = readFileSync(this.changelogPath, 'utf-8');
    const timestamp = new Date().toISOString().split('T')[0];
    
    // Find the first "## [" line and insert new entry after "### Added" or create it
    const lines = changelog.split('\n');
    let insertIndex = -1;

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('### Added')) {
        insertIndex = i + 1;
        break;
      } else if (lines[i].startsWith('## [')) {
        // Insert a new "### Added" section
        lines.splice(i + 1, 0, '### Added', `- [${timestamp}] ${entry}`);
        insertIndex = i + 2;
        break;
      }
    }

    if (insertIndex > 0) {
      lines.splice(insertIndex, 0, `- [${timestamp}] ${entry}`);
      writeFileSync(this.changelogPath, lines.join('\n'), 'utf-8');
      console.log(`[Brain] ✅ Logged to CHANGELOG.md: ${entry}`);
    } else {
      console.error('[Brain] ⚠️  Could not find insertion point in CHANGELOG.md');
    }
  }
}

// CLI Execution
async function main() {
  const monitor = new BrainProgressMonitor();
  
  console.log('[Brain] 🧠 Initializing progression monitor...\n');

  const report = await monitor.generateProgressReport();
  await monitor.printConsoleReport(report);
  await monitor.generateMarkdownReport(report);

  // Check if we should update phase documents
  const args = process.argv.slice(2);
  if (args.includes('--update-phases')) {
    console.log('\n[Brain] 📝 Updating phase documents with latest status...\n');
    for (const phase of report.phases) {
      await monitor.updatePhaseDocument(phase.file, {
        progress: phase.progress,
        status: phase.status
      });
    }
  }

  // Check if we should log to changelog
  const logIndex = args.indexOf('--log');
  if (logIndex >= 0 && args[logIndex + 1]) {
    const entry = args.slice(logIndex + 1).join(' ');
    await monitor.logToChangelog(entry);
  }

  console.log('\n[Brain] ✅ Monitoring complete. Standby for next directive.\n');
}

main().catch(err => {
  console.error('[Brain] ❌ Monitoring failed:', err.message);
  process.exit(1);
});

export default BrainProgressMonitor;
