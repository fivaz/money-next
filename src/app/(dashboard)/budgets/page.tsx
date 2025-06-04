import { getBudgets } from '@/lib/budget/budget.actions';
import BudgetList from '@/components/budget/BudgetList';
import { Heading } from '@/components/base/heading';
import { BudgetListProvider } from '@/lib/budget/BudgetListProvider';

export default async function BudgetsPage() {
	const budgets = await getBudgets();

	return (
		<main className="flex flex-col gap-5">
			<Heading>Budgets</Heading>
			<BudgetListProvider initialItems={budgets}>
				<BudgetList />
			</BudgetListProvider>
		</main>
	);
}
