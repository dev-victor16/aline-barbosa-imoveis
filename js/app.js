/**
 * ALINE BARBOSA IMÓVEIS - CONTROLADOR PRINCIPAL DA APLICAÇÃO 2026
 * Renderização de cards, modais, simulador interativo e WhatsApp.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Instanciar Motores
  const searchEngine = new PropertySearchEngine(PROPERTIES_DATA);
  const defaultBank = BANK_PARTNERS[0];
  let selectedBank = defaultBank;
  const financeCalc = new FinanceCalculator(450000, 90000, 30, selectedBank.rateAnnual, 'SAC');

  // Elementos do DOM
  const propertiesContainer = document.getElementById('properties-container');
  const propertiesCountBadge = document.getElementById('properties-count-badge');
  const citySelect = document.getElementById('filter-city');
  const neighborhoodSelect = document.getElementById('filter-neighborhood');
  const typeSelect = document.getElementById('filter-type');
  const codeInput = document.getElementById('filter-code');
  const btnSearch = document.getElementById('btn-main-search');

  // 2. Popular Dropdowns de Localização
  function populateFilters() {
    if (citySelect) {
      const cities = searchEngine.getAvailableCities();
      cities.forEach(city => {
        const opt = document.createElement('option');
        opt.value = city;
        opt.textContent = city;
        citySelect.appendChild(opt);
      });
    }

    if (neighborhoodSelect) {
      const neighs = searchEngine.getAvailableNeighborhoods();
      neighs.forEach(n => {
        const opt = document.createElement('option');
        opt.value = n;
        opt.textContent = n;
        neighborhoodSelect.appendChild(opt);
      });
    }
  }

  // 3. Renderizar Lista de Imóveis
  function renderProperties() {
    if (!propertiesContainer) return;
    const properties = searchEngine.filter();

    if (propertiesCountBadge) {
      propertiesCountBadge.textContent = `${properties.length} imóvel(is) encontrado(s)`;
    }

    if (properties.length === 0) {
      propertiesContainer.innerHTML = `
        <div class="empty-properties">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
          <h3>Nenhum imóvel encontrado com esses filtros</h3>
          <p>Tente ajustar os critérios de busca, selecionar outra região ou limpar os filtros.</p>
          <button class="btn btn-outline" id="btn-empty-reset">Limpar Todos os Filtros</button>
        </div>
      `;
      const btnReset = document.getElementById('btn-empty-reset');
      if (btnReset) {
        btnReset.addEventListener('click', () => {
          resetAllFilters();
        });
      }
      return;
    }

    propertiesContainer.innerHTML = properties.map(p => {
      // Calcular parcela aproximada de financiamento (entrada 20%, 35 anos Caixa)
      let installmentHtml = '';
      if (p.purpose === 'venda') {
        const calc = new FinanceCalculator(p.price, p.price * 0.2, 35, 9.99, 'SAC');
        const res = calc.calculate();
        installmentHtml = `<span class="card-installment">Parcelas a partir de R$ ${res.firstInstallment.toLocaleString('pt-BR')}/mês</span>`;
      } else {
        installmentHtml = `<span class="card-installment" style="color: var(--accent-emerald);">Sem fiador via CredPago</span>`;
      }

      const tagBadge = p.tag ? `<span class="badge-tag">${p.tag}</span>` : '';
      const purposeBadge = p.purpose === 'venda' ? 
        `<span class="badge-purpose">Venda</span>` : 
        `<span class="badge-purpose locacao">Locação</span>`;

      return `
        <article class="property-card" data-id="${p.id}">
          <div class="card-image-wrap">
            <img src="${p.images[0]}" alt="${p.title}" class="card-image" loading="lazy" onerror="this.src='assets/img/logo.svg'; this.style.padding='40px';">
            ${purposeBadge}
            ${tagBadge}
            <span class="card-code">${p.code}</span>
          </div>
          <div class="card-body">
            <div class="card-price-wrap">
              <span class="card-price">${p.priceFormatted}</span>
              ${installmentHtml}
            </div>
            <div class="card-location">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>${p.neighborhood}, ${p.city}</span>
            </div>
            <h3 class="card-title">${p.title}</h3>
            <div class="card-specs">
              ${p.dorms > 0 ? `
              <div class="spec-item" title="${p.dorms} Dormitórios">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 20v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8"/><path d="M5 10V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4"/><circle cx="12" cy="6" r="2"/></svg>
                <span>${p.dorms} qts</span>
              </div>` : ''}
              ${p.baths > 0 ? `
              <div class="spec-item" title="${p.baths} Banheiros">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-1C4.7 2.5 4 3.2 4 4v2"/><path d="M12 21H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4"/><path d="M2 12h20"/></svg>
                <span>${p.baths} banh</span>
              </div>` : ''}
              ${p.garages > 0 ? `
              <div class="spec-item" title="${p.garages} Vagas">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="7.5" cy="15.5" r="1.5"/><circle cx="16.5" cy="15.5" r="1.5"/><path d="m5 10 2-4h10l2 4"/></svg>
                <span>${p.garages} vagas</span>
              </div>` : ''}
              ${p.area ? `
              <div class="spec-item" title="Área total">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 3H3v18h18V3z"/><path d="m3 9 6-6"/><path d="m3 15 12-12"/><path d="m3 21 18-18"/></svg>
                <span>${p.area}m²</span>
              </div>` : ''}
            </div>
            <div class="card-actions">
              <button class="btn-card-details" onclick="window.openPropertyModal('${p.id}')">Ver Detalhes</button>
              <a href="${getWhatsAppPropertyLink(p)}" target="_blank" rel="noopener" class="btn-card-wa" title="Conversar no WhatsApp sobre este imóvel">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </a>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  // 4. WhatsApp Links Formatters
  function getWhatsAppPropertyLink(p) {
    const text = `Olá, Aline Barbosa! Vi o imóvel código ${p.code} (${p.title} em ${p.neighborhood}, ${p.city} - ${p.priceFormatted}) e gostaria de agendar uma visita e tirar dúvidas. Poderia me atender?`;
    return `https://wa.me/${ALINE_BARBOSA_INFO.phoneRaw}?text=${encodeURIComponent(text)}`;
  }

  // 5. Controles de Busca & Filtros
  const searchTabButtons = document.querySelectorAll('.search-tab-btn');
  searchTabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      searchTabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const purpose = btn.getAttribute('data-purpose');
      searchEngine.setFilter('purpose', purpose);
      renderProperties();
    });
  });

  const dormPills = document.querySelectorAll('.pill-dorms');
  dormPills.forEach(pill => {
    pill.addEventListener('click', () => {
      dormPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const dorms = parseInt(pill.getAttribute('data-dorms') || '0');
      searchEngine.setFilter('minDorms', dorms);
      renderProperties();
    });
  });

  if (citySelect) {
    citySelect.addEventListener('change', (e) => {
      searchEngine.setFilter('city', e.target.value);
      renderProperties();
    });
  }

  if (neighborhoodSelect) {
    neighborhoodSelect.addEventListener('change', (e) => {
      searchEngine.setFilter('neighborhood', e.target.value);
      renderProperties();
    });
  }

  if (typeSelect) {
    typeSelect.addEventListener('change', (e) => {
      searchEngine.setFilter('type', e.target.value);
      renderProperties();
    });
  }

  if (btnSearch) {
    btnSearch.addEventListener('click', () => {
      if (codeInput) {
        searchEngine.setFilter('codeOrKeyword', codeInput.value);
      }
      renderProperties();
      const catalogEl = document.getElementById('catalogo');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  if (codeInput) {
    codeInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        searchEngine.setFilter('codeOrKeyword', codeInput.value);
        renderProperties();
        const catalogEl = document.getElementById('catalogo');
        if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  const btnResetFilters = document.getElementById('btn-reset-filters');
  if (btnResetFilters) {
    btnResetFilters.addEventListener('click', resetAllFilters);
  }

  function resetAllFilters() {
    searchEngine.resetFilters();
    if (citySelect) citySelect.value = 'todos';
    if (neighborhoodSelect) neighborhoodSelect.value = 'todos';
    if (typeSelect) typeSelect.value = 'todos';
    if (codeInput) codeInput.value = '';
    searchTabButtons.forEach(b => b.classList.toggle('active', b.getAttribute('data-purpose') === 'todos'));
    dormPills.forEach(p => p.classList.toggle('active', p.getAttribute('data-dorms') === '0'));
    renderProperties();
  }

  // 6. Modal do Imóvel
  const propertyModal = document.getElementById('property-modal-backdrop');
  const modalContainer = document.getElementById('property-modal-content');

  window.openPropertyModal = function(id) {
    const prop = PROPERTIES_DATA.find(p => p.id === id);
    if (!prop || !propertyModal || !modalContainer) return;

    modalContainer.innerHTML = `
      <div class="modal-gallery">
        <button class="modal-close-btn" onclick="window.closePropertyModal()" aria-label="Fechar modal">✕</button>
        <div class="gallery-main-image-wrap">
          <img id="modal-main-image" src="${prop.images[0]}" alt="${prop.title}" class="gallery-main-image">
        </div>
        ${prop.images.length > 1 ? `
        <div class="gallery-thumbnails-strip">
          ${prop.images.map((img, idx) => `
            <img src="${img}" class="gallery-thumb ${idx === 0 ? 'active' : ''}" onclick="window.switchModalImage('${img}', this)" alt="Foto ${idx + 1}">
          `).join('')}
        </div>` : ''}
      </div>
      <div class="modal-body">
        <div class="modal-header-row">
          <div class="modal-title-group">
            <span class="badge-creci">${prop.code} &bull; ${prop.type.toUpperCase()}</span>
            <h2>${prop.title}</h2>
            <div class="modal-location-text">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>${prop.neighborhood}, ${prop.city} / MG</span>
            </div>
          </div>
          <div class="modal-price-group">
            <div class="modal-price-val">${prop.priceFormatted}</div>
            <div class="modal-price-installment">${prop.purpose === 'venda' ? 'Aceita Financiamento Caixa & FGTS' : 'Locação Sem Fiador via CredPago'}</div>
          </div>
        </div>

        <div class="modal-specs-grid">
          ${prop.dorms > 0 ? `
          <div class="modal-spec-card">
            <span class="spec-name">Dormitórios</span>
            <div class="spec-val-row">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 20v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8"/><path d="M5 10V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4"/><circle cx="12" cy="6" r="2"/></svg>
              <span>${prop.dorms} ${prop.suites > 0 ? `(${prop.suites} suíte)` : ''}</span>
            </div>
          </div>` : ''}
          ${prop.baths > 0 ? `
          <div class="modal-spec-card">
            <span class="spec-name">Banheiros</span>
            <div class="spec-val-row">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-1C4.7 2.5 4 3.2 4 4v2"/><path d="M12 21H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4"/><path d="M2 12h20"/></svg>
              <span>${prop.baths}</span>
            </div>
          </div>` : ''}
          ${prop.garages > 0 ? `
          <div class="modal-spec-card">
            <span class="spec-name">Vagas de Garagem</span>
            <div class="spec-val-row">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="7.5" cy="15.5" r="1.5"/><circle cx="16.5" cy="15.5" r="1.5"/><path d="m5 10 2-4h10l2 4"/></svg>
              <span>${prop.garages}</span>
            </div>
          </div>` : ''}
          ${prop.area ? `
          <div class="modal-spec-card">
            <span class="spec-name">Área Construída</span>
            <div class="spec-val-row">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 3H3v18h18V3z"/><path d="m3 9 6-6"/><path d="m3 15 12-12"/><path d="m3 21 18-18"/></svg>
              <span>${prop.area} m²</span>
            </div>
          </div>` : ''}
        </div>

        <div class="modal-description-sec">
          <h3 class="modal-section-h3">Descrição Completa do Imóvel</h3>
          <p class="modal-description-text">${prop.description}</p>
        </div>

        ${prop.amenities && prop.amenities.length > 0 ? `
        <div class="modal-description-sec">
          <h3 class="modal-section-h3">Diferenciais e Comodidades</h3>
          <div class="modal-amenities-tags">
            ${prop.amenities.map(a => `
              <span class="amenity-pill">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                ${a}
              </span>
            `).join('')}
          </div>
        </div>` : ''}

        <div class="modal-actions-bar">
          <a href="${getWhatsAppPropertyLink(prop)}" target="_blank" rel="noopener" class="btn-modal-wa">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
            Agendar Visita via WhatsApp
          </a>
          <button class="btn btn-outline" onclick="window.useInSimulator(${prop.price})">Simular Financiamento Deste Imóvel</button>
        </div>
      </div>
    `;

    propertyModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closePropertyModal = function() {
    if (propertyModal) {
      propertyModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  window.switchModalImage = function(src, el) {
    const mainImg = document.getElementById('modal-main-image');
    if (mainImg) {
      mainImg.src = src;
      document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
      el.classList.add('active');
    }
  };

  window.useInSimulator = function(price) {
    window.closePropertyModal();
    const simSection = document.getElementById('simulador');
    if (simSection) {
      simSection.scrollIntoView({ behavior: 'smooth' });
    }
    const sliderPrice = document.getElementById('calc-slider-price');
    if (sliderPrice) {
      sliderPrice.value = price;
      sliderPrice.dispatchEvent(new Event('input'));
    }
  };

  if (propertyModal) {
    propertyModal.addEventListener('click', (e) => {
      if (e.target === propertyModal) {
        window.closePropertyModal();
      }
    });
  }

  // 7. Simulador Interativo de Financiamento
  const sliderPrice = document.getElementById('calc-slider-price');
  const sliderDown = document.getElementById('calc-slider-down');
  const sliderYears = document.getElementById('calc-slider-years');

  const valDisplayPrice = document.getElementById('calc-val-price');
  const valDisplayDown = document.getElementById('calc-val-down');
  const valDisplayYears = document.getElementById('calc-val-years');

  const simMainInstallment = document.getElementById('sim-main-installment-val');
  const simLabelInstallment = document.getElementById('sim-label-installment');
  const simDetailLoan = document.getElementById('sim-detail-loan');
  const simDetailDown = document.getElementById('sim-detail-down');
  const simDetailLast = document.getElementById('sim-detail-last');
  const simDetailTotal = document.getElementById('sim-detail-total');
  const btnSendSimulation = document.getElementById('btn-send-simulation');

  function updateSimulatorUI() {
    const pValue = parseInt(sliderPrice.value);
    // Garantir que a entrada mínima seja 20%
    const minDown = Math.round(pValue * 0.2);
    sliderDown.min = minDown;
    sliderDown.max = Math.round(pValue * 0.8);
    if (parseInt(sliderDown.value) < minDown) {
      sliderDown.value = minDown;
    }

    const downVal = parseInt(sliderDown.value);
    const yearsVal = parseInt(sliderYears.value);

    valDisplayPrice.textContent = pValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
    valDisplayDown.textContent = downVal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
    valDisplayYears.textContent = `${yearsVal} anos (${yearsVal * 12} meses)`;

    financeCalc.propertyValue = pValue;
    financeCalc.downPayment = downVal;
    financeCalc.years = yearsVal;
    financeCalc.annualRate = selectedBank.rateAnnual;

    const res = financeCalc.calculate();

    if (simMainInstallment) {
      simMainInstallment.textContent = `R$ ${res.firstInstallment.toLocaleString('pt-BR')}`;
    }
    if (simLabelInstallment) {
      simLabelInstallment.textContent = financeCalc.system === 'SAC' ? '1ª Parcela Estimada (Decrescente)' : 'Parcela Fixa Mensal (Tabela Price)';
    }
    if (simDetailLoan) {
      simDetailLoan.textContent = `R$ ${res.loanAmount.toLocaleString('pt-BR')}`;
    }
    if (simDetailDown) {
      simDetailDown.textContent = `R$ ${res.downPayment.toLocaleString('pt-BR')}`;
    }
    if (simDetailLast) {
      simDetailLast.textContent = financeCalc.system === 'SAC' ? `R$ ${res.lastInstallment.toLocaleString('pt-BR')}` : 'Igual à 1ª parcela';
    }
    if (simDetailTotal) {
      simDetailTotal.textContent = `R$ ${res.totalPayment.toLocaleString('pt-BR')}`;
    }

    if (btnSendSimulation) {
      const waUrl = `https://wa.me/${ALINE_BARBOSA_INFO.phoneRaw}?text=${financeCalc.generateWhatsAppMessage(selectedBank.name)}`;
      btnSendSimulation.href = waUrl;
    }
  }

  if (sliderPrice) sliderPrice.addEventListener('input', updateSimulatorUI);
  if (sliderDown) sliderDown.addEventListener('input', updateSimulatorUI);
  if (sliderYears) sliderYears.addEventListener('input', updateSimulatorUI);

  // Alternador SAC vs PRICE
  const systemBtns = document.querySelectorAll('.system-btn');
  systemBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      systemBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      financeCalc.system = btn.getAttribute('data-system');
      updateSimulatorUI();
    });
  });

  // Renderizar e Selecionar Bancos
  const bankCardsContainer = document.getElementById('bank-cards-container');
  if (bankCardsContainer) {
    bankCardsContainer.innerHTML = BANK_PARTNERS.map((b, idx) => `
      <div class="bank-card ${idx === 0 ? 'active' : ''}" data-id="${b.id}">
        <div class="bank-logo-wrap">
          <img src="${b.logo}" alt="${b.name}">
        </div>
        <span class="bank-rate">${b.rateAnnual}% a.a.</span>
      </div>
    `).join('');

    document.querySelectorAll('.bank-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.bank-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        const bId = card.getAttribute('data-id');
        selectedBank = BANK_PARTNERS.find(b => b.id === bId) || BANK_PARTNERS[0];
        updateSimulatorUI();
      });
    });
  }

  // 8. Mobile Drawer Menu
  const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerOverlay = document.getElementById('drawer-overlay');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');

  function openDrawer() {
    if (mobileDrawer && drawerOverlay) {
      mobileDrawer.classList.add('open');
      drawerOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (mobileDrawer && drawerOverlay) {
      mobileDrawer.classList.remove('open');
      drawerOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (mobileToggleBtn) mobileToggleBtn.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  document.querySelectorAll('.drawer-links a').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // 9. Formulário do Proprietário ("Anuncie seu Imóvel")
  const ownerForm = document.getElementById('owner-lead-form');
  if (ownerForm) {
    ownerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('owner-name').value;
      const phone = document.getElementById('owner-phone').value;
      const type = document.getElementById('owner-type').value;
      const purpose = document.getElementById('owner-purpose').value;
      const location = document.getElementById('owner-location').value;

      const text = `Olá, Aline Barbosa! Meu nome é ${name} (telefone: ${phone}). Gostaria de anunciar um imóvel para ${purpose.toUpperCase()} (${type} em ${location}). Como podemos proceder com a avaliação e captação?`;
      const waUrl = `https://wa.me/${ALINE_BARBOSA_INFO.phoneRaw}?text=${encodeURIComponent(text)}`;
      window.open(waUrl, '_blank');
      ownerForm.reset();
      alert('Obrigado! Redirecionando para o WhatsApp da corretora Aline Barbosa para atendimento imediato.');
    });
  }

  // Inicializar
  populateFilters();
  renderProperties();
  if (sliderPrice) updateSimulatorUI();
});
