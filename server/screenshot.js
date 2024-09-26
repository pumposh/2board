const { chromium } = require("playwright");

async function takeScreenshot(url) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await page.goto(url);
    const screenshot = await page.screenshot();
    return screenshot;
  } finally {
    await browser.close();
  }
}

module.exports = { takeScreenshot };
