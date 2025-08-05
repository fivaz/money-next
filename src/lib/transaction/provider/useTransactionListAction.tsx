'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Transaction } from '@/lib/transaction/transaction.model';
import {
	createTransactionAction,
	updateTransactionAction,
	deleteTransactionAction,
} from '@/lib/transaction/transaction.actions';
import { mutateTransactions } from '@/lib/transaction/transaction.utils-api';
import { getParamsDate } from '@/lib/shared/date.utils';

export function useTransactionListActions(
	initialTransactions: Transaction[],
	sourceAccountId?: number,
) {
	const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
	const searchParams = useSearchParams();
	const [year, month] = getParamsDate(searchParams);

	useEffect(() => {
		setTransactions(initialTransactions);
	}, [initialTransactions]);

	const createTransaction = async (toCreate: Omit<Transaction, 'id'>) => {
		const tempId = Date.now();
		const optimisticTransaction: Transaction = { ...toCreate, id: tempId };
		const previousTransactions = transactions;

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
			setTransactions(previousTransactions);
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
			setTransactions(previousTransactions);
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
