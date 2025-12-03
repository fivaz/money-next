'use client';

import { useState, useEffect } from 'react';
import { Transaction } from '@/lib/transaction/transaction.model';
import {
	createTransactionAction,
	updateTransactionAction,
	deleteTransactionAction,
} from '@/lib/transaction/transaction.actions';
import { mutateTransactions } from '@/lib/transaction/transaction.utils-api';
import { useYearMonth } from '@/lib/shared/date.utils.client';

export function useTransactionListActions(
	initialTransactions: Transaction[],
	source?: { type: 'account' | 'budget'; id: number },
) {
	const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
	const [year, month, asOf] = useYearMonth();

	useEffect(() => {
		setTransactions(initialTransactions);
	}, [initialTransactions]);

	const isFromSource = (transaction: Omit<Transaction, 'id'>) => {
		if (!source) return false;
		if (source.type === 'account') return transaction.account?.id === source.id;
		if (source.type === 'budget') return transaction.budget?.id === source.id;
		return false;
	};

	const createTransaction = async (toCreate: Omit<Transaction, 'id'>) => {
		const tempId = Date.now();
		const optimisticTransaction: Transaction = { ...toCreate, id: tempId };
		const previousTransactions = transactions;

		// Only optimistically add if it belongs to the current source
		if (isFromSource(toCreate)) {
			setTransactions((prev) => [optimisticTransaction, ...prev]);
		}

		try {
			const created = await createTransactionAction(toCreate);

			// Only update optimistic entry if it was added
			if (isFromSource(toCreate)) {
				setTransactions((prev) =>
					prev.map((current) => (current.id === tempId ? created : current)),
				);
			}

			// Let global SWR mutate trigger the rest
			mutateTransactions(toCreate, year, month, asOf, source);
		} catch (err) {
			console.error('Create failed', err);
			setTransactions(previousTransactions);
		}
	};

	const updateTransaction = async (toUpdate: Transaction) => {
		const previousTransactions = transactions; // Save the full list before optimistic update

		setTransactions((prev) =>
			prev.map((current) => (current.id === toUpdate.id ? toUpdate : current)),
		);

		try {
			await updateTransactionAction(toUpdate);

			mutateTransactions(toUpdate, year, month, asOf, source);
		} catch (err) {
			console.error('Update failed', err);
			setTransactions(previousTransactions); // ⬅️ Restore old state on failure
		}
	};

	const deleteTransaction = async (toDelete: Transaction) => {
		const previousTransactions = transactions;
		setTransactions((prev) => prev.filter((current) => current.id !== toDelete.id));

		try {
			await deleteTransactionAction(toDelete.id);
			mutateTransactions(toDelete, year, month, asOf, source);
		} catch (err) {
			console.error('Delete failed', err);
			setTransactions(previousTransactions);
		}
	};

	return {
		transactions,
		createTransaction,
		updateTransaction,
		deleteTransaction,
		setTransactions,
	};
}
