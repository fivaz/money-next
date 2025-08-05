'use client';

import { useContext } from 'react';
import { TransactionListContext } from './TransactionListProvider';

export function useTransactionList() {
	const context = useContext(TransactionListContext);
	if (!context) {
		throw new Error('useTransactionList must be used within an TransactionListProvider');
	}
	return context;
}
