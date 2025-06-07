import { Suspense } from 'react';
import TransactionListWithData from '@/components/transaction/TransactionListWithData';
import { TransactionListSkeleton } from '@/app/(dashboard)/loading';
import { Heading } from '@/components/base/heading';
import DateSwitcher from '@/components/date-switcher/DateSwitcher';
import DateSwitcherSkeleton from '@/components/date-switcher/DateSwitcherSkeleton';
import { Input } from '@/components/base/input';
import SearchInput from '@/components/SearchInput';
import SearchTransactions from '@/components/transaction/SearchTransactions';
import TransactionSearchList from '@/components/transaction/TransactionSearchList';

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
					<SearchTransactions />
				</div>
			</div>
			{query ? (
				<Suspense key={suspenseKey} fallback={<TransactionListSkeleton />}>
					<TransactionSearchList query={query} />
				</Suspense>
			) : (
				<Suspense key={suspenseKey} fallback={<TransactionListSkeleton />}>
					<TransactionListWithData year={year} month={month} />
				</Suspense>
			)}
		</main>
	);
}
