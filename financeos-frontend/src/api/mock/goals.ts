import { Goal } from '../../types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let mockGoals: Goal[] = [
  { id: 'g1', name: 'Emergency Fund', targetAmount: 200000, currentAmount: 120000, targetDate: '2026-12-31', category: 'Savings' },
  { id: 'g2', name: 'New Laptop', targetAmount: 120000, currentAmount: 85000, targetDate: '2026-09-30', category: 'Gadgets' },
  { id: 'g3', name: 'Car Downpayment', targetAmount: 500000, currentAmount: 150000, targetDate: '2028-06-30', category: 'Automobile' },
  { id: 'g4', name: 'Euro Trip', targetAmount: 300000, currentAmount: 50000, targetDate: '2027-05-15', category: 'Travel' },
];

export const getGoals = async (): Promise<Goal[]> => {
  await delay(500);
  return [...mockGoals];
};

export const createGoal = async (goal: Omit<Goal, 'id' | 'currentAmount'>): Promise<Goal> => {
  await delay(300);
  const newGoal: Goal = {
    ...goal,
    id: Math.random().toString(36).substring(2, 9),
    currentAmount: 0,
  };
  mockGoals.push(newGoal);
  return newGoal;
};

export const updateGoal = async (id: string, goal: Partial<Goal>): Promise<Goal> => {
  await delay(300);
  const index = mockGoals.findIndex((g) => g.id === id);
  if (index === -1) throw new Error('Goal not found');
  const updated = { ...mockGoals[index], ...goal };
  mockGoals[index] = updated;
  return updated;
};

export const deleteGoal = async (id: string): Promise<void> => {
  await delay(300);
  mockGoals = mockGoals.filter((g) => g.id !== id);
};
