import { test, expect } from "@playwright/test";
import { openFirstPost, expectNoConsoleErrors } from "./helpers";

test("open a blog post and verify core content", async ({ page }) => {
  await openFirstPost(page);

  // 1) Confirm we're on a post URL
  await expect(page).toHaveURL(/\/blog\/.+/i);

  // 2) Confirm the page rendered (not blank)
  await expect(page.locator("body")).toBeVisible();

  // 3) Prefer semantic containers but fall back safely
  const container = page.locator("article, main, body").first();
  await expect(container).toBeVisible();

  // 4) Validate there is meaningful text content
  const text = (await container.innerText()).replace(/\s+/g, " ").trim();
  expect(
    text.length,
    `Post page appears to have no readable text. Got length=${text.length}`
  ).toBeGreaterThan(30);

  // 5) Optional: try to find a likely title anywhere
  // (won't fail if your title is rendered differently; we just log a hint)
  const possibleTitle = page.locator("h1, h2, [data-testid='post-title']").first();
  if ((await possibleTitle.count()) > 0) {
    await expect(possibleTitle).toBeVisible();
  }

  // 6) Console errors (actual errors only)
  await expectNoConsoleErrors(page);
});


test("back navigation returns to listing without breaking", async ({ page }) => {
  await page.goto("/blog");
  await expect(page).toHaveURL(/\/blog\/?$/);
  
  // Open a post
  await openFirstPost(page);
  await expect(page).toHaveURL(/\/blog\/.+/);
  await expect(page.locator("h1").first()).toBeVisible();

  // Go back and WAIT until we're back on /blog
  await page.goBack({ waitUntil: "domcontentloaded" });
  await page.waitForURL(/\/blog\/?$/);

  // Now wait for something that proves the blog listing rendered
  const listing = page.locator("main").first();
  await expect(listing).toBeVisible();
});
