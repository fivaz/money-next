import useSWR, { mutate } from 'swr';
import { Budget } from '@/lib/budget/budget.model';
import { API } from '@/lib/const';
import { fetcher } from '@/lib/shared/api-client.utils';
import type { Transaction } from '@/lib/transaction/transaction.model';

const getBudgetUrl = () => `/api/${API.BUDGETS}`;

export const fetchBudgets = () => {
	const { data: budgetsData, isLoading } = useSWR<Budget[]>(getBudgetUrl(), fetcher);

	const budgets = budgetsData || [];

	return { budgets, isLoading };
};

export const getBudgetTransactionsUrl = (budgetId: number, year: number, month: number) =>
	`/api/${API.BUDGETS}/${budgetId}/${API.TRANSACTIONS}?year=${year}&month=${month}`;

export const fetchBudgetTransactions = (budgetId: number, year: number, month: number) => {
	const url = getBudgetTransactionsUrl(budgetId, year, month);

	const { data: initialTransactionsData } = useSWR<Transaction[]>(url, fetcher);

	return initialTransactionsData || [];
};

export const mutateBudgets = () => void mutate(getBudgetUrl());
