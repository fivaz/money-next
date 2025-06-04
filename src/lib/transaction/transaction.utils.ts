import { Transaction } from '@/lib/transaction/transaction.model';
import { Budget } from '@/lib/budget/budget.model';

export const buildTransaction = (formData: FormData, budgets: Budget[] = []): Transaction => {
	const budget = budgets.find((budget) => budget.id === Number(formData.get('budget'))) || null;

	return {
		id: Number(formData.get('id')),
		description: formData.get('description') as string,
		amount: parseInt(formData.get('amount') as string),
		date: formData.get('date') as string,
		budget,
		isPaid: formData.get('isPaid') === 'on',
		referenceDate: formData.get('referenceDate') as string,
	};
};

export const sortTransactions = (transactions: Transaction[]): Transaction[] =>
	transactions.toSorted((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const sumTransactions = (transactions: Transaction[]): number =>
	transactions.filter((t) => t.isPaid).reduce((sum, t) => sum + t.amount, 0);
