import { Budget } from '@/lib/budget/budget.model';

export const buildBudget = (formData: FormData): Omit<Budget, 'id'> => {
	return {
		name: formData.get('name') as string,
		icon: formData.get('icon') as string,
		parent: null,
		sortOrder: Infinity,
		amount: parseInt(formData.get('amount') as string),
	};
};

export const sortBudgets = (budgets: Budget[]): Budget[] =>
	budgets.toSorted((a, b) => a.sortOrder - b.sortOrder);
