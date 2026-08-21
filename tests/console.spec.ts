import { test, expect } from '@playwright/test';
import { LOCALES } from './locales';

for (const locale of LOCALES) {
	test(`[${locale.key}] produces no console errors or failed requests`, async ({ page }) => {
		const consoleErrors: string[] = [];
		const failed: string[] = [];

		page.on('console', (message) => {
			if (message.type() === 'error') consoleErrors.push(message.text());
		});
		page.on('pageerror', (error) => consoleErrors.push(String(error)));
		page.on('requestfailed', (request) => failed.push(`${request.url()} — ${request.failure()?.errorText}`));
		page.on('response', (response) => {
			if (response.status() >= 400) failed.push(`${response.url()} — HTTP ${response.status()}`);
		});

		await page.goto(locale.path, { waitUntil: 'networkidle' });

		expect(consoleErrors, 'console errors').toEqual([]);
		expect(failed, 'failed requests').toEqual([]);
	});
}
