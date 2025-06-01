import { useState, useEffect } from 'react';
import { Budget } from '@/lib/budget/budget.model';

export function useOptimisticBudgets(initialBudgets: Budget[]) {
	// Sort function by sortOrder
	const sortBudgets = (budgets: Budget[]): Budget[] => {
		return budgets.toSorted((a, b) => a.sortOrder - b.sortOrder);
	};

	// Optimistic budgets state
	const [budgets, setBudgets] = useState<Budget[]>([]);

	// Initialize or update optimistic state on initialBudgets change
	useEffect(() => {
		setBudgets(sortBudgets(initialBudgets));
	}, [initialBudgets]);

	// Add or update a budget optimistically
	const addOrUpdateOptimistic = (newBudget: Budget) => {
		setBudgets((prev) => {
			const filtered = prev.filter((b) => b.id !== newBudget.id);
			return sortBudgets([...filtered, newBudget]);
		});
	};

	// Confirm save: replace temporary budget with real one
	const confirmSave = (tempId: number, savedBudget: Budget) => {
		setBudgets((prev) => {
			const filtered = prev.filter((b) => b.id !== tempId);
			return sortBudgets([savedBudget, ...filtered]);
		});
	};

	// Delete a budget optimistically
	const deleteOptimistic = (budgetToDelete: Budget) => {
		setBudgets((prev) => prev.filter((b) => b.id !== budgetToDelete.id));
	};

	return {
		budgets,
		addOrUpdateOptimistic,
		confirmSave,
		deleteOptimistic,
		setBudgets,
	};
}
