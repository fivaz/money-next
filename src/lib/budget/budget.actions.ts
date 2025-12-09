'use server';

import { API, ROUTES } from '@/lib/const';
import { type Budget, validateBudgets } from '@/lib/budget/budget.model';
import { revalidatePath } from 'next/cache';
import { fetchAPI } from '@/lib/shared/api.utils.actions';

export async function getBudgets(): Promise<Budget[]> {
	const data = await fetchAPI(API.BUDGETS);
	return validateBudgets(data);
}

export async function getCurrentMonthBudgets(asOf: string): Promise<Budget[]> {
	const data = await fetchAPI(`${API.BUDGETS}/?asOf=${asOf}`);
	return validateBudgets(data);
}

export async function getCurrentMonthBudgetsWithDetails(asOf: string): Promise<Budget[]> {
	const data = await fetchAPI(`${API.BUDGETS}/with-carry-over?asOf=${asOf}`);
	return validateBudgets(data);
}

export async function addBudgetDB(budget: Omit<Budget, 'id'>) {
	const saved = fetchAPI(API.BUDGETS, {
		method: 'POST',
		body: JSON.stringify(budget),
	});

	revalidatePath(ROUTES.BUDGETS.path);

	return saved;
}

export async function editBudgetDB(budget: Budget) {
	const saved = fetchAPI(`${API.BUDGETS}/${budget.id}`, {
		method: 'PUT',
		body: JSON.stringify(budget),
	});

	revalidatePath(ROUTES.BUDGETS.path);

	return saved;
}

export async function deleteBudgetDB(id: number): Promise<void> {
	await fetchAPI(`${API.BUDGETS}/${id}`, {
		method: 'DELETE',
	});

	revalidatePath(ROUTES.BUDGETS.path);
}

export async function reorderBudgets(budgets: Budget[]): Promise<void> {
	await fetchAPI(`${API.BUDGETS}/reorder`, {
		method: 'PUT',
		body: JSON.stringify(budgets.map(({ id }) => ({ id }))),
	});

	revalidatePath(ROUTES.BUDGETS.path);
}
