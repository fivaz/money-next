import useSWR from 'swr';
import { fetcher } from '@/lib/shared/api-client.utils';

export const BALANCE_URL = `api/balance`;

export const getBudgetedSpentUrl = (year: number, month: number) =>
	`api/budgeted-spent?year=${year}&month=${month}`;

export const useActualBalance = () => {
	const { data } = useSWR<number>(BALANCE_URL, fetcher);
	return data || 0;
};

export const useBudgetedSpent = (year: number, month: number) => {
	const { data } = useSWR<number>(getBudgetedSpentUrl(year, month), fetcher);
	return data || 0;
};
