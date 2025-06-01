'use client';
import TransactionItem from '@/components/transaction/TransactionItem';
import TransactionFormButton from '@/components/transaction/transaction-form/TransactionFormButton';
import { Transaction } from '@/lib/transaction/transaction.model';
import { useEffect, useOptimistic, useState, useRef } from 'react';
import { useAtomValue } from 'jotai';
import { currentDateAtom } from '@/components/date-switcher/DateSwitcherClient';
import useSWR from 'swr';

type TransactionProps = {
	initialTransactions: Transaction[];
};

const fetcher = (url: string) =>
	fetch(url, { credentials: 'include' }).then((res) => {
		if (!res.ok) throw new Error('Failed to fetch');
		return res.json();
	});

export default function TransactionList({ initialTransactions }: TransactionProps) {
	const date = useAtomValue(currentDateAtom);
	const isFirstRender = useRef(true);

	// SWR key is always valid, but we will conditionally enable fetching after first render
	const swrKey = `/api/transactions?year=${date.getFullYear()}&month=${date.getMonth() + 1}`;

	// Pass a boolean `shouldFetch` to control fetching, initially false
	const {
		data: fetchedTransactions,
		error,
		mutate,
	} = useSWR<Transaction[]>(isFirstRender.current ? null : swrKey, fetcher);

	// Base transactions: on first render use initialTransactions, else use fetched data or fallback
	const baseTransactions =
		isFirstRender.current && initialTransactions.length > 0
			? initialTransactions
			: (fetchedTransactions ?? []);

	const sortTransactionsByDate = (transactions: Transaction[]): Transaction[] => {
		return transactions.toSorted((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
	};

	const [transactions, setTransactions] = useState(baseTransactions);

	// After first render, set the flag to false to enable fetching next changes
	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
		}
	}, []);

	// Update transactions when fetchedTransactions change
	useEffect(() => {
		if (fetchedTransactions) {
			setTransactions(sortTransactionsByDate(fetchedTransactions));
		}
	}, [fetchedTransactions]);

	const [optimisticTransactions, addOptimisticTransaction] = useOptimistic(
		transactions,
		(currentList: Transaction[], newTx: Transaction) =>
			sortTransactionsByDate([...currentList.filter((t) => t.id !== newTx.id), newTx]),
	);

	const handleConfirmSave = (tempId: number, savedTransaction: Transaction) => {
		setTransactions((prev) =>
			sortTransactionsByDate([savedTransaction, ...prev.filter((t) => t.id !== tempId)]),
		);
	};

	const handleAddOptimistic = (transaction: Transaction) => addOptimisticTransaction(transaction);

	const handleDelete = (transaction: Transaction) => {
		setTransactions((prev) => prev.filter((t) => t.id !== transaction.id));
	};

	return (
		<div className="flex flex-col gap-4">
			<div className="flex justify-end">
				<TransactionFormButton
					onAddOptimisticAction={handleAddOptimistic}
					onConfirmSaveAction={handleConfirmSave}
				/>
			</div>
			<ul role="list" className="divide-y divide-gray-300 dark:divide-gray-600">
				{optimisticTransactions.map((transaction) => (
					<TransactionItem
						key={transaction.id}
						transaction={transaction}
						onAddOptimisticAction={handleAddOptimistic}
						onConfirmSaveAction={handleConfirmSave}
						onDeleteAction={handleDelete}
					/>
				))}
			</ul>
		</div>
	);
}
