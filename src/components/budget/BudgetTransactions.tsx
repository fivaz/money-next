'use client';
import TransactionItem from '@/components/transaction/TransactionItem';
import { useTransactionList } from '@/lib/transaction/useTransactionList';

export default function BudgetTransactions({}) {
	const { transactions } = useTransactionList();

	return (
		<ul role="list" className="divide-y divide-gray-300 dark:divide-gray-600">
			{transactions.map((transaction) => (
				<TransactionItem key={transaction.id} transaction={transaction} />
			))}
		</ul>
	);
}
