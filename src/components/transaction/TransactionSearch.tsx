'use client';

import TransactionItem from '@/components/transaction/TransactionItem';
import { useTransactionList } from '@/lib/transaction/useTransactionList';

type TransactionProps = {};

export default function TransactionSearch({}: TransactionProps) {
	const { transactions } = useTransactionList();

	return (
		<div className="flex flex-col rounded-lg border border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-800">
			<ul role="list" className="divide-y divide-gray-300 dark:divide-gray-600">
				{transactions.map((transaction) => (
					<TransactionItem
						accountId={transaction.account.id}
						key={transaction.id}
						transaction={transaction}
					/>
				))}
			</ul>
		</div>
	);
}
