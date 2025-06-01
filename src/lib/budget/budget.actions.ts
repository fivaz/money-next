'use server';

import { cookies } from 'next/headers';
import { BACKEND_URL } from '@/lib/const';
import {
	type BudgetWithTransactions,
	validateBudgetsWithTransactions,
} from '@/lib/budget/budget-transaction.model';
import { type Budget } from '@/lib/budget/budget.model';

const BudgetRoute = `${BACKEND_URL}/budgets`;

export async function getBudgets(): Promise<BudgetWithTransactions[]> {
	const token = (await cookies()).get('firebase_token')?.value;

	if (!token) throw new Error('User not authenticated');

	const now = new Date();
	const month = now.getMonth() + 1; // JS months are 0-indexed
	const year = now.getFullYear();

	const res = await fetch(`${BudgetRoute}/current-month?year=${year}&month=${month}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
		cache: 'no-store',
	});

	if (!res.ok) {
		const message = await res.text();
		throw new Error(`Failed to fetch budgets: ${message}`);
	}

	const data = await res.json();
	console.log(data);
	return validateBudgetsWithTransactions(data);
}

export async function saveBudget(budget: Budget, isEditing: boolean) {
	const token = (await cookies()).get('firebase_token')?.value;

	if (!token) throw new Error('User not authenticated');

	const method = isEditing ? 'PUT' : 'POST';

	const url = isEditing ? `${BudgetRoute}/${budget.id}` : BudgetRoute;

	const res = await fetch(url, {
		method,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(budget),
	});

	if (!res.ok) {
		let errorMsg = 'Failed to save budget';
		try {
			errorMsg = await res.text(); // or use `await res.json()` if your backend sends structured errors
		} catch (err) {
			console.error('Error reading error message:', err);
		}
		console.error('Save failed:', res.status, errorMsg);
		throw new Error(errorMsg);
	}

	return await res.json();
}

export async function deleteBudget(id: number): Promise<void> {
	const token = (await cookies()).get('firebase_token')?.value;
	if (!token) throw new Error('Not authenticated');

	const res = await fetch(`${BudgetRoute}/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!res.ok) {
		const msg = await res.text();
		throw new Error(`Delete failed: ${msg}`);
	}
}
