'use server';

import { cookies } from 'next/headers';
import { BACKEND_URL, ROUTES } from '@/lib/const';
import { Transaction, validateTransactions } from '@/lib/transaction/transaction.model';
import { revalidatePath } from 'next/cache';

const TransactionRoute = `${BACKEND_URL}/transactions`;

export async function getCurrentMonthTransactions({
	year,
	month,
}: {
	year: number;
	month: number;
}): Promise<Transaction[]> {
	const token = (await cookies()).get('firebase_token')?.value;

	if (!token) throw new Error('User not authenticated');

	const res = await fetch(`${TransactionRoute}/by-date?year=${year}&month=${month}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
		cache: 'no-store',
	});

	if (!res.ok) {
		const message = await res.text();
		throw new Error(`Failed to fetch transactions: ${message}`);
	}

	const data = await res.json();
	console.log(data);
	return validateTransactions(data);
}

export async function saveTransaction(transaction: Transaction, isEditing: boolean) {
	const token = (await cookies()).get('firebase_token')?.value;

	if (!token) throw new Error('User not authenticated');

	const method = isEditing ? 'PUT' : 'POST';

	const url = isEditing ? `${TransactionRoute}/${transaction.id}` : TransactionRoute;

	const res = await fetch(url, {
		method,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(transaction),
	});

	if (!res.ok) {
		let errorMsg = 'Failed to save transaction';
		try {
			errorMsg = await res.text(); // or use `await res.json()` if your backend sends structured errors
		} catch (err) {
			console.error('Error reading error message:', err);
		}
		console.error('Save failed:', res.status, errorMsg);
		throw new Error(errorMsg);
	}

	const saved = await res.json();
	revalidatePath(ROUTES.ROOT.path);
	return saved;
}

export async function deleteTransaction(id: number): Promise<void> {
	const token = (await cookies()).get('firebase_token')?.value;
	if (!token) throw new Error('Not authenticated');

	const res = await fetch(`${TransactionRoute}/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!res.ok) {
		const msg = await res.text();
		throw new Error(`Delete failed: ${msg}`);
	}

	revalidatePath(ROUTES.ROOT.path);
}
