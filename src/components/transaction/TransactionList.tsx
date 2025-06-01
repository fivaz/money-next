'use client';
import TransactionItem from '@/components/transaction/TransactionItem';
import TransactionFormButton from '@/components/transaction/transaction-form/TransactionFormButton';
import { Transaction } from '@/lib/transaction/transaction.model';
import { useEffect, useOptimistic, useState, useRef } from 'react';
import { useAtomValue } from 'jotai';
import { currentDateAtom } from '@/components/date-switcher/DateSwitcherClient';
import useSWR from 'swr';
import { API } from '@/lib/const';
import { sortBudgets } from '@/lib/budget/budget.utils';
import { sortTransactions } from '@/lib/transaction/transaction.utils';
import { useOptimisticList } from '@/lib/shared/optmistic.hook';

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

	const {
		items: transactions,
		confirmSave,
		addOrUpdateOptimistic,
		deleteOptimistic,
		setItems: setTransactions,
	} = useOptimisticList(initialTransactions, sortTransactions);

	// SWR key is always valid, but we will conditionally enable fetching after first render
	const swrKey = `/api/${API.TRANSACTIONS}?year=${date.getFullYear()}&month=${date.getMonth() + 1}`;

	// Pass a boolean `shouldFetch` to control fetching, initially false
	const { data: fetchedTransactions, error, mutate } = useSWR<Transaction[]>(swrKey, fetcher);

	useEffect(() => {
		if (fetchedTransactions) {
			setTransactions(() => fetchedTransactions);
		}
	}, [fetchedTransactions]);

	return (
		<div className="flex flex-col gap-4">
			<div className="flex justify-end">
				<TransactionFormButton
					onAddOptimisticAction={addOrUpdateOptimistic}
					onConfirmSaveAction={confirmSave}
				/>
			</div>
			<ul role="list" className="divide-y divide-gray-300 dark:divide-gray-600">
				{transactions.map((transaction) => (
					<TransactionItem
						key={transaction.id}
						transaction={transaction}
						onAddOptimisticAction={addOrUpdateOptimistic}
						onConfirmSaveAction={confirmSave}
						onDeleteAction={deleteOptimistic}
					/>
				))}
			</ul>
		</div>
	);
}
