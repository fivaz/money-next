'use client';
import TransactionItem from '@/components/transaction/TransactionItem';
import TransactionFormButton from '@/components/transaction/transaction-form/TransactionFormButton';
import { Transaction } from '@/lib/transaction/transaction.model';
import { useOptimistic, useState } from 'react';

type TransactionProps = {
	initialTransactions: Transaction[];
};
export default function TransactionList({ initialTransactions }: TransactionProps) {
	const sortTransactionsByDate = (transactions: Transaction[]): Transaction[] => {
		return transactions.toSorted((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
	};

	const [transactions, setTransactions] = useState(initialTransactions);

	const [optimisticTransactions, addOptimisticTransaction] = useOptimistic(
		transactions,
		(currentList: Transaction[], newTx: Transaction) =>
			sortTransactionsByDate([...currentList, newTx]),
	);

	const handleConfirmSave = (tempId: number, savedTransaction: Transaction) => {
		setTransactions((prev) =>
			sortTransactionsByDate([savedTransaction, ...prev.filter((t) => t.id !== tempId)]),
		);
	};

	const handleAddOptimistic = (transaction: Transaction) => addOptimisticTransaction(transaction);

	return (
		<div>
			<ul>
				{optimisticTransactions.map((transaction) => (
					<TransactionItem
						key={transaction.id}
						transaction={transaction}
						onAddOptimisticAction={handleAddOptimistic}
						onConfirmSaveAction={handleConfirmSave}
					/>
				))}
			</ul>
			<TransactionFormButton
				onAddOptimisticAction={handleAddOptimistic}
				onConfirmSaveAction={handleConfirmSave}
			/>
		</div>
	);
}
