import DateSwitcher from '@/components/date-switcher/DateSwitcher';
import { Suspense } from 'react';
import DateSwitcherClient from '@/components/date-switcher/DateSwitcherClient';
import { getBudgets } from '@/lib/budget/budget.actions';
import BudgetList from '@/components/budget/BudgetList';

export default async function BudgetsPage() {
	const budgets = await getBudgets();

	return <BudgetList initialBudgets={budgets} />;
}
