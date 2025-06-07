'use client';
import BudgetItem from '@/components/budget/BudgetItem';
import BudgetFormButton from '@/components/budget/budget-form/BudgetFormButton';
import { DragDropProvider } from '@dnd-kit/react';
import { move } from '@dnd-kit/helpers';
import { reorderBudgets } from '@/lib/budget/budget.actions';
import DateSwitcher from '@/components/date-switcher/DateSwitcher';
import { useBudgetList } from '@/lib/budget/BudgetListProvider';
import { useSearchParams } from 'next/navigation';
import { getParamsDate } from '@/lib/shared/date.utils';
import TotalIcon from '@/components/icons/TotalIcon';
import MoneyText from '@/components/MoneyText';
import { Text } from '@/components/base/text';
import { useMemo } from 'react';

type BudgetProps = {
	budgetedSpent: number;
};
export default function BudgetList({ budgetedSpent }: BudgetProps) {
	const { updateList, items: budgets } = useBudgetList();

	const searchParams = useSearchParams();
	const [year, month] = getParamsDate(searchParams);

	const handleDragEnd = (event: Parameters<typeof move>[1]) => {
		const newBudgets = move(budgets, event);
		updateList(newBudgets);
		void reorderBudgets(newBudgets);
	};

	const totalBudget = useMemo(
		() => budgets.reduce((total, budget) => budget.amount + total, 0),
		[budgets],
	);

	const difference = totalBudget - budgetedSpent;

	return (
		<div className="flex flex-col gap-4">
			<div className="flex justify-between gap-5 sm:-mt-14 sm:justify-end">
				<div className="flex items-center gap-2">
					<MoneyText addColor={false} addSign={false}>
						{totalBudget}
					</MoneyText>
					<MoneyText addColor={false} addSign={false}>
						{budgetedSpent}
					</MoneyText>
					(<MoneyText>{difference}</MoneyText>)
				</div>
				<DateSwitcher />
				<BudgetFormButton />
			</div>
			<ul className="mt-4 space-y-2">
				<DragDropProvider onDragEnd={handleDragEnd}>
					{budgets.map((budget, index) => (
						<BudgetItem index={index} key={budget.id} budget={budget} year={year} month={month} />
					))}
				</DragDropProvider>
			</ul>
		</div>
	);
}
