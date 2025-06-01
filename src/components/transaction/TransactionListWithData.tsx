import { getCurrentMonthTransactions } from '@/lib/transaction/transaction.actions';
import TransactionList from '@/components/transaction/TransactionList';

type TransactionListWithDataProps = {
	year: number;
	month: number;
};

export default async function TransactionListWithData({
	year,
	month,
}: TransactionListWithDataProps) {
	const transactions = await getCurrentMonthTransactions({ year, month });

	return <TransactionList transactions={transactions} />;
}
