import { Suspense } from 'react';
import TransactionListWithData from '@/components/transaction/TransactionListWithData';
import { TransactionListSkeleton } from '@/app/(dashboard)/loading';
import { Heading } from '@/components/base/heading';
import DateSwitcher from '@/components/date-switcher/DateSwitcher';
import DateSwitcherSkeleton from '@/components/date-switcher/DateSwitcherSkeleton';

type HomePageProps = {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
	const { year: yearParam, month: monthParam } = await searchParams;

	const year = Number(yearParam) || new Date().getFullYear();
	const month = Number(monthParam) || new Date().getMonth() + 1;

	const suspenseKey = `${year}-${month}`;

	return (
		<main className="flex flex-col gap-5">
			<div className="flex flex-row items-center justify-between gap-3">
				<Heading>Transactions</Heading>
				<Suspense fallback={<DateSwitcherSkeleton />}>
					<DateSwitcher />
				</Suspense>
			</div>
			<Suspense key={suspenseKey} fallback={<TransactionListSkeleton />}>
				<TransactionListWithData year={year} month={month} />
			</Suspense>
		</main>
	);
}
