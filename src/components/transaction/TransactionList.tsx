'use client';
import TransactionItem from '@/components/transaction/TransactionItem';
import TransactionFormButton from '@/components/transaction/transaction-form/TransactionFormButton';
import { Transaction } from '@/lib/transaction/transaction.model';
import { sortTransactions } from '@/lib/transaction/transaction.utils';
import { useOptimisticList } from '@/lib/shared/optmistic.hook';

type TransactionProps = {
	transactions: Transaction[];
};

export default function TransactionList({ transactions: initialTransactions }: TransactionProps) {
	const {
		items: transactions,
		confirmSave,
		addOrUpdateOptimistic,
		deleteOptimistic,
	} = useOptimisticList(initialTransactions, sortTransactions);

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
