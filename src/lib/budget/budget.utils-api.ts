import useSWR, { mutate } from 'swr';
import { Budget } from '@/lib/budget/budget.model';
import { API, dateParams, dateParams2 } from '@/lib/const';
import { fetcher } from '@/lib/shared/api-client.utils';
import type { Transaction } from '@/lib/transaction/transaction.model';
import { useYearMonth } from '@/lib/shared/date.utils.client';

const getBudgetUrl = (asOf: string) => `/api/${API.BUDGETS}?${dateParams2(asOf)}`;

export const useBudgets = () => {
	const [_y, _m, asOf] = useYearMonth();
	const { data: budgetsData, isLoading } = useSWR<Budget[]>(getBudgetUrl(asOf), fetcher);

	const budgets = budgetsData || [];

	return { budgets, isLoading };
};

export const getBudgetTransactionsUrl = (budgetId: number, asOf: string) =>
	`/api/${API.BUDGETS}/${budgetId}/${API.TRANSACTIONS}?${dateParams2(asOf)}`;

export const useBudgetTransactions = (budgetId: number, asOf: string) => {
	const url = getBudgetTransactionsUrl(budgetId, asOf);

	return useSWR<Transaction[]>(url, fetcher);
};

export const mutateBudgets = (asOf: string) => {
	void mutate(getBudgetUrl(asOf));
};
