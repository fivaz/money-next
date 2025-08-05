'use client';
import TransactionItem from '@/components/transaction/TransactionItem';
import { useTransactionList } from '@/lib/transaction/useTransactionList';
import { useEffect } from 'react';

type AccountTransactionsProps = {
	accountId: number;
};

export default function AccountTransactions({
	accountId,
}: AccountTransactionsProps) {
	const { transactions } = useTransactionList();

	return (
		<ul role="list" className="divide-y divide-gray-300 dark:divide-gray-600">
			{transactions.map((transaction) => (
				<TransactionItem
					key={transaction.id}
					transaction={transaction}
					accountId={accountId}
				/>
			))}
		</ul>
	);
}
