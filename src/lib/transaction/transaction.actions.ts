'use server';

import {
	PaginatedTransactions,
	type Transaction,
	validatePaginatedTransactions,
} from '@/lib/transaction/transaction.model';
import { fetchAPI } from '@/lib/shared/api.utils.actions';
import { API } from '@/lib/const';

export async function searchTransactions(
	query: string,
	page: number,
): Promise<PaginatedTransactions> {
	//spring data's pagination is zero-based
	const springDataPage = page - 1;
	const data = await fetchAPI(`${API.TRANSACTIONS}/search?query=${query}&page=${springDataPage}`);

	return validatePaginatedTransactions(data);
}

export async function createTransactionAction(transaction: Omit<Transaction, 'id'>) {
	return fetchAPI(API.TRANSACTIONS, {
		method: 'POST',
		body: JSON.stringify(transaction),
	});
}

export async function updateTransactionAction(transaction: Transaction) {
	return fetchAPI(`${API.TRANSACTIONS}/${transaction.id}`, {
		method: 'PUT',
		body: JSON.stringify(transaction),
	});
}

export async function deleteTransactionAction(id: number): Promise<void> {
	return fetchAPI(`${API.TRANSACTIONS}/${id}`, {
		method: 'DELETE',
	});
}

export async function getTransactionsByDateDataset() {
	return fetchAPI(`${API.TRANSACTIONS}/monthly-summary`);
}
