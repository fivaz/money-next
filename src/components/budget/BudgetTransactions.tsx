import TransactionItem from '@/components/transaction/TransactionItem';
import { useTransactionList } from '@/lib/transaction/TransactionListProvider';

export default function BudgetTransactions({}) {
	const { items: transactions } = useTransactionList();

	return (
		<ul role="list" className="divide-y divide-gray-300 dark:divide-gray-600">
			{transactions.map((transaction) => (
				<TransactionItem key={transaction.id} transaction={transaction} />
			))}
		</ul>
	);
}
