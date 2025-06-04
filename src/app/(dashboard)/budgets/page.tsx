import { getBudgets } from '@/lib/budget/budget.actions';
import BudgetList from '@/components/budget/BudgetList';
import { Heading } from '@/components/base/heading';
import DateSwitcher from '@/components/DateSwitcher';

export default async function BudgetsPage() {
	const budgets = await getBudgets();

	return (
		<main className="flex flex-col gap-5">
			<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<Heading>Budgets</Heading>
				<DateSwitcher />
			</div>
			<BudgetList initialBudgets={budgets} />
		</main>
	);
}
