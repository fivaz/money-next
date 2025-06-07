'use server';

import { ROUTES } from '@/lib/const';
import {
	Transaction,
	TRANSACTIONS_URL,
	validateTransactions,
} from '@/lib/transaction/transaction.model';
import { revalidatePath } from 'next/cache';
import { fetchWithAuth } from '@/lib/shared/api-server.utils';

export async function searchTransactions(query: string): Promise<Transaction[]> {
	const data = await fetchWithAuth(`${TRANSACTIONS_URL}/search?query=${query}`);
	return validateTransactions(data);
}

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

export async function addTransactionDB(transaction: Omit<Transaction, 'id'>) {
	const saved = fetchWithAuth(TRANSACTIONS_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(transaction),
	});

	revalidatePath(ROUTES.ROOT.path);

	return saved;
}

export async function editTransactionDB(transaction: Transaction) {
	const saved = fetchWithAuth(`${TRANSACTIONS_URL}/${transaction.id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(transaction),
	});

	revalidatePath(ROUTES.ROOT.path);

	return saved;
}

export async function deleteTransactionDB(id: number): Promise<void> {
	await fetchWithAuth(
		`${TRANSACTIONS_URL}/${id}`,
		{
			method: 'DELETE',
		},
		false,
	); // false = we don't expect JSON response

	revalidatePath(ROUTES.ROOT.path);
}
