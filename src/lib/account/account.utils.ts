import { Account } from '@/lib/account/account.model';
import type { Transaction } from '@/lib/transaction/transaction.model';
import { useMemo } from 'react';
import useSWR from 'swr';
import { API } from '@/lib/const';
import { fetcher } from '@/lib/shared/api-client.utils';

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

export const fetchAccounts = () => {
	const { data: accountsData, isLoading } = useSWR<Account[]>(
		`/api/${API.ACCOUNTS}`,
		fetcher,
	);

	const accounts = accountsData || [];

	return { accounts, isLoading };
};
