'use server';

import { ROUTES } from '@/lib/const';
import {
	PaginatedTransactions,
	Transaction,
	TRANSACTIONS_URL,
	validatePaginatedTransactions,
	validateTransactions,
} from '@/lib/transaction/transaction.model';
import { revalidatePath } from 'next/cache';
import { fetchInAction } from '@/lib/shared/api-server.utils';

export async function searchTransactions(
	query: string,
	page: number,
): Promise<PaginatedTransactions> {
	//spring data's pagination is zero-based
	const springDataPage = page - 1;
	const data = await fetchInAction(
		`${TRANSACTIONS_URL}/search?query=${query}&page=${springDataPage}`,
	);

	return validatePaginatedTransactions(data);
}

export async function getCurrentMonthTransactions({
	year,
	month,
}: {
	year: number;
	month: number;
}): Promise<Transaction[]> {
	const data = await fetchInAction(`${TRANSACTIONS_URL}/by-date?year=${year}&month=${month}`);
	return validateTransactions(data);
}

export async function addTransactionDB(
	transaction: Omit<Transaction, 'id'>,
	hasMutateFn: boolean = false,
) {
	const saved = fetchInAction(TRANSACTIONS_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(transaction),
	});

	if (!hasMutateFn) {
		revalidatePath(ROUTES.ROOT.path);
	}

	return saved;
}

export async function editTransactionDB(transaction: Transaction, hasMutateFn: boolean = false) {
	const saved = fetchInAction(`${TRANSACTIONS_URL}/${transaction.id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(transaction),
	});

	if (!hasMutateFn) {
		revalidatePath(ROUTES.ROOT.path);
	}

	return saved;
}

export async function deleteTransactionDB(id: number, hasMutateFn: boolean = false): Promise<void> {
	await fetchInAction(
		`${TRANSACTIONS_URL}/${id}`,
		{
			method: 'DELETE',
		},
		false,
	); // false = we don't expect JSON response

	if (!hasMutateFn) {
		revalidatePath(ROUTES.ROOT.path);
	}
}

export async function getTransactionsByDateDataset() {
	return fetchInAction(`${TRANSACTIONS_URL}/monthly-summary`);
}
