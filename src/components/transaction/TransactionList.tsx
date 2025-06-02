'use client';
import TransactionItem from '@/components/transaction/TransactionItem';
import TransactionFormButton from '@/components/transaction/transaction-form/TransactionFormButton';
import { Transaction } from '@/lib/transaction/transaction.model';
import { sortTransactions, sumTransactions } from '@/lib/transaction/transaction.utils';
import { useOptimisticList } from '@/lib/shared/optmistic.hook';
import MoneyText from '@/components/MoneyText';
import { Text } from '@/components/base/text';

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

	const balance = sumTransactions(transactions);

	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center justify-end gap-4">
				<Text>
					<MoneyText>{balance}</MoneyText>
				</Text>
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
