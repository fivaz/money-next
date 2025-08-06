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
		isAccumulative: formData.get('isAccumulative') === 'on',
		accumulativeAmount: 0,
	};
};

export const getTotalAmount = (budgets: Budget[]) =>
	budgets.reduce((total, budget) => budget.amount + total, 0);

export const getTotalAccumulativeAmount = (budgets: Budget[]) =>
	budgets.reduce((total, budget) => (budget.accumulativeAmount || 0) + total, 0);
