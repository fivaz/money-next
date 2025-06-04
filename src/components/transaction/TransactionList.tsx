'use client';
import TransactionItem from '@/components/transaction/TransactionItem';
import TransactionFormButton from '@/components/transaction/transaction-form/TransactionFormButton';
import { Transaction } from '@/lib/transaction/transaction.model';
import { sortTransactions, sumTransactions } from '@/lib/transaction/transaction.utils';
import { useOptimisticList } from '@/lib/shared/optmistic.hook';
import MoneyText from '@/components/MoneyText';
import { Text } from '@/components/base/text';
import Button from '@/components/Button';
import TotalIcon from '@/components/icons/TotalIcon';
import { ArrowDownNarrowWideIcon, ArrowDownWideNarrowIcon, PlusIcon } from 'lucide-react';

type TransactionProps = {
	transactions: Transaction[];
};

export default function TransactionList({ transactions: initialTransactions }: TransactionProps) {
	const {
		items: transactions,
		confirmSave,
		addOrUpdate,
		deleteOptimistic,
	} = useOptimisticList(initialTransactions, sortTransactions);

	const balance = sumTransactions(transactions);

	const isAscending = true;

	return (
		<div className="flex flex-col rounded-lg border border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-800">
			<div className="sticky top-0 z-10 flex items-center justify-end gap-4 rounded-t-lg border-b border-l border-gray-300 bg-gray-100 p-3 dark:border-gray-600 dark:bg-gray-800">
				<Text className="flex items-center gap-2">
					<TotalIcon className="size-4" />
					<MoneyText>{balance}</MoneyText>
				</Text>
				<Button size="px-2 py-1.5">
					{isAscending ? (
						<ArrowDownNarrowWideIcon className="size-5" />
					) : (
						<ArrowDownWideNarrowIcon className="size-5" />
					)}
				</Button>
				<TransactionFormButton
					onAddOrUpdateAction={addOrUpdate}
					onConfirmSaveAction={confirmSave}
					size="p-1.5 px-2.5"
					className="flex items-center"
				>
					<PlusIcon className="size-5" />
					<span className="hidden sm:block">Transaction</span>
				</TransactionFormButton>
			</div>
			<ul role="list" className="divide-y divide-gray-300 dark:divide-gray-600">
				{transactions.map((transaction) => (
					<TransactionItem
						key={transaction.id}
						transaction={transaction}
						onAddOrUpdateAction={addOrUpdate}
						onConfirmSaveAction={confirmSave}
						onDeleteAction={deleteOptimistic}
					/>
				))}
			</ul>
		</div>
	);
}
