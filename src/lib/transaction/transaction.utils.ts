import { Account } from '@/lib/account/account.model';
import type { Transaction } from '@/lib/transaction/transaction.model';
import { API } from '@/lib/const';
import useSWR from 'swr';
import { fetcher } from '@/lib/shared/api-client.utils';
import type { Budget } from '@/lib/budget/budget.model';
import { differenceInMonths } from 'date-fns';

export const sortTransactions = (a: Transaction, b: Transaction) =>
	new Date(b.date).getTime() - new Date(a.date).getTime();

export const sumTransactions = (transactions: Transaction[]): number =>
	transactions
		.filter((t) => t.isPaid)
		.reduce((sum, t) => sum + getAmount(t, t.account.id), 0);

export const getAmount = (
	transaction: Transaction,
	accountId: number,
): number => {
	let baseAmount = transaction.amount;

	// Handle spread
	if (transaction.spreadStart && transaction.spreadEnd) {
		try {
			const spreadMonths =
				differenceInMonths(
					new Date(transaction.spreadEnd),
					new Date(transaction.spreadStart),
				) + 1;
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

export const fetchAccountTransactions = (
	accountId: number,
	year: number,
	month: number,
) => {
	const url = `/api/${API.ACCOUNTS}/${accountId}/${API.TRANSACTIONS}?year=${year}&month=${month}`;

	const { data: initialTransactionsData } = useSWR<Transaction[]>(url, fetcher);

	return initialTransactionsData || [];
};

export const fetchAccountBalance = (
	accountId: number,
	year: number,
	month: number,
) => {
	const url = `/api/${API.ACCOUNTS}/${accountId}/balance?year=${year}&month=${month}`;

	const { data } = useSWR<number>(url, fetcher);

	return data || 0;
};
