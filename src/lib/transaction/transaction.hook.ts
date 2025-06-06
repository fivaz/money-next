import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { Transaction } from '@/lib/transaction/transaction.model';
import { fetcher } from '@/lib/shared/api-client.utils';

export function useTransactionsWithOptimistic(url: string | null) {
	const { data: swrTransactions, error, mutate } = useSWR<Transaction[]>(url, fetcher);

	// Local state to show optimistic updates immediately
	const [optimisticTransactions, setOptimisticTransactions] = useState<Transaction[]>([]);

	// Sync SWR data into optimistic state on fresh fetch
	useEffect(() => {
		if (swrTransactions) {
			setOptimisticTransactions(swrTransactions);
		}
	}, [swrTransactions]);

	// Add or update a transaction optimistically
	function addOrUpdateTransaction(newTx: Transaction) {
		setOptimisticTransactions((prev) => {
			const filtered = prev.filter((tx) => tx.id !== newTx.id);
			return [newTx, ...filtered];
		});

		// Update SWR cache immediately without revalidation
		mutate((current) => {
			const filtered = current?.filter((tx) => tx.id !== newTx.id) ?? [];
			return [newTx, ...filtered];
		}, false);
	}

	// Confirm the saved transaction from server, replace temp with real ID, then revalidate SWR
	async function confirmSaveTransaction(tempId: number, savedTx: Transaction) {
		setOptimisticTransactions((prev) => {
			const filtered = prev.filter((tx) => tx.id !== tempId);
			return [savedTx, ...filtered];
		});

		await mutate(); // revalidate SWR cache to sync with server
	}

	return {
		transactions: optimisticTransactions,
		error,
		isLoading: !error && !optimisticTransactions.length,
		addOrUpdateTransaction,
		confirmSaveTransaction,
	};
}
