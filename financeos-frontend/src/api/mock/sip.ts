import { SipInput, SipResult } from '../../types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const calculateSip = async (input: SipInput): Promise<SipResult> => {
  await delay(500);
  const { monthlyInvestment, expectedReturnRate, timePeriodYears } = input;
  
  const P = monthlyInvestment;
  const i = expectedReturnRate / 12 / 100;
  const n = timePeriodYears * 12;
  
  // SIP Future Value formula: FV = P * [((1 + i)^n - 1) / i] * (1 + i)
  const totalValue = P * (((Math.pow(1 + i, n) - 1) / i) * (1 + i));
  const totalInvestment = P * n;
  const estimatedReturns = Math.max(0, totalValue - totalInvestment);
  
  const yearlyBreakdown = [];
  for (let year = 1; year <= timePeriodYears; year++) {
    const months = year * 12;
    const value = P * (((Math.pow(1 + i, months) - 1) / i) * (1 + i));
    const investment = P * months;
    yearlyBreakdown.push({
      year,
      investment: Math.round(investment),
      returns: Math.round(Math.max(0, value - investment)),
      totalValue: Math.round(value),
    });
  }
  
  return {
    totalInvestment: Math.round(totalInvestment),
    estimatedReturns: Math.round(estimatedReturns),
    totalValue: Math.round(totalValue),
    yearlyBreakdown,
  };
};
