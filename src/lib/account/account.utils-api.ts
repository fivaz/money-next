import { API } from '@/lib/const';
import useSWR, { mutate } from 'swr';
import { Account } from '@/lib/account/account.model';
import { fetcher } from '@/lib/shared/api-client.utils';

const getAccountsUrl = () => `/api/${API.ACCOUNTS}`;

export const useAccounts = () => {
	const { data: accountsData, isLoading } = useSWR<Account[]>(getAccountsUrl(), fetcher);

	const accounts = accountsData || [];

	return { accounts, isLoading };
};

export const mutateAccounts = () => {
	void mutate(getAccountsUrl());
};
