import { Account } from '@/lib/account/account.model';
import type { Transaction } from '@/lib/transaction/transaction.model';
import { useMemo } from 'react';

export const buildAccount = (formData: FormData): Account => {
	return {
		id: Number(formData.get('id')),
		name: formData.get('name') as string,
		icon: formData.get('icon') as string,
		sortOrder: Number(formData.get('sortOrder')) ?? 10000,
	};
};

export const sortAccounts = (a: Account, b: Account) =>
	a.sortOrder - b.sortOrder;
