import { Transaction } from '@/lib/transaction/transaction.model';
import { Budget } from '@/lib/budget/budget.model';

export const buildTransaction = (formData: FormData, budgets: Budget[] = []): Transaction => {
	const operation = formData.get('operation') as string;
	const amountValue = parseInt(formData.get('amount') as string);
	const amount = operation === 'income' ? amountValue : amountValue * -1;

	const budget = budgets.find((budget) => budget.id === Number(formData.get('budget'))) || null;

	return {
		id: Number(formData.get('id')),
		description: formData.get('description') as string,
		amount,
		date: formData.get('date') as string,
		budget,
		isPaid: formData.get('isPaid') === 'on',
		referenceDate: formData.get('referenceDate') as string,
		spreadStart: formData.get('spreadStart') as string,
		spreadEnd: formData.get('spreadEnd') as string,
	};
};

export const sortTransactions = (a: Transaction, b: Transaction) =>
	new Date(b.date).getTime() - new Date(a.date).getTime();

export const sumTransactions = (transactions: Transaction[]): number =>
	transactions.filter((t) => t.isPaid).reduce((sum, t) => sum + t.amount, 0);
