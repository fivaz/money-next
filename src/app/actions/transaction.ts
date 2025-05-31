'use server';

import { cookies } from 'next/headers';
import { BACKEND_URL } from '@/lib/const';
import {
	Transaction,
	TransactionSchema,
	validateTransactions,
} from '@/lib/transaction/transaction.model';
import z from 'zod';

const TransactionRoute = `${BACKEND_URL}/transactions`;

export async function getCurrentMonthTransactions(): Promise<Transaction[]> {
	const token = (await cookies()).get('firebase_token')?.value;

	if (!token) throw new Error('User not authenticated');

	const now = new Date();
	const month = now.getMonth() + 1; // JS months are 0-indexed
	const year = now.getFullYear();

	const res = await fetch(`${TransactionRoute}/current-month?year=${year}&month=${month}`, {
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

export async function saveTransaction(formData: FormData) {
	const token = (await cookies()).get('firebase_token')?.value;

	if (!token) throw new Error('User not authenticated');

	const payload = {
		id: formData.get('id') || '',
		description: formData.get('description'),
		amount: parseFloat(formData.get('amount') as string),
		date: formData.get('date'),
		isPaid: formData.get('isPaid') === 'on',
		referenceDate: formData.get('referenceDate'),
	};

	const method = payload.id ? 'PUT' : 'POST';

	const url = payload.id ? `${TransactionRoute}/${payload.id}` : TransactionRoute;

	const res = await fetch(url, {
		method,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(payload),
	});

	if (!res.ok) {
		const msg = await res.text();
		throw new Error(`Failed to save transaction: ${msg}`);
	}

	return await res.json();
}
