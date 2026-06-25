import { Budget } from '../../types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let mockBudgets: Budget[] = [
  { id: 'b1', category: 'Food', limit: 8000, spent: 5200, period: 'monthly' },
  { id: 'b2', category: 'Rent', limit: 15000, spent: 15000, period: 'monthly' },
  { id: 'b3', category: 'Transport', limit: 3000, spent: 1200, period: 'monthly' },
  { id: 'b4', category: 'Shopping', limit: 5000, spent: 4800, period: 'monthly' },
  { id: 'b5', category: 'Entertainment', limit: 4000, spent: 1800, period: 'monthly' },
];

export const getBudgets = async (): Promise<Budget[]> => {
  await delay(500);
  return [...mockBudgets];
};

export const updateBudget = async (id: string, budget: Partial<Budget>): Promise<Budget> => {
  await delay(300);
  const index = mockBudgets.findIndex((b) => b.id === id);
  if (index === -1) throw new Error('Budget not found');
  const updated = { ...mockBudgets[index], ...budget };
  mockBudgets[index] = updated;
  return updated;
};

export const createBudget = async (budget: Omit<Budget, 'id' | 'spent'>): Promise<Budget> => {
  await delay(300);
  const newBudget: Budget = {
    ...budget,
    id: Math.random().toString(36).substring(2, 9),
    spent: 0,
  };
  mockBudgets.push(newBudget);
  return newBudget;
};
