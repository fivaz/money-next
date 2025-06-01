'use client';
import BudgetItem from '@/components/budget/BudgetItem';
import BudgetFormButton from '@/components/budget/budget-form/BudgetFormButton';
import { type Budget } from '@/lib/budget/budget.model';
import { DragDropProvider } from '@dnd-kit/react';
import { move } from '@dnd-kit/helpers';
import { reorderBudgets } from '@/lib/budget/budget.actions';
import { useOptimisticList } from '@/lib/shared/optmistic.hook';
import { sortBudgets } from '@/lib/budget/budget.utils';

type BudgetProps = {
	initialBudgets: Budget[];
};
export default function BudgetList({ initialBudgets }: BudgetProps) {
	const {
		items: budgets,
		confirmSave,
		addOrUpdateOptimistic,
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
			<div className="flex justify-end">
				<BudgetFormButton
					onAddOptimisticAction={addOrUpdateOptimistic}
					onConfirmSaveAction={confirmSave}
				/>
			</div>
			<ul className="mt-4 space-y-2">
				<DragDropProvider onDragEnd={handleDragEnd}>
					{budgets.map((budget, index) => (
						<BudgetItem
							index={index}
							key={budget.id}
							budget={budget}
							onAddOptimisticAction={addOrUpdateOptimistic}
							onConfirmSaveAction={confirmSave}
							onDeleteAction={deleteOptimistic}
						/>
					))}
				</DragDropProvider>
			</ul>
		</div>
	);
}
