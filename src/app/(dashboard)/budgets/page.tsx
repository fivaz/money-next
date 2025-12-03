import { getCurrentMonthBudgetsWithDetails } from '@/lib/budget/budget.actions';
import BudgetList from '@/components/budget/BudgetList';
import { Heading } from '@/components/base/heading';
import { BudgetListProvider } from '@/lib/budget/BudgetListProvider';
import BudgetListSkeleton from '@/components/budget/BudgetListSkeleton';
import { Suspense } from 'react';
import { getISODate } from '@/lib/shared/date.utils';

type BudgetsPageProps = {
	searchParams: Promise<{ asOf?: string }>;
};

export default async function BudgetsPage({ searchParams }: BudgetsPageProps) {
	const { asOf: asOfString } = await searchParams;

	const asOf = asOfString || getISODate(new Date());

	const budgets = await getCurrentMonthBudgetsWithDetails(asOf);

	return (
		<main className="flex flex-col gap-5">
			<Heading>Budgets</Heading>
			<BudgetListProvider initialItems={budgets}>
				<Suspense fallback={<BudgetListSkeleton />}>
					<BudgetList />
				</Suspense>
			</BudgetListProvider>
		</main>
	);
}
