import type { Transaction } from '@/lib/transaction/transaction.model';
import { parseISO, getDate, getHours, getMinutes, getSeconds, getMilliseconds } from 'date-fns';

export const sortTransactions = (a: Transaction, b: Transaction, desc: boolean = true) => {
	const now = new Date();
	const currentYear = now.getFullYear();
	const currentMonth = now.getMonth(); // 0-based

	const toComparableDate = (dateString: string): Date => {
		const original = parseISO(dateString);
		return new Date(
			currentYear,
			currentMonth,
			getDate(original),
			getHours(original),
			getMinutes(original),
			getSeconds(original),
			getMilliseconds(original),
		);
	};

	const timeA = toComparableDate(a.date).getTime();
	const timeB = toComparableDate(b.date).getTime();

	return desc ? timeB - timeA : timeA - timeB;
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
