import puppeteer from 'puppeteer';
import { str2ab, ab2blob } from '../../utils/data';

async function takeScreenshot(
  url: string
): Promise<string | { error: string }> {
  try {
    const browser = await puppeteer.launch();
    try {
      const page = await browser.newPage();
  
      await page.goto(url);
      const screenshot = await page.screenshot({
        encoding: 'base64',
      });
      return screenshot;
    } catch (error) {
      console.error("Screenshot error:", error);
      return { error: "Failed to take screenshot" };
    } finally {
      await browser.close();
    }
  } catch (e) {
    console.error("Screenshot error:", e);
    return { error: "Failed to take screenshot" };
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
    const screenshotB64 = await takeScreenshot(url);

    if (
      typeof screenshotB64 !== 'string'
      && 'error' in screenshotB64
    ) throw screenshotB64;

    const screenshot = str2ab(screenshotB64);
    const blob = ab2blob(screenshot);

    setHeader(event, "Content-Type", "image/png");

    return blob;
  } catch (error) {
    console.error("Screenshot error:", error);
    return createError({
      statusCode: 500,
      statusMessage: `Failed to take screenshot: ${error instanceof Error ? error.message : "Unknown error"}`,
    });
  }
});
