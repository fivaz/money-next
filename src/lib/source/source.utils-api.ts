import useSWR from 'swr';
import { fetcher } from '@/lib/shared/api-client.utils';
import { getParamsDate } from '@/lib/shared/date.utils';
import { dateParams } from '@/lib/const';

export const BALANCE_URL = `api/balance`;

export const getBudgetedSpentUrl = (year: number, month: number) =>
	`api/budgeted-spent?${dateParams(year, month)}`;

export const useActualBalance = () => {
	const { data } = useSWR<number>(BALANCE_URL, fetcher);
	return data || 0;
};

export const useBudgetedSpent = (year: number, month: number) => {
	const { data } = useSWR<number>(getBudgetedSpentUrl(year, month), fetcher);
	return data || 0;
};
