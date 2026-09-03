const fs = require('fs');
const html = fs.readFileSync('scratch/live_home.html', 'latin1');

const bgMatches = html.match(/url\(['"]?([^'"\)]+)['"]?\)/gi) || [];
console.log('Background URLs found:', bgMatches.length);
const cdnBgs = bgMatches.filter(u => u.includes('imobibrasil') || u.includes('foto') || u.includes('thumb'));
console.log('Sample background URLs:', cdnBgs.slice(0, 10));

const dataSrcs = html.match(/data-[a-z0-9_-]+=["']([^"']+)["']/gi) || [];
console.log('Data attributes found:', dataSrcs.slice(0, 10));

const imovelImgs = fs.readFileSync('scratch/imovel_590.html', 'latin1');
const imovelBgs = imovelImgs.match(/url\(['"]?([^'"\)]+)['"]?\)/gi) || [];
console.log('\nImovel 590 backgrounds:', imovelBgs.slice(0, 10));
const imovelImgTags = imovelImgs.match(/<img[^>]+>/gi) || [];
console.log('Imovel 590 img tags count:', imovelImgTags.length);
console.log('Sample imovel 590 img tags:', imovelImgTags.slice(0, 10));
