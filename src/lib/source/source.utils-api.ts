import useSWR from 'swr';
import { fetcher } from '@/lib/shared/api-client.utils';

export const BALANCE_URL = `api/balance`;

export const useActualBalance = () => {
	const { data } = useSWR<number>(BALANCE_URL, fetcher);
	return data || 0;
};
