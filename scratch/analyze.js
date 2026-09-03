const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, 'live_home.html'), 'latin1');

console.log('=== 1. TITLE & META ===');
const title = html.match(/<title>([\s\S]*?)<\/title>/i);
console.log('Title:', title ? title[1].trim() : 'N/A');

const desc = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([\s\S]*?)["']/i);
console.log('Description:', desc ? desc[1].trim() : 'N/A');

const keywords = html.match(/<meta[^>]*name=["']keywords["'][^>]*content=["']([\s\S]*?)["']/i);
console.log('Keywords:', keywords ? keywords[1].trim() : 'N/A');

console.log('\n=== 2. CONTACTS & CRECI ===');
const creci = html.match(/CRECI[^<>\n\r]+/gi);
console.log('CRECI match:', creci ? [...new Set(creci)] : 'Not found');

const phones = html.match(/(\(?\d{2}\)?\s*9?\d{4}[-\s]?\d{4})/g);
console.log('Phones:', phones ? [...new Set(phones)].slice(0, 10) : 'Not found');

const emails = html.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/g);
console.log('Emails:', emails ? [...new Set(emails)] : 'Not found');

const address = html.match(/(Rua|Av|Avenida|Alameda|Praça)[^<>\n\r]{10,90}/gi);
console.log('Address candidates:', address ? [...new Set(address)].slice(0, 10) : 'Not found');

console.log('\n=== 3. LOGO & BRANDING ===');
const logos = html.match(/<img[^>]*src=["']([^"']*(?:logo|marca|brand)[^"']*)["'][^>]*>/gi);
console.log('Logo imgs:', logos);

console.log('\n=== 4. MENU / NAVIGATION ===');
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
console.log('Total nav links:', links.length);
console.log('Sample links:', links.slice(0, 35));

console.log('\n=== 5. SAMPLE PROPERTIES ===');
const propMatches = html.match(/class=["'][^"']*(?:imovel|card|item|anuncio)[^"']*["']/gi);
console.log('Property class occurrences:', propMatches ? propMatches.length : 0);
