import { defineConfig } from '@playwright/test'

type Caps = Record<string, unknown>

const username = process.env.BROWSERSTACK_USERNAME
const accessKey = process.env.BROWSERSTACK_ACCESS_KEY
const buildName = process.env.BROWSERSTACK_BUILD_NAME || `meta-alliance-${new Date().toISOString().slice(0, 10)}`
const baseURL = process.env.PLAYWRIGHT_BASE_URL

if (!username || !accessKey) {
  console.warn('[BrowserStack] BROWSERSTACK_USERNAME and BROWSERSTACK_ACCESS_KEY must be set')
}

if (!baseURL) {
  console.warn('[BrowserStack] PLAYWRIGHT_BASE_URL is not set. Tests will fail unless the default baseURL is reachable from BrowserStack.')
}

function wsEndpoint(extraCaps: Caps){
  const caps: Caps = {
    'browserstack.username': username,
    'browserstack.accessKey': accessKey,
    build: buildName,
    project: 'Meta Alliance site',
    ...extraCaps,
  }
  return `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(caps))}`
}

function makeProject(name: string, caps: Caps){
  return {
    name,
    use: {
      baseURL: baseURL || 'http://127.0.0.1:5173',
      trace: 'retain-on-failure',
      screenshot: 'only-on-failure',
      video: 'retain-on-failure',
      connectOptions: {
        wsEndpoint: wsEndpoint(caps),
      },
    },
  }
}

export default defineConfig({
  testDir: './tests',
  retries: 1,
  timeout: 90 * 1000,
  expect: {
    timeout: 15 * 1000,
  },
  projects: [
    makeProject('bs-desktop-chrome', {
      browser: 'chrome',
      os: 'windows',
      os_version: '11',
      name: 'Desktop Chrome',
    }),
    makeProject('bs-ios-safari', {
      browser: 'safari',
      device: 'iPhone 15',
      os_version: '17',
      name: 'iOS Safari',
    }),
    makeProject('bs-android-chrome', {
      browser: 'chrome',
      device: 'Samsung Galaxy S24',
      os_version: '14.0',
      name: 'Android Chrome',
    }),
  ],
})
