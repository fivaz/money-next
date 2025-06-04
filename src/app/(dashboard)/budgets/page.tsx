import { getBudgets } from '@/lib/budget/budget.actions';
import BudgetList from '@/components/budget/BudgetList';
import { Heading } from '@/components/base/heading';

export default async function BudgetsPage() {
	const budgets = await getBudgets();

	return (
		<main className="flex flex-col gap-5">
			<Heading>Budgets</Heading>
			<BudgetList initialBudgets={budgets} />
		</main>
	);
}
