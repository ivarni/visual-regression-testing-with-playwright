import { test as base, expect, Locator, Page } from "@playwright/test";
import react from "@vitejs/plugin-react";
import { existsSync } from "node:fs";
import path, { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer, ViteDevServer } from "vite";

const normalise = (name: string) => name.replaceAll(" ", "-").toLowerCase();

type BoundingBox = NonNullable<Awaited<ReturnType<Locator["boundingBox"]>>>;

function assertBox(box: BoundingBox | null): asserts box is BoundingBox {
  expect(box).not.toBeNull();
}

const getComponentNameFromPath = () => {
  const fileName = path.basename(test.info().file);
  return fileName.split(".")[0].toLowerCase();
};

export const test = base.extend<{ server: ViteDevServer }>({
  server: [
    async ({}, use) => {
      const server = await createServer({
        mode: "production",
        configFile: false,
        plugins: [react()],
        root: resolve(
          fileURLToPath(new URL(".", import.meta.url)),
          "..",
          "..",
          "components",
          getComponentNameFromPath(),
          "example"
        ),
      });

      await server.listen();
      await use(server);
    },
    { auto: true }, // start the server automatically without tests needing to declare `server`
  ],
});

test.afterEach(async ({ server }) => {
  await server.close();
});

const screenshot = async (page: Page, component: string, state: string) => {
  // Waits to make sure fonts are loaded
  await page.evaluate(() => document.fonts.ready);

  // Use the Playwright locator API to find the wrapper ComponentExample.tsx puts around the element being tested
  const element = page.locator("[data-testid='example']");

  // Calculate the bounding box and assert that it exists
  const box = await element.boundingBox();
  assertBox(box);

  const screenshotRoot = resolve(
    fileURLToPath(new URL(".", import.meta.url)),
    "..",
    "..",
    "components",
    component,
    "__screenshots__"
  );

  const testName = normalise(test.info().title);
  const projectName = normalise(test.info().project.name);
  const screenshotPath = `${screenshotRoot}/${testName}-${projectName}-${state}.png`;

  // Check if there already is a screenshot in the codebase
  const hasScreenshot = existsSync(screenshotPath);

  if (hasScreenshot) {
    // If there is one, assert that the rendered UI matches the saved one.
    expect(
      await page.screenshot({
        animations: "disabled",
        caret: "hide",
        clip: { ...box },
      })
    ).toMatchSnapshot(`${projectName}-${state}`);
  } else {
    // If there isn't one, create one.
    await page.screenshot({
      animations: "disabled",
      caret: "hide",
      clip: { ...box },
      path: screenshotPath,
    });
  }
};

export const screenshots = async (page: Page) => {
  const component = getComponentNameFromPath();

  await page.emulateMedia({ colorScheme: "light" });
  await screenshot(page, component, "light");

  await page.emulateMedia({ colorScheme: "dark" });
  await screenshot(page, component, "dark");

  await page.emulateMedia({ forcedColors: "active" });
  await screenshot(page, component, "forced-colors");
};
