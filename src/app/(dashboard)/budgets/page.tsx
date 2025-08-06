import { getCurrentMonthBudgetsWithDetails } from '@/lib/budget/budget.actions';
import BudgetList from '@/components/budget/BudgetList';
import { Heading } from '@/components/base/heading';
import { BudgetListProvider } from '@/lib/budget/BudgetListProvider';
import BudgetListSkeleton from '@/components/budget/BudgetListSkeleton';
import { Suspense } from 'react';

type BudgetsPageProps = {
	searchParams: Promise<{ year?: string; month?: string }>;
};

export default async function BudgetsPage({ searchParams }: BudgetsPageProps) {
	const { year: yearParam, month: monthParam } = await searchParams;

	const year = Number(yearParam) || new Date().getFullYear();
	const month = Number(monthParam) || new Date().getMonth() + 1;

	const budgets = await getCurrentMonthBudgetsWithDetails({ year, month });

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
