import useSWR, { mutate } from 'swr';
import { Budget } from '@/lib/budget/budget.model';
import { API, dateParams, dateParams2 } from '@/lib/const';
import { fetcher } from '@/lib/shared/api-client.utils';
import type { Transaction } from '@/lib/transaction/transaction.model';
import { useYearMonth } from '@/lib/shared/date.utils';

const getBudgetUrl = (year: number, month: number) =>
	`/api/${API.BUDGETS}?${dateParams(year, month)}`;

export const useBudgets = () => {
	const [year, month] = useYearMonth();
	const { data: budgetsData, isLoading } = useSWR<Budget[]>(getBudgetUrl(year, month), fetcher);

	const budgets = budgetsData || [];

	return { budgets, isLoading };
};

export const getBudgetTransactionsUrl = (budgetId: number, asOf: string) =>
	`/api/${API.BUDGETS}/${budgetId}/${API.TRANSACTIONS}?${dateParams2(asOf)}`;

export const useBudgetTransactions = (budgetId: number, asOf: string) => {
	const url = getBudgetTransactionsUrl(budgetId, asOf);

	return useSWR<Transaction[]>(url, fetcher);
};

export const mutateBudgets = (year: number, month: number) => {
	void mutate(getBudgetUrl(year, month));
};
