import { execFile } from 'child_process';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const args = [
  '--headless=new',
  '--disable-gpu',
  '--dump-dom',
  'http://localhost:5173'
];

execFile(chromePath, args, (err, stdout, stderr) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  
  // Search for hero elements
  const hasHero = stdout.includes('id="home"');
  const hasH1 = stdout.includes('Building Modern Websites');
  const hasPageTransition = stdout.includes('transition-column');
  const hasPreloader = stdout.includes('Loading Experience') || stdout.includes('Initializing Experience');
  
  console.log('DOM Inspection:');
  console.log('- Has #home:', hasHero);
  console.log('- Has H1 text:', hasH1);
  console.log('- Has transition-column:', hasPageTransition);
  console.log('- Has preloader:', hasPreloader);
  
  // Extract snippet of #home
  const homeIdx = stdout.indexOf('id="home"');
  if (homeIdx !== -1) {
    console.log('\n--- #home snippet ---');
    console.log(stdout.substring(homeIdx - 50, homeIdx + 600));
  } else {
    console.log('\nCould not find #home in DOM!');
    console.log(stdout.substring(0, 800));
  }
});
