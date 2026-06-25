import apiClient from './apiClient';
import * as mockApi from './mock/goals';
import { Goal } from '../types';

const useMock = import.meta.env.VITE_USE_MOCK === 'true';

export const getGoals = async (): Promise<Goal[]> => {
  if (useMock) {
    return mockApi.getGoals();
  }
  const response = await apiClient.get<Goal[]>('/goals');
  return response.data;
};

export const createGoal = async (goal: Omit<Goal, 'id' | 'currentAmount'>): Promise<Goal> => {
  if (useMock) {
    return mockApi.createGoal(goal);
  }
  const response = await apiClient.post<Goal>('/goals', goal);
  return response.data;
};

export const updateGoal = async (id: string, goal: Partial<Goal>): Promise<Goal> => {
  if (useMock) {
    return mockApi.updateGoal(id, goal);
  }
  const response = await apiClient.patch<Goal>(`/goals/${id}`, goal);
  return response.data;
};

export const deleteGoal = async (id: string): Promise<void> => {
  if (useMock) {
    return mockApi.deleteGoal(id);
  }
  await apiClient.delete(`/goals/${id}`);
};
