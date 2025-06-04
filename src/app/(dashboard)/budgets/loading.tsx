import { Heading } from '@/components/base/heading';
import DateSwitcher from '@/components/DateSwitcher';
import BudgetListSkeleton from '@/components/budget/BudgetListSkeleton';

export default async function BudgetsPageSkeleton() {
	return (
		<main className="flex flex-col gap-5">
			<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<Heading>Budgets</Heading>
				<DateSwitcher />
			</div>
			<BudgetListSkeleton />
		</main>
	);
}
