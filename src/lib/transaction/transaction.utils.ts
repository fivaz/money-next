import type { Transaction } from '@/lib/transaction/transaction.model';

export const sortTransactions = (a: Transaction, b: Transaction, desc: boolean = true) => {
	const dateA = new Date(a.date).getTime();
	const dateB = new Date(b.date).getTime();
	return desc ? dateB - dateA : dateA - dateB;
};

export const sumTransactions = (transactions: Transaction[]): number =>
	transactions.filter((t) => t.isPaid).reduce((sum, t) => sum + getAmount(t, t.account.id), 0);

export const getAmount = (transaction: Transaction, accountId: number): number => {
	// Make amount positive if this account is the destination
	if (transaction.destination?.id === accountId) {
		return Math.abs(transaction.amount);
	}

	return transaction.amount;
};
