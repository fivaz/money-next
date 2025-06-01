'use client';
import BudgetItem from '@/components/budget/BudgetItem';
import BudgetFormButton from '@/components/budget/budget-form/BudgetFormButton';
import { BudgetWithTransactions } from '@/lib/budget/budget.model';
import { useOptimistic, useState } from 'react';

type BudgetProps = {
	initialBudgets: BudgetWithTransactions[];
};
export default function BudgetList({ initialBudgets }: BudgetProps) {
	const sortBudgets = (budgets: BudgetWithTransactions[]): BudgetWithTransactions[] => {
		return budgets.toSorted((a, b) => b.sortOrder - a.sortOrder);
	};

	const [budgets, setBudgets] = useState(initialBudgets);

	const [optimisticBudgets, addOptimisticBudget] = useOptimistic(
		budgets,
		(currentList: BudgetWithTransactions[], newTx: BudgetWithTransactions) =>
			sortBudgets([...currentList.filter((t) => t.id !== newTx.id), newTx]),
	);

	const handleConfirmSave = (tempId: number, savedBudget: BudgetWithTransactions) => {
		setBudgets((prev) => sortBudgets([savedBudget, ...prev.filter((t) => t.id !== tempId)]));
	};

	const handleAddOptimistic = (budget: BudgetWithTransactions) => addOptimisticBudget(budget);

	const handleDelete = (budget: BudgetWithTransactions) => {
		setBudgets((prev) => prev.filter((t) => t.id !== budget.id));
	};

	return (
		<div className="flex flex-col gap-4">
			<div className="flex justify-end">
				<BudgetFormButton
					onAddOptimisticAction={handleAddOptimistic}
					onConfirmSaveAction={handleConfirmSave}
				/>
			</div>
			<ul role="list" className="divide-y divide-gray-300 dark:divide-gray-600">
				{optimisticBudgets.map((budget) => (
					<BudgetItem
						key={budget.id}
						budget={budget}
						onAddOptimisticAction={handleAddOptimistic}
						onConfirmSaveAction={handleConfirmSave}
						onDeleteAction={handleDelete}
					/>
				))}
			</ul>
		</div>
	);
}
