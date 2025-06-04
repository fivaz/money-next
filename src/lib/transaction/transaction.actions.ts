'use server';

import { ROUTES } from '@/lib/const';
import {
	Transaction,
	TRANSACTIONS_URL,
	validateTransactions,
} from '@/lib/transaction/transaction.model';
import { revalidatePath } from 'next/cache';
import { fetchWithAuth } from '@/lib/shared/api-server.utils';

export async function getCurrentMonthTransactions({
	year,
	month,
}: {
	year: number;
	month: number;
}): Promise<Transaction[]> {
	const data = await fetchWithAuth(`${TRANSACTIONS_URL}/by-date?year=${year}&month=${month}`);
	return validateTransactions(data);
}

export async function saveTransaction(transaction: Transaction) {
	const method = transaction.id ? 'PUT' : 'POST';
	const url = transaction.id ? `${TRANSACTIONS_URL}/${transaction.id}` : TRANSACTIONS_URL;

	const saved = fetchWithAuth(url, {
		method,
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(transaction),
	});

	revalidatePath(ROUTES.ROOT.path);

	return saved;
}

export async function deleteTransaction(id: number): Promise<void> {
	await fetchWithAuth(
		`${TRANSACTIONS_URL}/${id}`,
		{
			method: 'DELETE',
		},
		false,
	); // false = we don't expect JSON response

	revalidatePath(ROUTES.ROOT.path);
}
