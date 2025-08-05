import { SOURCES_URL } from '@/lib/source/source.model';
import useSWR from 'swr';
import { fetcher } from '@/lib/shared/api-client.utils';
import { BACKEND_URL } from '@/lib/const';

export const BALANCE_URL = `${BACKEND_URL}/calculate-balance`;

export const EXPECTED_BALANCE_URL = `${SOURCES_URL}/expected-balance`;

export const fetchActualBalance = () => {
	const { data } = useSWR<number>(BALANCE_URL, fetcher);
	return data || 0;
};

export const fetchExpectedBalance = () => {
	const { data } = useSWR<number>(EXPECTED_BALANCE_URL, fetcher);
	return data || 0;
};
