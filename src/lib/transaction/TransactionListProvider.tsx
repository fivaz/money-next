'use client';

import { createOptimisticListProvider } from '@/lib/shared/optimistic-context';
import { Transaction } from '@/lib/transaction/transaction.model';

export const {
	OptimisticListProvider: TransactionListProvider,
	useOptimisticListContext: useTransactionList,
} = createOptimisticListProvider<Transaction>();
