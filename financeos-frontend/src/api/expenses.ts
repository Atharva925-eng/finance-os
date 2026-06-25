import axiosInstance from './axiosInstance';
import * as mockApi from './mock/expenses';
import { Transaction } from '../types';

const useMock = import.meta.env.VITE_USE_MOCK === 'true';

export const getExpenses = async (): Promise<Transaction[]> => {
  if (useMock) {
    return mockApi.getExpenses();
  }
  const response = await axiosInstance.get<Transaction[]>('/expenses');
  return response.data;
};

export const addExpense = async (expense: Omit<Transaction, 'id'>): Promise<Transaction> => {
  if (useMock) {
    return mockApi.createExpense(expense);
  }
  const response = await axiosInstance.post<Transaction>('/expenses', expense);
  return response.data;
};

export const deleteExpense = async (id: string): Promise<void> => {
  if (useMock) {
    return mockApi.deleteExpense(id);
  }
  await axiosInstance.delete(`/expenses/${id}`);
};
