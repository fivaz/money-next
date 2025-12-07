import useSWR, { mutate } from 'swr';
import { Budget } from '@/lib/budget/budget.model';
import { API, dateParams } from '@/lib/const';
import { fetcher } from '@/lib/shared/api-client.utils';
import type { Transaction } from '@/lib/transaction/transaction.model';
import { useAsOf } from '@/lib/shared/date.utils.client';

const getBudgetUrl = (asOf: string) => `/api/${API.BUDGETS}?${dateParams(asOf)}`;

export const useBudgets = () => {
	const asOf = useAsOf();
	const { data: budgetsData, isLoading } = useSWR<Budget[]>(getBudgetUrl(asOf), fetcher);

	const budgets = budgetsData || [];

	return { budgets, isLoading };
};

export const getBudgetTransactionsUrl = (budgetId: number, asOf: string) =>
	`/api/${API.BUDGETS}/${budgetId}/${API.TRANSACTIONS}?${dateParams(asOf)}`;

export const useBudgetTransactions = (budgetId: number, asOf: string) => {
	const url = getBudgetTransactionsUrl(budgetId, asOf);

	return useSWR<Transaction[]>(url, fetcher);
};

export const mutateBudgets = (asOf: string) => {
	void mutate(getBudgetUrl(asOf));
};
