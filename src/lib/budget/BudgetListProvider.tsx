'use client';

import { createOptimisticListProvider } from '@/lib/shared/optimistic-context';
import { Budget } from '@/lib/budget/budget.model';
import { sortBudgets } from '@/lib/budget/budget.utils';

export const {
	OptimisticListProvider: BudgetListProvider,
	useOptimisticListContext: useBudgetList,
} = createOptimisticListProvider<Budget>(sortBudgets);
