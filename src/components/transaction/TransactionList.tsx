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
