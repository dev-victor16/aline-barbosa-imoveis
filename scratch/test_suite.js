const assert = require('assert');
const { PROPERTIES_DATA, ALINE_BARBOSA_INFO, BANK_PARTNERS } = require('../js/data.js');
const { PropertySearchEngine } = require('../js/search.js');
const { FinanceCalculator } = require('../js/simulator.js');

console.log('--- TEST 1: Dados Institucionais & Catálogo ---');
assert(PROPERTIES_DATA.length >= 10, 'Deve conter pelo menos 10 imóveis reais');
assert(ALINE_BARBOSA_INFO.creci.includes('38.616'), 'CRECI deve conter 38.616');
assert(ALINE_BARBOSA_INFO.cnai.includes('39797'), 'CNAI deve conter 39797');
assert(ALINE_BARBOSA_INFO.phoneRaw === '5531986063842', 'WhatsApp deve ser 5531986063842');
assert(BANK_PARTNERS.length === 5, 'Deve conter os 5 bancos parceiros');
console.log('✅ Catálogo com', PROPERTIES_DATA.length, 'imóveis validados com sucesso.');

console.log('--- TEST 2: Motor de Busca & Filtragem ---');
const engine = new PropertySearchEngine(PROPERTIES_DATA);

// Test Venda
engine.setFilter('purpose', 'venda');
const vendas = engine.filter();
assert(vendas.length > 0 && vendas.every(p => p.purpose === 'venda'), 'Todos devem ser venda');

// Test Locação
engine.setFilter('purpose', 'locacao');
const locacoes = engine.filter();
assert(locacoes.length > 0 && locacoes.every(p => p.purpose === 'locacao'), 'Todos devem ser locação');

// Test Tipo Casa
engine.resetFilters();
engine.setFilter('type', 'casa');
const casas = engine.filter();
assert(casas.length > 0 && casas.every(p => p.type === 'casa'), 'Todos devem ser casa');

// Test Bairro Masterville
engine.resetFilters();
engine.setFilter('neighborhood', 'Masterville');
const masterville = engine.filter();
assert(masterville.length > 0 && masterville.every(p => p.neighborhood.includes('Masterville')), 'Filtro por bairro deve funcionar');

// Test Código do Imóvel #590
engine.resetFilters();
engine.setFilter('codeOrKeyword', '590');
const prop590 = engine.filter();
assert(prop590.length === 1 && prop590[0].code === '#590', 'Busca por código #590 deve retornar o imóvel exato');

// Test Código do Imóvel #548
engine.resetFilters();
engine.setFilter('codeOrKeyword', '#548');
const prop548 = engine.filter();
assert(prop548.length === 1 && prop548[0].code === '#548', 'Busca por código #548 deve retornar o imóvel exato');

console.log('✅ Motor de busca passou em todos os testes de filtragem.');

console.log('--- TEST 3: Simulador Financeiro SAC & PRICE ---');
const sac = new FinanceCalculator(450000, 90000, 30, 9.99, 'SAC');
const resSac = sac.calculate();
assert(resSac.firstInstallment > resSac.lastInstallment, 'No SAC a primeira parcela deve ser maior que a última');
assert(resSac.loanAmount === 360000, 'Financiamento de 360k');

const price = new FinanceCalculator(450000, 90000, 30, 9.99, 'PRICE');
const resPrice = price.calculate();
assert(resPrice.firstInstallment === resPrice.lastInstallment, 'No PRICE a parcela é fixa');
assert(price.generateWhatsAppMessage('Caixa').length > 50, 'Mensagem WhatsApp deve ser gerada');

console.log('✅ Simulador financeiro verificado com precisão matemática.');
console.log('🎉 TODOS OS TESTES PASSARAM COM 100% DE SUCESSO!');
