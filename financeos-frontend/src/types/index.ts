export interface Transaction {
  id: string;
  amount: number;
  category: string;
  date: string;
  description: string;
  type: 'income' | 'expense';
}

export interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
  period: string;
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  category: string;
}

export interface Receipt {
  id: string;
  merchantName: string;
  amount: number;
  date: string;
  category: string;
  imageUrl?: string;
  status: 'pending' | 'processed' | 'failed';
}

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  source: string;
  publishedAt: string;
  imageUrl?: string;
}

export interface TaxInput {
  financialYear: string;
  income: number;
  deductions: number;
  taxRegime: 'old' | 'new';
}

export interface TaxCalculationResult {
  taxableIncome: number;
  grossTax: number;
  cess: number;
  netTax: number;
  slabs: { rate: number; income: number; tax: number }[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  currency: string;
  avatarUrl?: string;
}

export interface SipInput {
  monthlyInvestment: number;
  expectedReturnRate: number; // percentage, e.g. 12
  timePeriodYears: number;
}

export interface SipResult {
  totalInvestment: number;
  estimatedReturns: number;
  totalValue: number;
  yearlyBreakdown: { year: number; investment: number; returns: number; totalValue: number }[];
}
