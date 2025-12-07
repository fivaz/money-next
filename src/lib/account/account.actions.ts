'use server';

import { type Account, ACCOUNTS_URL, validateAccounts } from '@/lib/account/account.model';
import { fetchWithAuth } from '@/lib/shared/api-server.utils';

export async function getAccounts(): Promise<Account[]> {
	const data = await fetchWithAuth(ACCOUNTS_URL);
	return validateAccounts(data);
}

export async function createAccountAction(account: Omit<Account, 'id'>) {
	return fetchWithAuth(ACCOUNTS_URL, {
		method: 'POST',
		body: JSON.stringify(account),
	});
}

export async function updateAccountAction(account: Account) {
	return fetchWithAuth(`${ACCOUNTS_URL}/${account.id}`, {
		method: 'PUT',
		body: JSON.stringify(account),
	});
}

export async function deleteAccountAction(id: number): Promise<void> {
	await fetchWithAuth(
		`${ACCOUNTS_URL}/${id}`,
		{
			method: 'DELETE',
		},
		false,
	); // false = we don't expect JSON response
}

export async function reorderAccounts(accounts: Account[]): Promise<void> {
	await fetchWithAuth(
		`${ACCOUNTS_URL}/reorder`,
		{
			method: 'PUT',
			body: JSON.stringify(accounts.map(({ id }) => ({ id }))),
		},
		false,
	);
}
