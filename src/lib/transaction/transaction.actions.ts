'use server';

import {
	PaginatedTransactions,
	type Transaction,
	TRANSACTIONS_URL,
	validatePaginatedTransactions,
} from '@/lib/transaction/transaction.model';
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

export async function createTransactionAction(transaction: Omit<Transaction, 'id'>) {
	return fetchInAction(TRANSACTIONS_URL, {
		method: 'POST',
		body: JSON.stringify(transaction),
	});
}

export async function updateTransactionAction(transaction: Transaction) {
	return fetchInAction(`${TRANSACTIONS_URL}/${transaction.id}`, {
		method: 'PUT',
		body: JSON.stringify(transaction),
	});
}

export async function deleteTransactionAction(id: number): Promise<void> {
	await fetchInAction(
		`${TRANSACTIONS_URL}/${id}`,
		{
			method: 'DELETE',
		},
		false,
	); // false = we don't expect JSON response
}

export async function getTransactionsByDateDataset() {
	return fetchInAction(`${TRANSACTIONS_URL}/monthly-summary`);
}
