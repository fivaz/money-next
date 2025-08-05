'use client';

import { useContext } from 'react';
import { TransactionListContext } from './TransactionListContext';

export function useTransactionList() {
	const context = useContext(TransactionListContext);
	if (!context) {
		throw new Error('useTransactionList must be used within a TransactionListProvider');
	}
	return context;
}
