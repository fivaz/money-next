import { getCurrentMonthTransactions } from '@/lib/transaction/transaction.actions';
import TransactionList from '@/components/transaction/TransactionList';
import DateSwitcher from '@/components/date-switcher/DateSwitcher';
import { Suspense } from 'react';
import DateSwitcherClient from '@/components/date-switcher/DateSwitcherClient';

export default async function HomePage({
	searchParams,
}: {
	searchParams: { month?: string; year?: string };
}) {
	const resolved = await searchParams;
	const year = Number(resolved.year) || new Date().getFullYear();
	const month = Number(resolved.month) || new Date().getMonth() + 1;

	const transactions = await getCurrentMonthTransactions({ year, month });

	return (
		<main>
			<Suspense fallback={<DateSwitcherClient actualBalance={0} isLoading />}>
				<DateSwitcher />
			</Suspense>
			<TransactionList initialTransactions={transactions} />
		</main>
	);
}
