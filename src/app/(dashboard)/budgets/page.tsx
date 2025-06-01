import DateSwitcher from '@/components/date-switcher/DateSwitcher';
import { Suspense } from 'react';
import DateSwitcherClient from '@/components/date-switcher/DateSwitcherClient';
import { getBudgets } from '@/lib/budget/budget.actions';
import BudgetList from '@/components/budget/BudgetList';

export default async function HomePage() {
	const budgets = await getBudgets();

	console.log(budgets);

	return (
		<main>
			<Suspense fallback={<DateSwitcherClient actualBalance={0} isLoading />}>
				<DateSwitcher />
			</Suspense>
			<BudgetList initialBudgets={budgets} />
		</main>
	);
}
