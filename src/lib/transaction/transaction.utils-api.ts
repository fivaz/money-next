import { API } from '@/lib/const';
import useSWR, { mutate } from 'swr';
import type { Transaction } from '@/lib/transaction/transaction.model';
import { fetcher } from '@/lib/shared/api-client.utils';
import { BALANCE_URL, getBudgetedSpentUrl } from '@/lib/source/source.utils-api';
import { getBudgetTransactionsUrl } from '@/lib/budget/budget.utils-api';

const getAccountTransactionsUrl = (accountId: number, year: number, month: number) =>
	`/api/${API.ACCOUNTS}/${accountId}/${API.TRANSACTIONS}?year=${year}&month=${month}&timezone=${Intl.DateTimeFormat().resolvedOptions().timeZone}`;

export const useAccountTransactions = (accountId: number, year: number, month: number) => {
	const url = getAccountTransactionsUrl(accountId, year, month);

	const { data: initialTransactionsData } = useSWR<Transaction[]>(url, fetcher);

	return initialTransactionsData || [];
};

const getAccountBalanceUrl = (accountId: number, year: number, month: number) =>
	`/api/${API.ACCOUNTS}/${accountId}/balance?year=${year}&month=${month}`;

export const useAccountBalance = (accountId: number, year: number, month: number) => {
	const url = getAccountBalanceUrl(accountId, year, month);

	const { data } = useSWR<number>(url, fetcher);

	return data || 0;
};

type SourceType = 'account' | 'budget';

export const mutateTransactions = (
	transaction: Omit<Transaction, 'id'>,
	year: number,
	month: number,
	source?: { type: SourceType; id: number },
) => {
	void mutate(BALANCE_URL);

	if (!source) {
		return;
	}

	if (source.type === 'account') {
		void mutate(getAccountTransactionsUrl(transaction.account.id, year, month));
		void mutate(getAccountBalanceUrl(transaction.account.id, year, month));

		if (transaction.destination) {
			void mutate(getAccountTransactionsUrl(transaction.destination.id, year, month));
			void mutate(getAccountBalanceUrl(transaction.destination.id, year, month));
		}

		if (source.id && transaction.account.id !== source.id) {
			void mutate(getAccountTransactionsUrl(source.id, year, month));
			void mutate(getAccountBalanceUrl(source.id, year, month));
		}
	}

	if (source.type === 'budget') {
		void mutate(getBudgetedSpentUrl(year, month));

		if (transaction.budget) {
			void mutate(getBudgetTransactionsUrl(transaction.budget.id, year, month));
		}

		if (source.id && transaction.budget?.id !== source.id) {
			void mutate(getBudgetTransactionsUrl(source.id, year, month));
		}
	}
};
