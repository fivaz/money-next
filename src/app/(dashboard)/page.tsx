import { getCurrentMonthTransactions } from '../actions/transaction';
import TransactionList from '@/components/transaction/TransactionList';
import DateSwitcher from '@/components/date-switcher/DateSwitcher';
import { Suspense } from 'react';

export default async function HomePage() {
	const transactions = await getCurrentMonthTransactions();

	return (
		<main>
			<Suspense>
				<DateSwitcher />
			</Suspense>
			<TransactionList initialTransactions={transactions} />
		</main>
	);
}
