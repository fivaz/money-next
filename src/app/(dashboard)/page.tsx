import { Suspense } from 'react';
import TransactionListWithData from '@/components/transaction/TransactionListWithData';
import { TransactionListSkeleton } from '@/app/(dashboard)/loading';

type HomePageProps = {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
	const { year: yearParam, month: monthParam } = await searchParams;

	const year = Number(yearParam) || new Date().getFullYear();
	const month = Number(monthParam) || new Date().getMonth() + 1;

	const suspenseKey = `${year}-${month}`;

	return (
		<main>
			<Suspense key={suspenseKey} fallback={<TransactionListSkeleton />}>
				<TransactionListWithData year={year} month={month} />
			</Suspense>
		</main>
	);
}
