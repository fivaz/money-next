import { API } from '@/lib/const';
import useSWR, { mutate } from 'swr';
import type { Transaction } from '@/lib/transaction/transaction.model';
import { fetcher } from '@/lib/shared/api-client.utils';
import { BALANCE_URL } from '@/lib/source/source.utils-api';

const getAccountTransactionsUrl = (accountId: number, year: number, month: number) =>
	`/api/${API.ACCOUNTS}/${accountId}/${API.TRANSACTIONS}?year=${year}&month=${month}`;

export const fetchAccountTransactions = (accountId: number, year: number, month: number) => {
	const url = getAccountTransactionsUrl(accountId, year, month);

	const { data: initialTransactionsData, mutate } = useSWR<Transaction[]>(url, fetcher);

	return { data: initialTransactionsData || [], mutate };
};

const getAccountBalanceUrl = (accountId: number, year: number, month: number) =>
	`/api/${API.ACCOUNTS}/${accountId}/balance?year=${year}&month=${month}`;

export const fetchAccountBalance = (accountId: number, year: number, month: number) => {
	const url = getAccountBalanceUrl(accountId, year, month);

	const { data } = useSWR<number>(url, fetcher);

	return data || 0;
};

export const mutateTransactions = (
	transaction: Transaction,
	year: number,
	month: number,
	previousSourceAccountId?: number,
) => {
	void mutate(BALANCE_URL);

	void mutate(getAccountTransactionsUrl(transaction.account.id, year, month));
	void mutate(getAccountBalanceUrl(transaction.account.id, year, month));
	// void mutate(getBudgetTransactionsUrl(transaction.budget.id, year, month));

	if (transaction.destination) {
		void mutate(getAccountTransactionsUrl(transaction.destination.id, year, month));
		void mutate(getAccountBalanceUrl(transaction.destination.id, year, month));
	}

	if (previousSourceAccountId && transaction.account.id !== previousSourceAccountId) {
		void mutate(getAccountTransactionsUrl(previousSourceAccountId, year, month));
		void mutate(getAccountBalanceUrl(previousSourceAccountId, year, month));
	}
};
