import { test, expect } from "@playwright/test";

test("mobile viewport: no horizontal scrolling on homepage", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 }); // iPhone-ish
  await page.goto("/");

  // Check for horizontal overflow by comparing scrollWidth to clientWidth
  const hasHorizontalScroll = await page.evaluate(() => {
    const doc = document.documentElement;
    return doc.scrollWidth > doc.clientWidth + 1;
  });

  expect(hasHorizontalScroll, "Detected horizontal scrolling/overflow on mobile").toBeFalsy();
});

test("mobile viewport: footer does not overlap last content", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");

  // Scroll to bottom
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(200);

  // Try common footer selectors
  const footer = page.locator("footer").first();

  if ((await footer.count()) === 0) {
    test.skip(true, "No <footer> element found. Add a footer tag or update selector.");
  }

  await expect(footer).toBeVisible();

  // Ensure footer is below the last main content element (not overlapping)
  const overlap = await page.evaluate(() => {
    const footerEl = document.querySelector("footer");
    const mainEl = document.querySelector("main");
    if (!footerEl || !mainEl) return false;

    const footerRect = footerEl.getBoundingClientRect();

    // Find last element in main that has a box
    const mainChildren = Array.from(mainEl.querySelectorAll("*"))
      .map((el) => (el as HTMLElement).getBoundingClientRect())
      .filter((r) => r.width > 0 && r.height > 0);

    if (mainChildren.length === 0) return false;
    const lastRect = mainChildren[mainChildren.length - 1];

    // Overlap if footer top is above last element bottom (with some tolerance)
    return footerRect.top < lastRect.bottom - 2;
  });

  expect(overlap, "Footer appears to overlap main content on mobile").toBeFalsy();
});
