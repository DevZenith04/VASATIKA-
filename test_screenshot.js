const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('http://localhost:8001/blog.html', { waitUntil: 'networkidle0' });
  
  // Click the first blog card
  await page.click('.blog-card');
  
  // Wait 500ms (mid-animation)
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'screenshot_mid_anim.png' });
  
  // Wait another 1s (animation done)
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'screenshot_done.png' });
  
  await browser.close();
})();
