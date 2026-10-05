import { test, expect } from '@playwright/test';

test.describe('Dashboard E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('loads dashboard with feed section', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Content Dashboard');
    await expect(page.locator('text=Personalized Feed')).toBeVisible();
  });

  test('navigates between sections', async ({ page }) => {
    await page.click('text=Trending');
    await expect(page.locator('text=Trending Now')).toBeVisible();

    await page.click('text=Favorites');
    await expect(page.locator('text=Your Favorites')).toBeVisible();

    await page.click('text=Settings');
    await expect(page.locator('text=Settings')).toBeVisible();
  });

  test('toggles dark mode', async ({ page }) => {
    const html = page.locator('html');
    await expect(html).not.toHaveClass(/dark/);

    await page.click('text=Dark Mode');
    await expect(html).toHaveClass(/dark/);

    await page.click('text=Light Mode');
    await expect(html).not.toHaveClass(/dark/);
  });

  test('searches for content', async ({ page }) => {
    const searchInput = page.locator('input[placeholder="Search content..."]');
    await searchInput.fill('AI');

    await page.waitForTimeout(600);
    await expect(page.locator('text=Search Results')).toBeVisible();
  });

  test('adds item to favorites', async ({ page }) => {
    await page.waitForSelector('[aria-label="Add to favorites"]', { timeout: 5000 });
    const firstFavoriteButton = page.locator('[aria-label="Add to favorites"]').first();
    await firstFavoriteButton.click();

    await page.click('text=Favorites');
    await expect(page.locator('text=Your Favorites')).toBeVisible();
    await expect(page.locator('.grid > div').first()).toBeVisible();
  });

  test('changes content preferences', async ({ page }) => {
    await page.click('text=Settings');
    await expect(page.locator('text=Content Preferences')).toBeVisible();

    const technologyButton = page.locator('text=Technology').locator('..');
    await technologyButton.click();

    await page.click('text=Feed');
    await expect(page.locator('text=Personalized Feed')).toBeVisible();
  });

  test('loads more content', async ({ page }) => {
    await page.waitForSelector('text=Load More', { timeout: 5000 });
    const loadMoreButton = page.locator('text=Load More');
    await loadMoreButton.click();

    await expect(loadMoreButton).toContainText('Loading...');
  });
});
