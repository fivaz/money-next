import { Budget } from '@/lib/budget/budget.model';
import type { Transaction } from '@/lib/transaction/transaction.model';
import { useMemo } from 'react';
import useSWR from 'swr';
import { API } from '@/lib/const';
import { fetcher } from '@/lib/shared/api-client.utils';

export const buildBudget = (formData: FormData): Budget => {
	return {
		id: Number(formData.get('id')),
		name: formData.get('name') as string,
		icon: formData.get('icon') as string,
		parent: null,
		sortOrder: Number(formData.get('sortOrder')) ?? 10000,
		amount: parseInt(formData.get('amount') as string),
		startAt: formData.get('startAt') as string,
		endAt: formData.get('endAt') as string,
		isAccumulative: formData.get('isAccumulative') === 'on',
		accumulativeAmount: 0,
	};
};

export const sortBudgets = (a: Budget, b: Budget) => a.sortOrder - b.sortOrder;

export const getAmount = (budget: Budget): number =>
	budget.isAccumulative
		? budget.amount + (budget.accumulativeAmount || 0)
		: budget.amount;

export const fetchBudgets = () => {
	const { data: budgetsData, isLoading } = useSWR<Budget[]>(
		`/api/${API.BUDGETS}`,
		fetcher,
	);

	const budgets = budgetsData || [];

	return { budgets, isLoading };
};

export const fetchBudgetTransactions = (
	budgetId: number,
	year: number,
	month: number,
) => {
	const url = `/api/${API.BUDGETS}/${budgetId}/${API.TRANSACTIONS}?year=${year}&month=${month}`;

	const { data: initialTransactionsData } = useSWR<Transaction[]>(url, fetcher);

	return initialTransactionsData || [];
};
