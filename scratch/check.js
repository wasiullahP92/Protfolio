import { execFile } from 'child_process';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const screenshotPath = path.resolve('test-render.png');

console.log('Capturing headless Chrome screenshot of http://localhost:5173...');
const args = [
  '--headless=new',
  '--disable-gpu',
  '--window-size=1280,900',
  `--screenshot=${screenshotPath}`,
  'http://localhost:5173'
];

execFile(chromePath, args, (err, stdout, stderr) => {
  if (err) {
    console.error('Chrome execution error:', err);
    return;
  }
  if (fs.existsSync(screenshotPath)) {
    const stats = fs.statSync(screenshotPath);
    console.log('SUCCESS! Screenshot generated:', screenshotPath, 'Size:', stats.size, 'bytes');
  } else {
    console.log('Screenshot file was not created. Stdout:', stdout, 'Stderr:', stderr);
  }
});
