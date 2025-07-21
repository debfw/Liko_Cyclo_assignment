const puppeteer = require('puppeteer');

async function testLayers() {
  const browser = await puppeteer.launch({ 
    headless: false,
    args: ['--window-size=1600,900']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 900 });
  
  console.log('Opening page...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  // Wait a bit for map to initialize
  await new Promise(r => setTimeout(r, 5000));
  
  console.log('Taking initial screenshot...');
  await page.screenshot({ path: 'test-1-initial.png', fullPage: true });
  
  // Test toggle
  console.log('Testing toggle...');
  const toggle = await page.$('input[type="checkbox"]');
  if (toggle) {
    await toggle.click();
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: 'test-2-buildings-off.png', fullPage: true });
    
    await toggle.click();
    await new Promise(r => setTimeout(r, 2000));
  }
  
  // Test slider
  console.log('Testing slider...');
  const slider = await page.$('input[type="range"].slider');
  if (slider) {
    // Set to 50%
    await page.evaluate(() => {
      const slider = document.querySelector('input[type="range"].slider');
      if (slider) {
        slider.value = '0.5';
        slider.dispatchEvent(new Event('change', { bubbles: true }));
        slider.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: 'test-3-opacity-50.png', fullPage: true });
    
    // Set to 25%
    await page.evaluate(() => {
      const slider = document.querySelector('input[type="range"].slider');
      if (slider) {
        slider.value = '0.25';
        slider.dispatchEvent(new Event('change', { bubbles: true }));
        slider.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: 'test-4-opacity-25.png', fullPage: true });
  }
  
  // Check layer info
  const info = await page.evaluate(() => {
    const layers = document.querySelectorAll('.ol-layer');
    const toggle = document.querySelector('input[type="checkbox"]');
    const slider = document.querySelector('input[type="range"].slider');
    const opacityText = document.querySelector('.text-blue-600');
    
    return {
      layerCount: layers.length,
      toggleChecked: toggle?.checked,
      sliderValue: slider?.value,
      opacityText: opacityText?.textContent
    };
  });
  
  console.log('Layer info:', info);
  
  // Log console messages
  page.on('console', msg => console.log('Browser console:', msg.text()));
  
  console.log('\nTest complete! Check the screenshots:');
  console.log('- test-1-initial.png');
  console.log('- test-2-buildings-off.png');
  console.log('- test-3-opacity-50.png');
  console.log('- test-4-opacity-25.png');
  
  await new Promise(r => setTimeout(r, 5000));
  await browser.close();
}

testLayers().catch(console.error);