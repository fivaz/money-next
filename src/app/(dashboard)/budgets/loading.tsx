import { Heading } from '@/components/base/heading';
import DateSwitcher from '@/components/date-switcher/DateSwitcher';
import BudgetListSkeleton from '@/components/budget/BudgetListSkeleton';
import DateSwitcherSkeleton from '@/components/date-switcher/DateSwitcherSkeleton';

export default async function BudgetsPageSkeleton() {
	return (
		<main className="flex flex-col gap-5">
			<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<Heading>Budgets</Heading>
				<DateSwitcherSkeleton />
			</div>
			<BudgetListSkeleton />
		</main>
	);
}
