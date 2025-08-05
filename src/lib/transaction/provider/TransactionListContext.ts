'use client';

import { createContext } from 'react';
import { Transaction } from '@/lib/transaction/transaction.model';

export type TransactionListContextType = {
	transactions: Transaction[];
	createTransaction: (toCreate: Transaction) => Promise<void>;
	updateTransaction: (toUpdate: Transaction) => Promise<void>;
	deleteTransaction: (toDelete: Transaction) => Promise<void>;
};

export const TransactionListContext = createContext<TransactionListContextType | undefined>(
	undefined,
);
