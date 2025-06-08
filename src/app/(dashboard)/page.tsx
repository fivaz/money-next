import { Suspense } from 'react';
import TransactionListWithData from '@/components/transaction/TransactionListWithData';
import { TransactionListSkeleton } from '@/app/(dashboard)/loading';
import { Heading } from '@/components/base/heading';
import DateSwitcher from '@/components/date-switcher/DateSwitcher';
import DateSwitcherSkeleton from '@/components/date-switcher/DateSwitcherSkeleton';
import SearchTransactions from '@/components/transaction/SearchTransactions';
import TransactionSearchWithData from '@/components/transaction/TransactionSearchWithData';
import { Skeleton } from '@/components/Skeleton';

type HomePageProps = {
	searchParams: Promise<{ year?: string; month?: string; query?: string }>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
	const { year: yearParam, month: monthParam, query } = await searchParams;

	const year = Number(yearParam) || new Date().getFullYear();
	const month = Number(monthParam) || new Date().getMonth() + 1;

	const suspenseKey = `${year}-${month}-${query}`;

	return (
		<main className="flex flex-col gap-5">
			<div className="flex flex-row items-center justify-between gap-3">
				<Heading>Transactions</Heading>
				<div className="flex gap-3">
					<Suspense fallback={<DateSwitcherSkeleton />}>
						<DateSwitcher />
					</Suspense>
					<Suspense fallback={<Skeleton />}>
						<SearchTransactions />
					</Suspense>
				</div>
			</div>
			{query ? (
				<Suspense key={suspenseKey} fallback={<TransactionListSkeleton />}>
					<TransactionSearchWithData query={query} />
				</Suspense>
			) : (
				<Suspense key={suspenseKey} fallback={<TransactionListSkeleton />}>
					<TransactionListWithData year={year} month={month} />
				</Suspense>
			)}
		</main>
	);
}
