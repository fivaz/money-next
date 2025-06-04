'use client';
import BudgetItem from '@/components/budget/BudgetItem';
import BudgetFormButton from '@/components/budget/budget-form/BudgetFormButton';
import { DragDropProvider } from '@dnd-kit/react';
import { move } from '@dnd-kit/helpers';
import { reorderBudgets } from '@/lib/budget/budget.actions';
import DateSwitcher from '@/components/date-switcher/DateSwitcher';
import { useBudgetList } from '@/lib/budget/BudgetListProvider';

type BudgetProps = {};
export default function BudgetList({}: BudgetProps) {
	const { updateList, items: budgets } = useBudgetList();

	const handleDragEnd = (event: Parameters<typeof move>[1]) => {
		const newBudgets = move(budgets, event);
		updateList(newBudgets);
		void reorderBudgets(newBudgets);
	};

	return (
		<div className="flex flex-col gap-4">
			<div className="flex justify-between gap-5 sm:-mt-14 sm:justify-end">
				<DateSwitcher />
				<BudgetFormButton />
			</div>
			<ul className="mt-4 space-y-2">
				<DragDropProvider onDragEnd={handleDragEnd}>
					{budgets.map((budget, index) => (
						<BudgetItem index={index} key={budget.id} budget={budget} />
					))}
				</DragDropProvider>
			</ul>
		</div>
	);
}
