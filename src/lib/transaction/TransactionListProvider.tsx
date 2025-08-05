'use client';

import { createContext, ReactNode, useEffect, useState } from 'react';
import {
	createTransactionAction,
	updateTransactionAction,
	deleteTransactionAction,
} from '@/lib/transaction/transaction.actions';
import { Transaction } from './transaction.model';
import { mutateTransactions } from '@/lib/transaction/transaction.utils-api';
import { useSearchParams } from 'next/navigation';
import { getParamsDate } from '@/lib/shared/date.utils';
import { sortTransactions } from '@/lib/transaction/transaction.utils';

type TransactionListContextType = {
	transactions: Transaction[];
	createTransaction: (toCreate: Transaction) => Promise<void>;
	updateTransaction: (toUpdate: Transaction) => Promise<void>;
	deleteTransaction: (toDelete: Transaction) => Promise<void>;
};

export const TransactionListContext = createContext<TransactionListContextType | undefined>(
	undefined,
);

export function TransactionListProvider({
	children,
	sourceAccountId,
	initialTransactions,
	orderDesc,
}: {
	children: ReactNode;
	initialTransactions: Transaction[];
	sourceAccountId?: number;
	orderDesc: boolean;
}) {
	const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

	useEffect(() => {
		setTransactions(initialTransactions);
	}, [initialTransactions]);

	const searchParams = useSearchParams();
	const [year, month] = getParamsDate(searchParams);

	const createTransaction = async (toCreate: Omit<Transaction, 'id'>) => {
		const tempId = Date.now();
		const previousTransactions = transactions;

		const optimisticTransaction: Transaction = { ...toCreate, id: tempId };

		if (toCreate.account.id === sourceAccountId) {
			setTransactions((prev) => [optimisticTransaction, ...prev]);
		}

		try {
			const created = await createTransactionAction(toCreate);

			if (toCreate.account.id === sourceAccountId) {
				setTransactions((prev) =>
					prev.map((current) => (current.id === tempId ? created : current)),
				);
			}
			mutateTransactions(created, year, month);
		} catch (err) {
			console.error('Create failed', err);
			setTransactions(previousTransactions); // rollback
		}
	};

	const updateTransaction = async (toUpdate: Transaction) => {
		const previousTransactions = transactions;

		setTransactions((prev) =>
			prev.map((current) => (current.id === toUpdate.id ? toUpdate : current)),
		);

		try {
			await updateTransactionAction(toUpdate);
			mutateTransactions(toUpdate, year, month, sourceAccountId);
		} catch (err) {
			console.error('Update failed', err);
			setTransactions(previousTransactions); // rollback
		}
	};

	const deleteTransaction = async (toDelete: Transaction) => {
		const previousTransactions = transactions;
		setTransactions((prev) => prev.filter((current) => current.id !== toDelete.id));

		try {
			await deleteTransactionAction(toDelete.id);
			mutateTransactions(toDelete, year, month);
		} catch (err) {
			console.error('Delete failed', err);
			setTransactions(previousTransactions); // rollback
		}
	};

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
