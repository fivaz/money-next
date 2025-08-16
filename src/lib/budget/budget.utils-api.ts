import useSWR, { mutate } from 'swr';
import { Budget } from '@/lib/budget/budget.model';
import { API, dateParams } from '@/lib/const';
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

export const getBudgetTransactionsUrl = (budgetId: number, year: number, month: number) =>
	`/api/${API.BUDGETS}/${budgetId}/${API.TRANSACTIONS}?${dateParams(year, month)}`;

export const useBudgetTransactions = (budgetId: number, year: number, month: number) => {
	const url = getBudgetTransactionsUrl(budgetId, year, month);

	const { data: initialTransactionsData } = useSWR<Transaction[]>(url, fetcher);

	return initialTransactionsData || [];
};

export const mutateBudgets = (year: number, month: number) => {
	void mutate(getBudgetUrl(year, month));
};
