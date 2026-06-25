import axiosInstance from './axiosInstance';
import * as mockApi from './mock/budget';
import { Budget } from '../types';

const useMock = import.meta.env.VITE_USE_MOCK === 'true';

export const getBudgets = async (): Promise<Budget[]> => {
  if (useMock) {
    return mockApi.getBudgets();
  }
  const response = await axiosInstance.get<Budget[]>('/budgets');
  return response.data;
};

export const updateBudget = async (id: string, budget: Partial<Budget>): Promise<Budget> => {
  if (useMock) {
    return mockApi.updateBudget(id, budget);
  }
  const response = await axiosInstance.patch<Budget>(`/budgets/${id}`, budget);
  return response.data;
};

export const createBudget = async (budget: Omit<Budget, 'id' | 'spent'>): Promise<Budget> => {
  if (useMock) {
    return mockApi.createBudget(budget);
  }
  const response = await axiosInstance.post<Budget>('/budgets', budget);
  return response.data;
};
