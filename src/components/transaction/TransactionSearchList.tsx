import TransactionItem from '@/components/transaction/TransactionItem';
import { Transaction } from '@/lib/transaction/transaction.model';
import { searchTransactions } from '@/lib/transaction/transaction.actions';

type TransactionProps = {
	query: string;
};

export default async function TransactionSearchList({ query }: TransactionProps) {
	const transactions = await searchTransactions(query);

	return (
		<div className="flex flex-col rounded-lg border border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-800">
			<ul role="list" className="divide-y divide-gray-300 dark:divide-gray-600">
				{transactions.map((transaction) => (
					<TransactionItem key={transaction.id} transaction={transaction} isEditable={false} />
				))}
			</ul>
		</div>
	);
}
