const fs = require('fs');
const html = fs.readFileSync('scratch/live_home.html', 'latin1');

const cssLinks = html.match(/<link[^>]*rel=["']stylesheet["'][^>]*>/gi) || [];
console.log('CSS links:');
cssLinks.forEach(l => console.log(l));

const scripts = html.match(/<script[^>]*src=["']([^"']+)["'][^>]*>/gi) || [];
console.log('\nScript sources:');
scripts.forEach(s => console.log(s));
