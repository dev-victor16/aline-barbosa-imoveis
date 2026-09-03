/**
 * ALINE BARBOSA IMÓVEIS - MOTOR DE BUSCA CLIENT-SIDE 2026
 * Filtragem em tempo real, multi-critério e sem recarregamento de página.
 */

class PropertySearchEngine {
  constructor(properties) {
    this.allProperties = properties || [];
    this.filters = {
      purpose: 'todos',
      type: 'todos',
      city: 'todos',
      neighborhood: 'todos',
      minDorms: 0,
      minGarages: 0,
      maxPrice: Infinity,
      codeOrKeyword: '',
      sortBy: 'relevance'
    };
  }

  setFilter(key, value) {
    if (key in this.filters) {
      this.filters[key] = value;
    }
  }

  resetFilters() {
    this.filters = {
      purpose: 'todos',
      type: 'todos',
      city: 'todos',
      neighborhood: 'todos',
      minDorms: 0,
      minGarages: 0,
      maxPrice: Infinity,
      codeOrKeyword: '',
      sortBy: 'relevance'
    };
  }

  filter() {
    return this.allProperties.filter(prop => {
      // 1. Finalidade (Venda / Locação)
      if (this.filters.purpose !== 'todos' && prop.purpose !== this.filters.purpose) {
        return false;
      }

      // 2. Tipo de imóvel
      if (this.filters.type !== 'todos' && prop.type !== this.filters.type) {
        return false;
      }

      // 3. Cidade
      if (this.filters.city !== 'todos') {
        const normCity = this.filters.city.toLowerCase();
        if (!prop.city.toLowerCase().includes(normCity)) {
          return false;
        }
      }

      // 4. Bairro
      if (this.filters.neighborhood !== 'todos') {
        const normNeigh = this.filters.neighborhood.toLowerCase();
        if (!prop.neighborhood.toLowerCase().includes(normNeigh)) {
          return false;
        }
      }

      // 5. Quartos mínimos
      if (this.filters.minDorms > 0 && prop.dorms < this.filters.minDorms) {
        return false;
      }

      // 6. Vagas mínimas
      if (this.filters.minGarages > 0 && prop.garages < this.filters.minGarages) {
        return false;
      }

      // 7. Preço máximo
      if (this.filters.maxPrice < Infinity && prop.price > this.filters.maxPrice) {
        return false;
      }

      // 8. Busca por Código ou Palavra-chave
      if (this.filters.codeOrKeyword) {
        const query = this.filters.codeOrKeyword.trim().toLowerCase().replace('#', '');
        const matchCode = prop.code.toLowerCase().replace('#', '').includes(query);
        const matchTitle = prop.title.toLowerCase().includes(query);
        const matchNeigh = prop.neighborhood.toLowerCase().includes(query);
        const matchCity = prop.city.toLowerCase().includes(query);
        const matchDesc = prop.description.toLowerCase().includes(query);

        if (!matchCode && !matchTitle && !matchNeigh && !matchCity && !matchDesc) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (this.filters.sortBy === 'price-asc') return a.price - b.price;
      if (this.filters.sortBy === 'price-desc') return b.price - a.price;
      if (this.filters.sortBy === 'area-desc') return b.area - a.area;
      // Default: destaque primeiro
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }

  getAvailableNeighborhoods() {
    const set = new Set();
    this.allProperties.forEach(p => {
      if (p.neighborhood) set.add(p.neighborhood);
    });
    return Array.from(set).sort();
  }

  getAvailableCities() {
    const set = new Set();
    this.allProperties.forEach(p => {
      if (p.city) set.add(p.city);
    });
    return Array.from(set).sort();
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PropertySearchEngine };
}
