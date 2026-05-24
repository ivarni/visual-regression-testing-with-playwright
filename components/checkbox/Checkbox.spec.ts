import { test, screenshots } from "../../utils/playwright/index.js";

test("renders in default state", async ({ page, server }) => {
  await page.goto(`http://localhost:${server.config.server.port}/`);

  await screenshots(page);
});

test("renders with focus", async ({ page, server }) => {
  await page.goto(`http://localhost:${server.config.server.port}/`);

  await page.focus("input");

  await screenshots(page);
});

test("renders in checked state", async ({ page, server }) => {
  await page.goto(`http://localhost:${server.config.server.port}/`);

  await page.check("input");

  await screenshots(page);
});
