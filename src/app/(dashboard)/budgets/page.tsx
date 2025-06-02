import { getBudgets } from '@/lib/budget/budget.actions';
import BudgetList from '@/components/budget/BudgetList';

export default async function BudgetsPage() {
	const budgets = await getBudgets();

	return <BudgetList initialBudgets={budgets} />;
}
