const fs = require('fs');

const html = fs.readFileSync('scratch/live_home.html', 'latin1');

// Extract all properties listed on the homepage
const items = [];
const blocks = html.split(/class=["'][^"']*imovel-card[^"']*["']|class=["'][^"']*card-imovel[^"']*["']|class=["'][^"']*item-imovel[^"']*["']|class=["'][^"']*grid-imovel[^"']*["']/i);

// Alternatively, split by property links
const propSections = html.split(/<a[^>]*href=["'](\/imovel\/\d+\/[^"']+)["']/i);

console.log('Sections found:', propSections.length);

const propertyList = [];
for (let i = 1; i < propSections.length; i += 2) {
  const url = propSections[i];
  const chunk = propSections[i + 1] ? propSections[i + 1].slice(0, 1500) : '';
  
  const codeMatch = chunk.match(/#(\d+)/) || url.match(/\/imovel\/(\d+)/);
  const code = codeMatch ? `#${codeMatch[1]}` : null;
  
  const priceMatch = chunk.match(/R\$\s*([\d\.,]+)/i);
  const price = priceMatch ? `R$ ${priceMatch[1]}` : 'Consulte';
  
  const imgMatch = chunk.match(/data-src=["']([^"']+)["']/i) || chunk.match(/src=["']([^"']+)["']/i);
  const img = imgMatch ? imgMatch[1] : null;
  
  const dormsMatch = chunk.match(/(\d+)\s*(?:Dorm|Quarto)/i);
  const bathsMatch = chunk.match(/(\d+)\s*Banh/i);
  const vagasMatch = chunk.match(/(\d+)\s*Vaga/i);
  const suiteMatch = chunk.match(/(\d+)\s*Su[íi]te/i);
  const areaMatch = chunk.match(/([\d\.,]+)\s*m[²2]/i) || chunk.match(/Área\s*([\d\.,]+)/i);
  
  // Extract text for title and neighborhood
  const textClean = chunk.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  
  // Title & Location matching
  const locMatch = textClean.match(/(Casa|Apartamento|Lote|Cobertura|Comercial|Sítio)\s+([A-Za-zÀ-ÿ\s]+),\s*([A-Za-zÀ-ÿ\s\(\)]+)/i);
  
  propertyList.push({
    code: code || 'N/A',
    url: 'https://www.alinebarbosaimoveis.com.br' + url,
    price,
    img,
    dorms: dormsMatch ? parseInt(dormsMatch[1]) : (chunk.includes('Dorm') ? 1 : 0),
    baths: bathsMatch ? parseInt(bathsMatch[1]) : (chunk.includes('Banh') ? 1 : 0),
    vagas: vagasMatch ? parseInt(vagasMatch[1]) : (chunk.includes('Vaga') ? 1 : 0),
    suites: suiteMatch ? parseInt(suiteMatch[1]) : 0,
    area: areaMatch ? areaMatch[1] : null,
    previewText: textClean.slice(0, 180)
  });
}

// Deduplicate by code
const unique = [];
const seen = new Set();
propertyList.forEach(p => {
  if (p.code && !seen.has(p.code)) {
    seen.add(p.code);
    unique.push(p);
  }
});

console.log('Unique properties found:', unique.length);
console.log(JSON.stringify(unique.slice(0, 12), null, 2));
