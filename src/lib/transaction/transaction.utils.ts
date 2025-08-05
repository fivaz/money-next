import type { Transaction } from '@/lib/transaction/transaction.model';
import { differenceInMonths } from 'date-fns';

export const sortTransactions = (a: Transaction, b: Transaction, desc: boolean = true) => {
	const dateA = new Date(a.date).getTime();
	const dateB = new Date(b.date).getTime();
	return desc ? dateB - dateA : dateA - dateB;
};

export const sumTransactions = (transactions: Transaction[]): number =>
	transactions.filter((t) => t.isPaid).reduce((sum, t) => sum + getAmount(t, t.account.id), 0);

export const getAmount = (transaction: Transaction, accountId: number): number => {
	let baseAmount = transaction.amount;

	// Handle spread
	if (transaction.spreadStart && transaction.spreadEnd) {
		try {
			const spreadMonths =
				differenceInMonths(new Date(transaction.spreadEnd), new Date(transaction.spreadStart)) + 1;
			baseAmount = baseAmount / spreadMonths;
		} catch (error) {
			console.error(error);
			// fallback to full amount if error in spread calc
		}
	}

	// Make amount positive if this account is the destination
	if (transaction.destination?.id === accountId) {
		return Math.abs(baseAmount);
	}

	return baseAmount;
};
