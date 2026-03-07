import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'temporary screenshots');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});
const page = await browser.newPage();
// 2× resolution via deviceScaleFactor
await page.setViewport({width:1280, height:720, deviceScaleFactor:2});

await page.goto('http://localhost:3000', {waitUntil:'networkidle2', timeout:30000});
await page.evaluate(() => {
  localStorage.setItem('dsa-dungeon-save', JSON.stringify({zone:1,level:1,heroHP:75,heroMaxHP:100,started:Date.now()}));
});
await page.reload({waitUntil:'networkidle2'});
await new Promise(r => setTimeout(r, 800));

await page.evaluate(() => {
  const btns = Array.from(document.querySelectorAll('button'));
  btns.find(b => b.textContent.includes('Continue'))?.click();
});
await new Promise(r => setTimeout(r, 700));

await page.evaluate(() => {
  document.querySelector('.zone-card:not(.locked)')?.click();
});
await new Promise(r => setTimeout(r, 600));

await page.evaluate(() => {
  Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Enter Zone'))?.click();
});
await new Promise(r => setTimeout(r, 600));

await page.evaluate(() => {
  for(const d of document.querySelectorAll('div')) {
    if(window.getComputedStyle(d).cursor === 'pointer' && d.textContent.includes('Memory Relocation')) {
      d.click(); return;
    }
  }
});
await new Promise(r => setTimeout(r, 1200));

// Full screenshot
await page.screenshot({path: path.join(dir, 'screenshot-nav-6-full.png')});

// Crop around Arthur (right panel, top of isometric grid)
// In 2x deviceScaleFactor, coordinates are in CSS pixels but screenshot is 2x
const clip = { x: 780, y: 110, width: 200, height: 200 };
await page.screenshot({path: path.join(dir, 'screenshot-nav-7-arthur-closeup.png'), clip});
console.log('done');
await browser.close();
