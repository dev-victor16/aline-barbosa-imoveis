const fs = require('fs');
const path = require('path');

function clean(text) {
  return text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

console.log('================ 1. SOBRE (A Imobiliária / Quem Somos) ================');
const sobre = fs.readFileSync(path.join(__dirname, 'sobre.html'), 'latin1');
const sobreMain = sobre.match(/<main[\s\S]*?<\/main>/i) || sobre.match(/class=["'].*?(?:conteudo|content|sobre).*?["'][\s\S]*?<\/div>/i) || sobre.match(/<article[\s\S]*?<\/article>/i);
const sobreP = sobre.match(/<p[^>]*>([\s\S]*?)<\/p>/gi) || [];
console.log('Sobre paragraphs:');
sobreP.forEach(p => {
  const t = clean(p);
  if (t.length > 30) console.log('>', t);
});

console.log('\n================ 2. CONTATO ================');
const contato = fs.readFileSync(path.join(__dirname, 'contato.html'), 'latin1');
const contatoP = contato.match(/<p[^>]*>([\s\S]*?)<\/p>/gi) || [];
contatoP.forEach(p => {
  const t = clean(p);
  if (t.length > 15) console.log('>', t);
});

console.log('\n================ 3. SEU IMÓVEL ================');
const seuImovel = fs.readFileSync(path.join(__dirname, 'seu-imovel.html'), 'latin1');
const inputs = seuImovel.match(/<input[^>]*name=["']([^"']+)["']/gi) || [];
const selects = seuImovel.match(/<select[^>]*name=["']([^"']+)["']/gi) || [];
console.log('Form inputs:', inputs.map(i => i.match(/name=["']([^"']+)["']/i)[1]));
console.log('Form selects:', selects.map(s => s.match(/name=["']([^"']+)["']/i)[1]));

console.log('\n================ 4. FINANCIAMENTO ================');
const fin = fs.readFileSync(path.join(__dirname, 'financiamento.html'), 'latin1');
const finLinks = fin.match(/<a\s+[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi) || [];
console.log('Financing links / banks:');
finLinks.forEach(l => {
  const m = clean(l);
  const href = l.match(/href=["']([^"']+)["']/i)[1];
  if (href.includes('caixa') || href.includes('bb') || href.includes('itau') || href.includes('santander') || href.includes('bradesco') || href.includes('simula')) {
    console.log(`- ${m} -> ${href}`);
  }
});

console.log('\n================ 5. PERÍCIA JUDICIAL & AVALIAÇÃO ================');
const pericia = fs.readFileSync(path.join(__dirname, 'pericia.html'), 'latin1');
const periciaP = pericia.match(/<p[^>]*>([\s\S]*?)<\/p>/gi) || [];
periciaP.forEach(p => {
  const t = clean(p);
  if (t.length > 30) console.log('>', t);
});

console.log('\n================ 6. IMÓVEL DETALHADO (#590) ================');
const imovel = fs.readFileSync(path.join(__dirname, 'imovel_590.html'), 'latin1');
const imovelTitle = imovel.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
console.log('Imóvel H1:', imovelTitle ? clean(imovelTitle[1]) : 'N/A');

const imovelPreco = imovel.match(/(?:R\$|Valor)[^<>\n\r]{2,30}/gi) || [];
console.log('Preço match:', imovelPreco.slice(0, 5));

const imovelImgs = imovel.match(/<img[^>]*src=["']([^"']*(?:cdn-img-src|fotos|imovel)[^"']*)["']/gi) || [];
console.log('Total property images:', imovelImgs.length);
if (imovelImgs.length > 0) console.log('Sample image URL:', imovelImgs[0].match(/src=["']([^"']+)["']/i)[1]);
