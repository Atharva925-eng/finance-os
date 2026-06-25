import { Receipt } from '../../types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let mockReceipts: Receipt[] = [
  { id: 'r1', merchantName: 'Amazon', amount: 3450, date: '2026-06-25', category: 'Shopping', status: 'processed' },
  { id: 'r2', merchantName: 'Uber', amount: 890, date: '2026-06-24', category: 'Transport', status: 'processed' },
  { id: 'r3', merchantName: 'Starbucks', amount: 450, date: '2026-06-25', category: 'Food', status: 'pending' },
  { id: 'r4', merchantName: 'WeWork', amount: 12000, date: '2026-06-01', category: 'Utilities', status: 'processed' },
];

export const getReceipts = async (): Promise<Receipt[]> => {
  await delay(600);
  return [...mockReceipts];
};

export const uploadReceipt = async (file: File): Promise<Receipt> => {
  await delay(2000); // OCR scan delay
  const newReceipt: Receipt = {
    id: Math.random().toString(36).substring(2, 9),
    merchantName: file.name.split('.')[0] || 'Unknown Merchant',
    amount: Math.floor(Math.random() * 2000) + 100,
    date: new Date().toISOString().split('T')[0],
    category: 'Miscellaneous',
    status: 'processed',
  };
  mockReceipts = [newReceipt, ...mockReceipts];
  return newReceipt;
};

export const deleteReceipt = async (id: string): Promise<void> => {
  await delay(300);
  mockReceipts = mockReceipts.filter((r) => r.id !== id);
};
