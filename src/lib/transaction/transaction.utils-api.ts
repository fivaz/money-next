import { API, dateParams2 } from '@/lib/const';
import useSWR, { mutate } from 'swr';
import type { Transaction } from '@/lib/transaction/transaction.model';
import { fetcher } from '@/lib/shared/api-client.utils';
import { getBudgetTransactionsUrl } from '@/lib/budget/budget.utils-api';
import {
	getActualBalanceUrl,
	getBudgetedSpentUrl,
	UNPAID_BALANCE_URL,
} from '@/lib/balance/balance.utils';

const getAccountTransactionsUrl = (accountId: number, asOf: string) =>
	`/api/${API.ACCOUNTS}/${accountId}/${API.TRANSACTIONS}?${dateParams2(asOf)}`;

export const useAccountTransactions = (accountId: number, asOf: string) => {
	const url = getAccountTransactionsUrl(accountId, asOf);

	return useSWR<Transaction[]>(url, fetcher);
};

const getAccountBalanceUrl = (accountId: number, asOf: string) =>
	`/api/${API.ACCOUNTS}/${accountId}/balance?${dateParams2(asOf)}`;

export const useAccountBalance = (accountId: number, asOf: string) => {
	const url = getAccountBalanceUrl(accountId, asOf);

	const { data } = useSWR<number>(url, fetcher);

	return data || 0;
};

type SourceType = 'account' | 'budget';

export const mutateTransactions = (
	transaction: Omit<Transaction, 'id'>,
	asOf: string,
	source?: { type: SourceType; id: number },
) => {
	void mutate(getActualBalanceUrl(asOf));
	void mutate(UNPAID_BALANCE_URL);

	if (!source) {
		return;
	}

	if (source.type === 'account') {
		void mutate(getAccountTransactionsUrl(transaction.account.id, asOf));
		void mutate(getAccountBalanceUrl(transaction.account.id, asOf));

		if (transaction.destination) {
			void mutate(getAccountTransactionsUrl(transaction.destination.id, asOf));
			void mutate(getAccountBalanceUrl(transaction.destination.id, asOf));
		}

		if (source.id && transaction.account.id !== source.id) {
			void mutate(getAccountTransactionsUrl(source.id, asOf));
			void mutate(getAccountBalanceUrl(source.id, asOf));
		}
	}

	if (source.type === 'budget') {
		void mutate(getBudgetedSpentUrl(asOf));

		if (transaction.budget) {
			void mutate(getBudgetTransactionsUrl(transaction.budget.id, asOf));
		}

		if (source.id && transaction.budget?.id !== source.id) {
			void mutate(getBudgetTransactionsUrl(source.id, asOf));
		}
	}
};
