const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, 'live_home.html'), 'latin1');

// Match property cards
// In ImobiBrasil, properties are usually in elements with class "imovel-card" or similar, or links with data
const cardRegex = /<a[^>]*href=["'](\/imovel\/[^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
const properties = [];
let match;

while ((match = cardRegex.exec(html)) !== null) {
  const url = match[1];
  const content = match[2];
  
  // Try to find image
  const imgMatch = content.match(/<img[^>]*src=["']([^"']+)["']/i) || content.match(/data-src=["']([^"']+)["']/i) || content.match(/data-original=["']([^"']+)["']/i);
  // Try to find code
  const codeMatch = content.match(/#(\d+)/i) || url.match(/\/imovel\/(\d+)/);
  // Try to find price
  const priceMatch = content.match(/R\$\s*[\d\.,]+/i);
  // Try to find title/type/city/neighborhood
  const textClean = content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  
  // Extract dorms, baths, garages, area
  const dorms = content.match(/(\d+)\s*(?:dorm|quarto)/i);
  const baths = content.match(/(\d+)\s*banh/i);
  const garages = content.match(/(\d+)\s*vaga/i);
  const suites = content.match(/(\d+)\s*su[íi]te/i);
  const area = content.match(/([\d\.,]+)\s*m[²2]/i) || content.match(/Área\s*([\d\.,]+)/i);
  
  if (priceMatch || textClean.includes('Casa') || textClean.includes('Apartamento') || textClean.includes('Lote')) {
    properties.push({
      url,
      code: codeMatch ? `#${codeMatch[1]}` : 'N/A',
      price: priceMatch ? priceMatch[0] : 'Sob Consulta',
      image: imgMatch ? imgMatch[1] : null,
      dorms: dorms ? parseInt(dorms[1]) : 0,
      baths: baths ? parseInt(baths[1]) : 0,
      garages: garages ? parseInt(garages[1]) : 0,
      suites: suites ? parseInt(suites[1]) : 0,
      area: area ? area[1] : null,
      rawText: textClean
    });
  }
}

console.log('Total extracted properties:', properties.length);
console.log('Sample properties:');
console.log(JSON.stringify(properties.slice(0, 5), null, 2));

// Check images on the entire page
const allImgs = [];
const imgReg = /<img[^>]*src=["']([^"']+)["']/gi;
let im;
while ((im = imgReg.exec(html)) !== null) {
  allImgs.push(im[1]);
}
console.log('\nTotal img tags:', allImgs.length);
const cdnImgs = allImgs.filter(src => src.includes('cdn-img') || src.includes('fotos'));
console.log('CDN/property images:', cdnImgs.slice(0, 10));
