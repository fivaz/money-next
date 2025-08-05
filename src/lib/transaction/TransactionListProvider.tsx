'use client';

import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
	useTransition,
} from 'react';
import {
	createTransactionAction,
	updateTransactionAction,
	deleteTransactionAction,
} from '@/lib/transaction/transaction.actions';
import { Transaction } from './transaction.model';

type TransactionListContextType = {
	transactions: Transaction[];
	createTransaction: (data: Transaction) => Promise<void>;
	updateTransaction: (data: Transaction) => Promise<void>;
	deleteTransaction: (id: number) => Promise<void>;
};

export const TransactionListContext = createContext<
	TransactionListContextType | undefined
>(undefined);

export function TransactionListProvider({
	children,
	initialTransactions,
}: {
	children: ReactNode;
	initialTransactions: Transaction[];
}) {
	const [transactions, setTransactions] =
		useState<Transaction[]>(initialTransactions);

	useEffect(() => {
		setTransactions(initialTransactions);
	}, [initialTransactions]);

	const createTransaction = async (data: Omit<Transaction, 'id'>) => {
		const tempId = Date.now();
		const optimisticTransaction: Transaction = { ...data, id: tempId };

		const previousTransactions = transactions;
		setTransactions((prev) => [optimisticTransaction, ...prev]);

		try {
			const created = await createTransactionAction(data);
			setTransactions((prev) =>
				prev.map((current) => (current.id === tempId ? created : current)),
			);
		} catch (err) {
			console.error('Create failed', err);
			setTransactions(previousTransactions); // rollback
		}
	};

	const updateTransaction = async (update: Transaction) => {
		const previousTransactions = transactions;

		setTransactions((prev) =>
			prev.map((current) => (current.id === update.id ? update : current)),
		);

		try {
			await updateTransactionAction(update);
		} catch (err) {
			console.error('Update failed', err);
			setTransactions(previousTransactions); // rollback
		}
	};

	const deleteTransaction = async (id: number) => {
		const previousTransactions = transactions;
		setTransactions((prev) => prev.filter((current) => current.id !== id));

		try {
			await deleteTransactionAction(id);
		} catch (err) {
			console.error('Delete failed', err);
			setTransactions(previousTransactions); // rollback
		}
	};

	return (
		<TransactionListContext.Provider
			value={{
				transactions,
				createTransaction,
				updateTransaction,
				deleteTransaction,
			}}
		>
			{children}
		</TransactionListContext.Provider>
	);
}
