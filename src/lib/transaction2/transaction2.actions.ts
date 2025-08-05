'use server';

import {
	type Transaction,
	TRANSACTIONS_URL,
	validateTransactions,
} from '@/lib/transaction/transaction.model';
import { fetchInAction } from '@/lib/shared/api-server.utils';
import { ACCOUNTS_URL } from '@/lib/account/account.model';

export async function createTransactionAction(
	transaction: Omit<Transaction, 'id'>,
) {
	return fetchInAction(TRANSACTIONS_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(transaction),
	});
}

export async function updateTransactionAction(transaction: Transaction) {
	return fetchInAction(`${TRANSACTIONS_URL}/${transaction.id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
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
