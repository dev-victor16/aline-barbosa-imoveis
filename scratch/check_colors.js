const fs = require('fs');
const html = fs.readFileSync('scratch/live_home.html', 'latin1');

const hexColors = html.match(/#[0-9a-fA-F]{3,6}/g) || [];
const colorCounts = {};
hexColors.forEach(c => {
  const norm = c.toLowerCase();
  colorCounts[norm] = (colorCounts[norm] || 0) + 1;
});
const sortedColors = Object.entries(colorCounts).sort((a, b) => b[1] - a[1]);
console.log('Top colors in HTML:', sortedColors.slice(0, 15));

// Check style tag blocks
const styleBlocks = html.match(/<style[^>]*>([\s\S]*?)<\/style>/gi) || [];
console.log('Style blocks count:', styleBlocks.length);
if (styleBlocks.length > 0) {
  console.log('Sample style block:', styleBlocks[0].slice(0, 500));
}
