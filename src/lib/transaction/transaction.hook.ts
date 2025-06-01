import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { Transaction } from '@/lib/transaction/transaction.model';

const fetcher = (url: string) =>
	fetch(url, { credentials: 'include' }).then((res) => {
		if (!res.ok) throw new Error('Failed to fetch');
		return res.json();
	});

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
	function addOrUpdateOptimistic(newTx: Transaction) {
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
	async function confirmSave(tempId: number, savedTx: Transaction) {
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
		addOrUpdateOptimistic,
		confirmSave,
	};
}
