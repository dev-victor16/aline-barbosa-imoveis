/**
 * ALINE BARBOSA IMÓVEIS - MOTOR DO SIMULADOR FINANCEIRO 2026
 * Sistemas SAC e PRICE com taxas oficiais de mercado.
 */

class FinanceCalculator {
  constructor(propertyValue = 450000, downPayment = 90000, years = 30, annualRate = 9.99, system = 'SAC') {
    this.propertyValue = propertyValue;
    this.downPayment = downPayment;
    this.years = years;
    this.annualRate = annualRate;
    this.system = system; // 'SAC' ou 'PRICE'
  }

  getLoanAmount() {
    return Math.max(0, this.propertyValue - this.downPayment);
  }

  getTotalMonths() {
    return this.years * 12;
  }

  getMonthlyRate() {
    // Taxa mensal equivalente
    return Math.pow(1 + (this.annualRate / 100), 1 / 12) - 1;
  }

  calculate() {
    const loanAmount = this.getLoanAmount();
    const months = this.getTotalMonths();
    const i = this.getMonthlyRate();

    if (loanAmount <= 0 || months <= 0) {
      return {
        firstInstallment: 0,
        lastInstallment: 0,
        totalInterest: 0,
        totalPayment: 0,
        loanAmount: 0,
        downPayment: this.downPayment,
        system: this.system
      };
    }

    if (this.system === 'SAC') {
      const amortization = loanAmount / months;
      const firstInterest = loanAmount * i;
      const firstInstallment = amortization + firstInterest;

      // Último mês
      const lastInterest = amortization * i;
      const lastInstallment = amortization + lastInterest;

      // Juros totais no SAC = (firstInterest + lastInterest) * months / 2
      const totalInterest = ((firstInterest + lastInterest) * months) / 2;
      const totalPayment = loanAmount + totalInterest;

      return {
        firstInstallment: Math.round(firstInstallment),
        lastInstallment: Math.round(lastInstallment),
        totalInterest: Math.round(totalInterest),
        totalPayment: Math.round(totalPayment),
        loanAmount: Math.round(loanAmount),
        downPayment: Math.round(this.downPayment),
        system: 'SAC'
      };
    } else {
      // PRICE: Parcelas Fixas: PMT = PV * (i * (1+i)^n) / ((1+i)^n - 1)
      const pmt = loanAmount * (i * Math.pow(1 + i, months)) / (Math.pow(1 + i, months) - 1);
      const totalPayment = pmt * months;
      const totalInterest = totalPayment - loanAmount;

      return {
        firstInstallment: Math.round(pmt),
        lastInstallment: Math.round(pmt),
        totalInterest: Math.round(totalInterest),
        totalPayment: Math.round(totalPayment),
        loanAmount: Math.round(loanAmount),
        downPayment: Math.round(this.downPayment),
        system: 'PRICE'
      };
    }
  }

  generateWhatsAppMessage(bankName = 'Caixa Econômica Federal') {
    const res = this.calculate();
    const formatCurrency = val => val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    let msg = `Olá, Aline Barbosa! Gostaria de uma simulação e assessoria para aprovação de crédito imobiliário:\n\n`;
    msg += `🏦 *Banco Preferencial:* ${bankName}\n`;
    msg += `🏠 *Valor do Imóvel:* ${formatCurrency(this.propertyValue)}\n`;
    msg += `💵 *Entrada Estimada:* ${formatCurrency(this.downPayment)}\n`;
    msg += `📊 *Valor Financiado:* ${formatCurrency(res.loanAmount)}\n`;
    msg += `⏳ *Prazo:* ${this.years} anos (${this.getTotalMonths()} meses)\n`;
    msg += `📑 *Sistema de Amortização:* Tabela ${this.system}\n`;
    
    if (this.system === 'SAC') {
      msg += `📌 *1ª Parcela Estimada:* ${formatCurrency(res.firstInstallment)}\n`;
      msg += `📌 *Última Parcela:* ${formatCurrency(res.lastInstallment)}\n`;
    } else {
      msg += `📌 *Parcela Fixa Estimada:* ${formatCurrency(res.firstInstallment)}\n`;
    }

    msg += `\nPoderia me orientar sobre a documentação para aprovação da minha carta de crédito?`;
    return encodeURIComponent(msg);
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { FinanceCalculator };
}
