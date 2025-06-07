import TransactionItem from '@/components/transaction/TransactionItem';
import { Transaction } from '@/lib/transaction/transaction.model';
import { searchTransactions } from '@/lib/transaction/transaction.actions';
import { TransactionListProvider } from '@/lib/transaction/TransactionListProvider';
import TransactionSearch from '@/components/transaction/TransactionSearch';

type TransactionProps = {
	query: string;
};

export default async function TransactionSearchWithData({ query }: TransactionProps) {
	const transactions = await searchTransactions(query);

	return (
		<TransactionListProvider initialItems={transactions}>
			<TransactionSearch />
		</TransactionListProvider>
	);
}
