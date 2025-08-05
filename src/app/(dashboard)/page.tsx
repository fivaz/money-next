import { Suspense } from 'react';
import { TransactionListSkeleton } from '@/app/(dashboard)/loading';
import { Heading } from '@/components/base/heading';
import DateSwitcher from '@/components/date-switcher/DateSwitcher';
import DateSwitcherSkeleton from '@/components/date-switcher/DateSwitcherSkeleton';
import SearchTransactions from '@/components/transaction/SearchTransactions';
import TransactionSearchWithData from '@/components/transaction/TransactionSearchWithData';
import { Skeleton } from '@/components/Skeleton';
import AccountListWithData from '@/components/accounts/AccountListWithData';

type HomePageProps = {
	searchParams: Promise<{
		query?: string;
		page?: string;
	}>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
	const { query, page } = await searchParams;

	const currentPage = Number(page) || 1;

	return (
		<main className="flex flex-col gap-5">
			<div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
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
				<Suspense fallback={<TransactionListSkeleton />}>
					<TransactionSearchWithData query={query} page={currentPage} />
				</Suspense>
			) : (
				<AccountListWithData />
			)}
		</main>
	);
}
