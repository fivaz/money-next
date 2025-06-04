'use client';
import BudgetItem from '@/components/budget/BudgetItem';
import BudgetFormButton from '@/components/budget/budget-form/BudgetFormButton';
import { type Budget } from '@/lib/budget/budget.model';
import { DragDropProvider } from '@dnd-kit/react';
import { move } from '@dnd-kit/helpers';
import { reorderBudgets } from '@/lib/budget/budget.actions';
import { useOptimisticList } from '@/lib/shared/optmistic.hook';
import { sortBudgets } from '@/lib/budget/budget.utils';
import DateSwitcher from '@/components/DateSwitcher';

type BudgetProps = {
	initialBudgets: Budget[];
};
export default function BudgetList({ initialBudgets }: BudgetProps) {
	const {
		items: budgets,
		confirmSave,
		addOrUpdate,
		deleteOptimistic,
		setItems: setBudgets,
	} = useOptimisticList(initialBudgets, sortBudgets);

	const handleDragEnd = (event: Parameters<typeof move>[1]) => {
		const newBudgets = move(budgets, event);
		setBudgets(newBudgets);
		void reorderBudgets(newBudgets);
	};

	return (
		<div className="flex flex-col gap-4">
			<div className="flex justify-between gap-5 sm:-mt-14 sm:justify-end">
				<DateSwitcher />
				<BudgetFormButton onAddOrUpdateAction={addOrUpdate} onConfirmSaveAction={confirmSave} />
			</div>
			<ul className="mt-4 space-y-2">
				<DragDropProvider onDragEnd={handleDragEnd}>
					{budgets.map((budget, index) => (
						<BudgetItem
							index={index}
							key={budget.id}
							budget={budget}
							onAddOrUpdateAction={addOrUpdate}
							onConfirmSaveAction={confirmSave}
							onDeleteAction={deleteOptimistic}
						/>
					))}
				</DragDropProvider>
			</ul>
		</div>
	);
}
