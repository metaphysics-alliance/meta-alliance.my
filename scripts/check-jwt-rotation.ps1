#!/usr/bin/env pwsh
# Quick check for Supabase JWT rotation capabilities

Write-Host "=== Supabase JWT Secret Rotation Checker ===" -ForegroundColor Cyan
Write-Host ""

# Check if Supabase CLI is installed
Write-Host "1. Checking Supabase CLI installation..." -ForegroundColor Yellow
try {
    $version = supabase --version 2>$null
    if ($version) {
        Write-Host "   ✅ Supabase CLI installed: $version" -ForegroundColor Green
    } else {
        Write-Host "   ❌ Supabase CLI not found" -ForegroundColor Red
        Write-Host "   Install with: npm install -g supabase" -ForegroundColor Gray
        exit 1
    }
} catch {
    Write-Host "   ❌ Supabase CLI not found" -ForegroundColor Red
    Write-Host "   Install with: npm install -g supabase" -ForegroundColor Gray
    exit 1
}

Write-Host ""
Write-Host "2. Checking available commands..." -ForegroundColor Yellow

# Check for JWT rotation commands
$commands = @(
    "supabase projects api-keys --help",
    "supabase secrets --help",
    "supabase projects --help"
)

foreach ($cmd in $commands) {
    Write-Host "   Testing: $cmd" -ForegroundColor Gray
    $output = Invoke-Expression $cmd 2>&1
    if ($output -match "rotate|regenerate|reset.*key|jwt.*secret") {
        Write-Host "   ✅ Found rotation-related commands!" -ForegroundColor Green
        Write-Host $output
        break
    }
}

Write-Host ""
Write-Host "3. Manual Actions Required:" -ForegroundColor Yellow
Write-Host "   → Go to: https://supabase.com/dashboard/project/skajbbewtntpudminpmr/settings/api" -ForegroundColor Cyan
Write-Host "   → Look for 'JWT Settings' section" -ForegroundColor Cyan
Write-Host "   → Check for 'Rotate JWT Secret' or 'Generate New JWT Secret' button" -ForegroundColor Cyan
Write-Host ""
Write-Host "4. If no rotation button exists:" -ForegroundColor Yellow
Write-Host "   → Submit support ticket: https://supabase.com/dashboard/support" -ForegroundColor Cyan
Write-Host "   → Use the template in: docs/JWT-SECRET-ROTATION-ACTUAL.md" -ForegroundColor Cyan
Write-Host ""
Write-Host "5. Temporary Protection (Run this now):" -ForegroundColor Yellow
Write-Host "   → Enable RLS on all tables in SQL Editor" -ForegroundColor Cyan
Write-Host "   → See: docs/JWT-SECRET-ROTATION-ACTUAL.md (Option 4A)" -ForegroundColor Cyan
Write-Host ""
