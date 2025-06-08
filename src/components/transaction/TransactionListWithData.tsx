import { getCurrentMonthTransactions } from '@/lib/transaction/transaction.actions';
import TransactionList from '@/components/transaction/TransactionList';
import { TransactionListProvider } from '@/lib/transaction/TransactionListProvider';

type TransactionListWithDataProps = {
	year: number;
	month: number;
};

export default async function TransactionListWithData({
	year,
	month,
}: TransactionListWithDataProps) {
	const transactions = await getCurrentMonthTransactions({ year, month });

	return (
		<TransactionListProvider initialItems={transactions}>
			<TransactionList />
		</TransactionListProvider>
	);
}
