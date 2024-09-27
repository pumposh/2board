import { webkit } from "playwright";
import { ab2blob, buffer2ab } from "~/utils/data";

async function takeScreenshot(url: string) {
  const browser = await webkit.launch();
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
    if ('error' in screenshot) throw screenshot;
    const arrayBuffer = buffer2ab(screenshot);
    const blob = ab2blob(arrayBuffer);
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
