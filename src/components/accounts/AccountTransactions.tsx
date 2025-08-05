'use client';
import TransactionItem from '@/components/transaction/TransactionItem2';
import { useTransactionList } from '@/lib/transaction2/useTransactionList';
import { useEffect } from 'react';

export default function AccountTransactions() {
	const { transactions } = useTransactionList();

	return (
		<ul role="list" className="divide-y divide-gray-300 dark:divide-gray-600">
			{transactions.map((transaction) => (
				<TransactionItem key={transaction.id} transaction={transaction} />
			))}
		</ul>
	);
}
