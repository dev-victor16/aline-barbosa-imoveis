const fs = require('fs');

const html = fs.readFileSync('scratch/locacao.html', 'latin1');

const propSections = html.split(/<a[^>]*href=["'](\/imovel\/\d+\/[^"']+)["']/i);
console.log('Rental sections found:', propSections.length);

const rentals = [];
for (let i = 1; i < propSections.length; i += 2) {
  const url = propSections[i];
  const chunk = propSections[i + 1] ? propSections[i + 1].slice(0, 1200) : '';
  
  const codeMatch = chunk.match(/#(\d+)/) || url.match(/\/imovel\/(\d+)/);
  const code = codeMatch ? `#${codeMatch[1]}` : null;
  
  const priceMatch = chunk.match(/R\$\s*([\d\.,]+)/i);
  const price = priceMatch ? `R$ ${priceMatch[1]}` : 'Consulte';
  
  const imgMatch = chunk.match(/data-src=["']([^"']+)["']/i) || chunk.match(/src=["']([^"']+)["']/i);
  const img = imgMatch ? imgMatch[1] : null;
  
  const textClean = chunk.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  
  rentals.push({
    code,
    url: 'https://www.alinebarbosaimoveis.com.br' + url,
    price,
    img,
    text: textClean.slice(0, 150)
  });
}

const uniqueRentals = [];
const seen = new Set();
rentals.forEach(r => {
  if (r.code && !seen.has(r.code)) {
    seen.add(r.code);
    uniqueRentals.push(r);
  }
});

console.log('Unique rentals count:', uniqueRentals.length);
console.log(JSON.stringify(uniqueRentals.slice(0, 8), null, 2));
