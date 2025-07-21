const puppeteer = require('puppeteer');

async function testMap() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3000');
  await new Promise(r => setTimeout(r, 5000)); // Wait for map to load
  
  // Take initial screenshot
  await page.screenshot({ path: 'map-initial.png', fullPage: true });
  
  // Click the toggle switch
  const toggleSelector = 'input[type="checkbox"]';
  await page.click(toggleSelector);
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: 'map-buildings-off.png', fullPage: true });
  
  // Turn buildings back on
  await page.click(toggleSelector);
  await new Promise(r => setTimeout(r, 2000));
  
  // Test slider at different values
  const sliderSelector = 'input[type="range"]';
  
  // Set to 50%
  await page.evaluate((selector) => {
    document.querySelector(selector).value = 0.5;
    document.querySelector(selector).dispatchEvent(new Event('change', { bubbles: true }));
  }, sliderSelector);
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: 'map-50-percent.png', fullPage: true });
  
  // Set to 0%
  await page.evaluate((selector) => {
    document.querySelector(selector).value = 0;
    document.querySelector(selector).dispatchEvent(new Event('change', { bubbles: true }));
  }, sliderSelector);
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: 'map-0-percent.png', fullPage: true });
  
  console.log('Test complete! Check the screenshots.');
  
  await browser.close();
}

testMap().catch(console.error);