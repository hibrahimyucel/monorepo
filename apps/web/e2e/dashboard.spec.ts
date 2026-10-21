// apps/web/e2e/dashboard.spec.ts
import { test, expect } from '@playwright/test';

test.describe('SaaS Telemetry Dashboard E2E Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Nginx root adresine git
    await page.goto('/');
  });


test('should render the dashboard header correctly', async ({ page }) => {
  // .shadow() fonksiyonunu silip doğrudan locator üzerinden metni kontrol ediyoruz
  const header = page.locator('h1');
  await expect(header).toContainText('SaaS Core Telemetry Panel');
});


  test('should load the premium canvas sparkline widgets', async ({ page }) => {
    // CPU ve RAM canvas elementlerinin DOM üzerinde var olduğunu doğrula
    const cpuCanvas = page.locator('#canvas-cpu-widget');
    const ramCanvas = page.locator('#canvas-ram-widget');
    
    await expect(cpuCanvas).toBeVisible();
    await expect(ramCanvas).toBeVisible();
  });

  test('should streaming system logs inside hacker terminal console', async ({ page }) => {
    // Canlı log akış konsolunun başlığını kontrol et
    await expect(page.locator('text=Live Stream Security & Event Logs')).toBeVisible();

    // En az bir log satırının düştüğünü veya "Streaming" badge'inin orada olduğunu doğrula
    const streamingBadge = page.locator('text=Streaming');
    await expect(streamingBadge).toBeVisible();
  });
  
  
  // apps/web/e2e/dashboard.spec.ts dosyasına eklenebilir

test('should trigger rate limiting (429) under heavy load', async ({ request }) => {
  // Saniyede 5r/s limitimiz var, arka arkaya 15 istek göndererek limiti patlatıyoruz
  let hitLimit = false;

  for (let i = 0; i < 15; i++) {
    const response = await request.get('/api/telemetry/snapshot');
    if (response.status() === 429) {
      hitLimit = true;
      break;
    }
  }

  // Nginx koruma kalkanının başarıyla devreye girdiğini doğrula!
  expect(hitLimit).toBe(true);
});

  
});

