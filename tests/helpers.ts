import { expect, Page } from "@playwright/test";

const BLOG_INDEX_ROUTE = "/blog";
const INTERNAL_POST_HREF = /\/blog\/.+/i;

export async function openFirstPost(page: Page) {
  await page.goto(BLOG_INDEX_ROUTE);

  // Prefer links that look like actual post routes
  const postLinks = page.locator(`a[href]`).filter({
    has: page.locator(":scope"), 
  });

  const count = await postLinks.count();
  expect(count, `No <a href> links found on ${BLOG_INDEX_ROUTE}.`).toBeGreaterThan(0);

  // Find first link whose href matches /blog/... or /posts/... etc.
  for (let i = 0; i < count; i++) {
    const href = await postLinks.nth(i).getAttribute("href");
    if (href && INTERNAL_POST_HREF.test(href)) {
        console.log("CLICKING POST LINK:", href);
        await postLinks.nth(i).click();
        await expect(page).toHaveURL(/\/blog\/.+/i);
        return;
    }
  }

  for (let i = 0; i < count; i++) {
    const href = await postLinks.nth(i).getAttribute("href");
    if (href && href.startsWith("/") && !href.startsWith("//") && !href.startsWith("/#")) {
      await postLinks.nth(i).click();
      return;
    }
  }

  throw new Error(`Could not find a suitable internal post link on ${BLOG_INDEX_ROUTE}.`);
}

export async function expectNoConsoleErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });

  await page.waitForTimeout(300);
  expect(errors, `Console errors:\n${errors.join("\n")}`).toEqual([]);
}

export const BLOG_ROUTE = BLOG_INDEX_ROUTE;
