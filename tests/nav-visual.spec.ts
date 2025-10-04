import { expect, test } from '@playwright/test'

const NAV_SELECTOR = 'header.navbar'

async function ensurePageReady(page){
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(300)
}

// Desktop visual baseline
test('navbar renders correctly on desktop', async ({ page }, testInfo) => {
  if (!testInfo.project.name.includes('Desktop')) test.skip()
  await ensurePageReady(page)
  await expect(page.locator(NAV_SELECTOR)).toHaveScreenshot('navbar-desktop.png', {
    animations: 'disabled',
    maxDiffPixelRatio: 0.015,
  })
})

// Mobile visual baseline + interaction
test('navbar renders and toggles on touch devices', async ({ page }, testInfo) => {
  if (!testInfo.project.name.includes('Mobile')) test.skip()
  await ensurePageReady(page)
  const toggle = page.getByRole('button', { name: /toggle menu/i })
  await toggle.tap()
  await page.waitForTimeout(200)
  await expect(page.locator(NAV_SELECTOR)).toHaveScreenshot('navbar-mobile-open.png', {
    animations: 'disabled',
    maxDiffPixelRatio: 0.02,
  })
})
