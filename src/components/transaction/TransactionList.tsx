'use client';
import TransactionItem from '@/components/transaction/TransactionItem';
import TransactionFormButton from '@/components/transaction/transaction-form/TransactionFormButton';
import TransactionForm from '@/components/transaction/transaction-form/TransactionForm';
import { Transaction } from '@/lib/transaction/transaction.model';
import { useOptimistic, useState } from 'react';

type TransactionProps = {
	initialTransactions: Transaction[];
};
export default function TransactionList({ initialTransactions }: TransactionProps) {
	const [transactions, setTransactions] = useState(initialTransactions);

	const [optimisticTransactions, addOptimistic] = useOptimistic(
		transactions,
		(current, newTransaction: Transaction) => [newTransaction, ...current],
	);

	const handleAddOptimistic = (transaction: Transaction) => {
		addOptimistic(transaction);
	};

	const handleConfirmSave = (tempId: number, realTransaction: Transaction) => {
		setTransactions((prev) => [realTransaction, ...prev.filter((t) => t.id !== tempId)]);
	};

	return (
		<div>
			<ul>
				{optimisticTransactions.map((transaction) => (
					<TransactionItem key={transaction.id} transaction={transaction} />
				))}
			</ul>
			<TransactionFormButton
				onAddOptimisticAction={handleAddOptimistic}
				onConfirmSaveAction={handleConfirmSave}
			/>
		</div>
	);
}
