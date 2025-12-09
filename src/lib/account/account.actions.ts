'use server';

import { type Account, validateAccounts } from '@/lib/account/account.model';
import { fetchAPI } from '@/lib/shared/api.utils.actions';
import { API } from '@/lib/const';

export async function getAccounts(): Promise<Account[]> {
	const data = await fetchAPI(API.ACCOUNTS);
	return validateAccounts(data);
}

export async function createAccountAction(account: Omit<Account, 'id'>) {
	return fetchAPI(API.ACCOUNTS, {
		method: 'POST',
		body: JSON.stringify(account),
	});
}

export async function updateAccountAction(account: Account) {
	return fetchAPI(`${API.ACCOUNTS}/${account.id}`, {
		method: 'PUT',
		body: JSON.stringify(account),
	});
}

export async function deleteAccountAction(id: number): Promise<void> {
	await fetchAPI(`${API.ACCOUNTS}/${id}`, {
		method: 'DELETE',
	});
}

export async function reorderAccounts(accounts: Account[]): Promise<void> {
	await fetchAPI(`${API.ACCOUNTS}/reorder`, {
		method: 'PUT',
		body: JSON.stringify(accounts.map(({ id }) => ({ id }))),
	});
}
