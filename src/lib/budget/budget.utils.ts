import { Budget } from '@/lib/budget/budget.model';

export const buildBudget = (formData: FormData): Budget => {
	return {
		id: Number(formData.get('id')),
		name: formData.get('name') as string,
		icon: formData.get('icon') as string,
		parent: null,
		sortOrder: Number(formData.get('sortOrder')) ?? 10000,
		amount: parseInt(formData.get('amount') as string),
		startAt: formData.get('startAt') as string,
		endAt: formData.get('endAt') as string,
	};
};

export const sortBudgets = (a: Budget, b: Budget) => a.sortOrder - b.sortOrder;
