'use client';

import { createOptimisticListProvider } from '@/lib/shared/optimistic-context';
import { Transaction } from '@/lib/transaction/transaction.model';
import { sortTransactions } from '@/lib/transaction/transaction.utils';

export const {
	OptimisticListProvider: TransactionListProvider,
	useOptimisticListContext: useTransactionList,
} = createOptimisticListProvider<Transaction>(sortTransactions);
