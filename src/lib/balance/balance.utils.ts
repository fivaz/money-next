import useSWR from 'swr';
import { fetcher } from '@/lib/shared/api-client.utils';
import { dateParams } from '@/lib/const';

export const BALANCE_URL = `api/balance`;
export const UNPAID_BALANCE_URL = `${BALANCE_URL}/unpaid`;

export const getActualBalanceUrl = (asOf: string) => `${BALANCE_URL}?asOf=${asOf}`;

export const useActualBalance = (asOf: string) => {
	const { data } = useSWR<number>(getActualBalanceUrl(asOf), fetcher);
	return data || 0;
};

export const useActualUnpaidBalance = () => {
	const { data } = useSWR<number>(UNPAID_BALANCE_URL, fetcher);
	return data || 0;
};

export const getBudgetedSpentUrl = (year: number, month: number) =>
	`api/budgeted-spent?${dateParams(year, month)}`;

export const useBudgetedSpent = (year: number, month: number) => {
	const { data } = useSWR<number>(getBudgetedSpentUrl(year, month), fetcher);
	return data || 0;
};
