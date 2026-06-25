import axiosInstance from './axiosInstance';
import * as mockApi from './mock/tax';
import { TaxInput, TaxCalculationResult } from '../types';

const useMock = import.meta.env.VITE_USE_MOCK === 'true';

export const calculateTax = async (input: TaxInput): Promise<TaxCalculationResult> => {
  if (useMock) {
    return mockApi.calculateTax(input);
  }
  const response = await axiosInstance.post<TaxCalculationResult>('/tax/calculate', input);
  return response.data;
};
