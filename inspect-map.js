const puppeteer = require('puppeteer');

async function inspectMap() {
  const browser = await puppeteer.launch({ 
    headless: false,
    devtools: true,
    args: ['--window-size=1400,900']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });
  
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  // Wait for map container
  await page.waitForSelector('[ref="mapRef"]', { timeout: 10000 }).catch(() => {
    console.log('Map container not found with ref, trying class selector');
  });
  
  // Check if layers are loaded
  const layerInfo = await page.evaluate(() => {
    const mapEl = document.querySelector('.ol-viewport');
    const layers = document.querySelectorAll('.ol-layer');
    const toggle = document.querySelector('input[type="checkbox"]');
    const slider = document.querySelector('input[type="range"]');
    
    return {
      mapFound: !!mapEl,
      layersCount: layers.length,
      toggleFound: !!toggle,
      toggleChecked: toggle?.checked,
      sliderFound: !!slider,
      sliderValue: slider?.value
    };
  });
  
  console.log('Initial state:', layerInfo);
  
  // Take screenshot
  await page.screenshot({ path: 'map-inspection.png', fullPage: true });
  
  // Log any console errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('Console error:', msg.text());
    }
  });
  
  console.log('Browser window will stay open for manual inspection.');
  console.log('Check the console for any errors.');
  console.log('Close the browser window when done.');
}

inspectMap().catch(console.error);