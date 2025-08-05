'use client';

import { ReactNode } from 'react';
import { TransactionListContext } from './TransactionListContext';
import { Transaction } from '@/lib/transaction/transaction.model';
import { sortTransactions } from '@/lib/transaction/transaction.utils';
import { useTransactionListActions } from '@/lib/transaction/provider/useTransactionListAction';

export function TransactionListProvider({
	children,
	initialTransactions,
	sourceAccountId,
	orderDesc,
}: {
	children: ReactNode;
	initialTransactions: Transaction[];
	sourceAccountId?: number;
	orderDesc: boolean;
}) {
	const { transactions, createTransaction, updateTransaction, deleteTransaction } =
		useTransactionListActions(initialTransactions, sourceAccountId);

	return (
		<TransactionListContext.Provider
			value={{
				transactions: transactions.toSorted((a, b) => sortTransactions(a, b, orderDesc)),
				createTransaction,
				updateTransaction,
				deleteTransaction,
			}}
		>
			{children}
		</TransactionListContext.Provider>
	);
}
