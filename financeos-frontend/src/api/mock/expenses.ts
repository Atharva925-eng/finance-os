import { Transaction } from '../../types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let mockExpenses: Transaction[] = [
  { id: '1', amount: 450, category: 'Food', date: '2026-06-25', description: 'Lunch with team', type: 'expense' },
  { id: '2', amount: 15000, category: 'Rent', date: '2026-06-01', description: 'Apartment rent', type: 'expense' },
  { id: '3', amount: 800, category: 'Transport', date: '2026-06-24', description: 'Cab to client location', type: 'expense' },
  { id: '4', amount: 75000, category: 'Salary', date: '2026-06-25', description: 'Monthly payroll', type: 'income' },
  { id: '5', amount: 2300, category: 'Shopping', date: '2026-06-22', description: 'Bought a shirt', type: 'expense' },
  { id: '6', amount: 4500, category: 'Entertainment', date: '2026-06-18', description: 'Concert ticket', type: 'expense' },
];

export const getExpenses = async (): Promise<Transaction[]> => {
  await delay(600);
  return [...mockExpenses];
};

export const createExpense = async (expense: Omit<Transaction, 'id'>): Promise<Transaction> => {
  await delay(400);
  const newExpense = {
    ...expense,
    id: Math.random().toString(36).substring(2, 9),
  };
  mockExpenses = [newExpense, ...mockExpenses];
  return newExpense;
};

export const deleteExpense = async (id: string): Promise<void> => {
  await delay(300);
  mockExpenses = mockExpenses.filter((e) => e.id !== id);
};
