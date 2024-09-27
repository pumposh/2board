import { chromium } from "playwright";

async function takeScreenshot(url: string) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await page.goto(url);
    const screenshot = await page.screenshot();
    return screenshot;
  } catch (error) {
    console.error("Screenshot error:", error);
    return { error: "Failed to take screenshot" };
  } finally {
    await browser.close();
  }
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const url = query.url;

  if (!url) {
    return { error: "URL is required" };
  }

  if (typeof url !== "string") {
    return { error: "Invalid URL" };
  }

  try {
    console.log("Taking screenshot of:", url);
    const screenshot = await takeScreenshot(url);
    console.log(screenshot);
    setHeader(event, "Content-Type", "image/png");
    return screenshot;
  } catch (error) {
    console.error("Screenshot error:", error);
    return { error: "Failed to take screenshot" };
  }
});
