'use server';

import {
	type Account,
	ACCOUNTS_URL,
	validateAccounts,
} from '@/lib/account/account.model';
import { fetchInAction } from '@/lib/shared/api-server.utils';

export async function getAccounts(): Promise<Account[]> {
	const data = await fetchInAction(ACCOUNTS_URL);
	return validateAccounts(data);
}

export async function createAccountAction(account: Omit<Account, 'id'>) {
	return fetchInAction(ACCOUNTS_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(account),
	});
}

export async function updateAccountAction(account: Account) {
	return fetchInAction(`${ACCOUNTS_URL}/${account.id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(account),
	});
}

export async function deleteAccountAction(id: number): Promise<void> {
	await fetchInAction(
		`${ACCOUNTS_URL}/${id}`,
		{
			method: 'DELETE',
		},
		false,
	); // false = we don't expect JSON response
}

export async function reorderAccounts(accounts: Account[]): Promise<void> {
	await fetchInAction(
		`${ACCOUNTS_URL}/reorder`,
		{
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(accounts.map(({ id }) => ({ id }))),
		},
		false,
	);
}
