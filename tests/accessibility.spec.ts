import { test, expect } from "@playwright/test";

test("a11y: tab eventually focuses a focusable element", async ({ page }) => {
  await page.goto("/");

  const isFocusableTag = (tag: string | null) =>
    ["a", "button", "input", "textarea", "select"].includes((tag || "").toLowerCase());

  // Press Tab up to 25 times until focus lands on something focusable
  let activeTag: string | null = null;

  for (let i = 0; i < 25; i++) {
    await page.keyboard.press("Tab");
    activeTag = await page.evaluate(() => document.activeElement?.tagName || null);
    if (isFocusableTag(activeTag)) break;
  }

  expect(
    isFocusableTag(activeTag),
    `After tabbing, focus did not land on a focusable element. Active tag was: ${activeTag}`
  ).toBeTruthy();
});
