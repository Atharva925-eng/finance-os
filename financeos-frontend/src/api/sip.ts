import apiClient from './apiClient';
import * as mockApi from './mock/sip';
import { SipInput, SipResult } from '../types';

const useMock = import.meta.env.VITE_USE_MOCK === 'true';

export const calculateSip = async (input: SipInput): Promise<SipResult> => {
  if (useMock) {
    return mockApi.calculateSip(input);
  }
  const response = await apiClient.post<SipResult>('/sip/calculate', input);
  return response.data;
};
