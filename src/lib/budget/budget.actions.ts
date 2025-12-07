'use server';

import { ROUTES } from '@/lib/const';
import { type Budget, BUDGETS_URL, validateBudgets } from '@/lib/budget/budget.model';
import { revalidatePath } from 'next/cache';
import { fetchWithAuth } from '@/lib/shared/api-server.utils';

export async function getBudgets(): Promise<Budget[]> {
	const data = await fetchWithAuth(BUDGETS_URL);
	return validateBudgets(data);
}

export async function getCurrentMonthBudgets(asOf: string): Promise<Budget[]> {
	const data = await fetchWithAuth(`${BUDGETS_URL}/?asOf=${asOf}`);
	return validateBudgets(data);
}

export async function getCurrentMonthBudgetsWithDetails(asOf: string): Promise<Budget[]> {
	const data = await fetchWithAuth(`${BUDGETS_URL}/with-carry-over?asOf=${asOf}`);
	return validateBudgets(data);
}

export async function addBudgetDB(budget: Omit<Budget, 'id'>) {
	const saved = fetchWithAuth(BUDGETS_URL, {
		method: 'POST',
		body: JSON.stringify(budget),
	});

	revalidatePath(ROUTES.BUDGETS.path);

	return saved;
}

export async function editBudgetDB(budget: Budget) {
	const saved = fetchWithAuth(`${BUDGETS_URL}/${budget.id}`, {
		method: 'PUT',
		body: JSON.stringify(budget),
	});

	revalidatePath(ROUTES.BUDGETS.path);

	return saved;
}

export async function deleteBudgetDB(id: number): Promise<void> {
	await fetchWithAuth(
		`${BUDGETS_URL}/${id}`,
		{
			method: 'DELETE',
		},
		false,
	); // false = we don't expect JSON response

	revalidatePath(ROUTES.BUDGETS.path);
}

export async function reorderBudgets(budgets: Budget[]): Promise<void> {
	await fetchWithAuth(
		`${BUDGETS_URL}/reorder`,
		{
			method: 'PUT',
			body: JSON.stringify(budgets.map(({ id }) => ({ id }))),
		},
		false,
	);

	revalidatePath(ROUTES.BUDGETS.path);
}
