import puppeteer from 'puppeteer';
import { str2ab, ab2blob } from '@utils/data';

async function takeScreenshot(
  url: string
): Promise<Blob> {
  try {
    const browser = await puppeteer.launch();
    try {
      const page = await browser.newPage();

      await page.goto(url);

      const screenshot = await page.screenshot({ type: "png", fullPage: true })
      const blob = ab2blob(screenshot.buffer);
  
      await browser.close();
      return blob;
    } catch (error) {
      await browser.close();
      throw createError({
        statusCode: 500,
        statusMessage: `Failed to take screenshot: ${error instanceof Error ? error.message : "Unknown error"}`,
      });
    } finally {
      await browser.close();
    }
  } catch (e) {
    console.error("Screenshot error:", e);
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to take screenshot: ${e instanceof Error ? e.message : "Unknown error"}`,
    });
  }
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const url = query.url;

  if (!url) {
    throw createError({
      statusCode: 400,
      statusMessage: "URL is required",
    });
  }

  if (typeof url !== "string") {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid URL",
    });
  }

  try {
    console.log("Taking screenshot of:", url);

    const blob = await takeScreenshot(url);

    setHeader(event, "Content-Type", "image/png");

    return blob;
  } catch (error) {
    console.error("Screenshot error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to take screenshot: ${error instanceof Error ? error.message : "Unknown error"}`,
    });
  }
});
