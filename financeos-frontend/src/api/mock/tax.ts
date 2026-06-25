import { TaxInput, TaxCalculationResult } from '../../types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const calculateTax = async (input: TaxInput): Promise<TaxCalculationResult> => {
  await delay(600);
  const { income, deductions, taxRegime } = input;
  
  if (taxRegime === 'old') {
    const netIncome = Math.max(0, income - Math.min(deductions, 150000) - 50000); // 1.5L 80C + 50k standard deduction
    let tax = 0;
    const slabs = [];
    
    // Slab 1: Up to 2.5L
    slabs.push({ rate: 0, income: Math.min(netIncome, 250000), tax: 0 });
    
    // Slab 2: 2.5L to 5L
    if (netIncome > 250000) {
      const taxable = Math.min(netIncome - 250000, 250000);
      const t = taxable * 0.05;
      tax += t;
      slabs.push({ rate: 5, income: taxable, tax: t });
    }
    
    // Slab 3: 5L to 10L
    if (netIncome > 500000) {
      const taxable = Math.min(netIncome - 500000, 500000);
      const t = taxable * 0.20;
      tax += t;
      slabs.push({ rate: 20, income: taxable, tax: t });
    }
    
    // Slab 4: Above 10L
    if (netIncome > 1000000) {
      const taxable = netIncome - 1000000;
      const t = taxable * 0.30;
      tax += t;
      slabs.push({ rate: 30, income: taxable, tax: t });
    }
    
    // Rebate u/s 87A if taxable income <= 5L
    if (netIncome <= 500000) {
      tax = 0;
    }
    
    const cess = tax * 0.04;
    return {
      taxableIncome: netIncome,
      grossTax: tax,
      cess,
      netTax: tax + cess,
      slabs
    };
  } else {
    // New regime
    const netIncome = Math.max(0, income - 75000); // 75k standard deduction
    let tax = 0;
    const slabs = [];
    
    slabs.push({ rate: 0, income: Math.min(netIncome, 300000), tax: 0 });
    
    if (netIncome > 300000) {
      const taxable = Math.min(netIncome - 300000, 300000);
      const t = taxable * 0.05;
      tax += t;
      slabs.push({ rate: 5, income: taxable, tax: t });
    }
    if (netIncome > 600000) {
      const taxable = Math.min(netIncome - 600000, 300000);
      const t = taxable * 0.10;
      tax += t;
      slabs.push({ rate: 10, income: taxable, tax: t });
    }
    if (netIncome > 900000) {
      const taxable = Math.min(netIncome - 900000, 300000);
      const t = taxable * 0.15;
      tax += t;
      slabs.push({ rate: 15, income: taxable, tax: t });
    }
    if (netIncome > 1200000) {
      const taxable = Math.min(netIncome - 1200000, 300000);
      const t = taxable * 0.20;
      tax += t;
      slabs.push({ rate: 20, income: taxable, tax: t });
    }
    if (netIncome > 1500000) {
      const taxable = netIncome - 1500000;
      const t = taxable * 0.30;
      tax += t;
      slabs.push({ rate: 30, income: taxable, tax: t });
    }
    
    // Rebate u/s 87A for New Regime (taxable income up to 7L, tax is zero)
    if (netIncome <= 700000) {
      tax = 0;
    }
    
    const cess = tax * 0.04;
    return {
      taxableIncome: netIncome,
      grossTax: tax,
      cess,
      netTax: tax + cess,
      slabs
    };
  }
};
