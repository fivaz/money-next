import { getBudgets } from '@/lib/budget/budget.actions';
import BudgetList from '@/components/budget/BudgetList';
import { Heading } from '@/components/base/heading';
import { BudgetListProvider } from '@/lib/budget/BudgetListProvider';
import { getBudgetedSpent } from '@/app/actions/get-balance';

type BudgetsPageProps = {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function BudgetsPage({ searchParams }: BudgetsPageProps) {
	const { year: yearParam, month: monthParam } = await searchParams;

	const year = Number(yearParam) || new Date().getFullYear();
	const month = Number(monthParam) || new Date().getMonth() + 1;

	const budgets = await getBudgets();
	const budgetedSpent = await getBudgetedSpent({ year, month });

	return (
		<main className="flex flex-col gap-5">
			<Heading>Budgets</Heading>
			<BudgetListProvider initialItems={budgets}>
				<BudgetList budgetedSpent={budgetedSpent} />
			</BudgetListProvider>
		</main>
	);
}
