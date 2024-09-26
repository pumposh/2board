import { takeScreenshot } from "../screenshot";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const url = query.url;

  if (!url) {
    return { error: "URL is required" };
  }

  try {
    const screenshot = await takeScreenshot(url);
    setHeader(event, "Content-Type", "image/png");
    return screenshot;
  } catch (error) {
    console.error("Screenshot error:", error);
    return { error: "Failed to take screenshot" };
  }
});
