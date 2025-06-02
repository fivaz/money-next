import { Suspense } from 'react';
import TransactionListWithData from '@/components/transaction/TransactionListWithData';
import { TransactionListSkeleton } from '@/app/(dashboard)/loading';

type HomePageProps = {
	searchParams: { month?: string; year?: string };
};

export default async function HomePage({ searchParams }: HomePageProps) {
	const resolved = await searchParams;
	const year = Number(resolved.year) || new Date().getFullYear();
	const month = Number(resolved.month) || new Date().getMonth() + 1;

	const suspenseKey = `${year}-${month}`;

	return (
		<main>
			<Suspense key={suspenseKey} fallback={<TransactionListSkeleton />}>
				<TransactionListWithData year={year} month={month} />
			</Suspense>
		</main>
	);
}
