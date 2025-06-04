'use client';

import { createOptimisticListProvider } from '@/lib/shared/optimistic-context';
import { Budget } from '@/lib/budget/budget.model';

export const {
	OptimisticListProvider: BudgetListProvider,
	useOptimisticListContext: useBudgetList,
} = createOptimisticListProvider<Budget>();
