const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, 'live_home.html'), 'latin1');

const linkRegex = /<a\s+[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
const links = [];
let m;
while ((m = linkRegex.exec(html)) !== null) {
  const href = m[1].trim();
  const text = m[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  if (text && !href.startsWith('javascript') && !href.startsWith('#')) {
    links.push({ text, href });
  }
}

// Property links
const propertyLinks = links.filter(l => l.href.includes('/imovel/') && !l.href.includes('?'));
console.log('--- PROPERTY LINKS FOUND ON HOME (' + propertyLinks.length + ') ---');
propertyLinks.slice(0, 15).forEach((p, idx) => {
  console.log(`${idx + 1}. [${p.text}] -> ${p.href}`);
});

// Institutional links
console.log('\n--- INSTITUTIONAL & CATEGORY LINKS ---');
const uniqueInst = new Map();
links.filter(l => !l.href.includes('/imovel/')).forEach(l => {
  if (!uniqueInst.has(l.href)) uniqueInst.set(l.href, l.text);
});
for (const [href, text] of uniqueInst.entries()) {
  console.log(`- [${text}] -> ${href}`);
}
