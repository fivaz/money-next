'use server';
import { BACKEND_URL } from '@/lib/const';
import { fetchWithAuth } from '@/lib/shared/api-server.utils';
import { Budget, BUDGETS_URL, validateBudgets } from '@/lib/budget/budget.model';

export async function getActualBalance(): Promise<number> {
	return fetchWithAuth(`${BACKEND_URL}/calculate-balance`);
}

export async function getBudgetedSpent({
	year,
	month,
}: {
	year: number;
	month: number;
}): Promise<number> {
	return fetchWithAuth(`${BACKEND_URL}/calculate-budgeted-spent?year=${year}&month=${month}`);
}
