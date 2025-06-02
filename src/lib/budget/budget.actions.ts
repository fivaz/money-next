'use server';

import { ROUTES } from '@/lib/const';
import { type Budget, BUDGETS_URL, validateBudgets } from '@/lib/budget/budget.model';
import { revalidatePath } from 'next/cache';
import { fetchWithAuth } from '@/lib/shared/api-server.utils';

export async function getBudgets(): Promise<Budget[]> {
	const data = await fetchWithAuth(BUDGETS_URL);
	return validateBudgets(data);
}

export async function saveBudget(budget: Budget, isEditing: boolean) {
	const method = isEditing ? 'PUT' : 'POST';
	const url = isEditing ? `${BUDGETS_URL}/${budget.id}` : BUDGETS_URL;

	return fetchWithAuth(url, {
		method,
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(budget),
	});
}

export async function deleteBudget(id: number): Promise<void> {
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
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(budgets.map(({ id }) => ({ id }))),
		},
		false,
	);

	revalidatePath(ROUTES.BUDGETS.path);
}
