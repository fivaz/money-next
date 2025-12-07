import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
import { getISODate } from '@/lib/shared/date.utils';

export const getParamsDate = (searchParams: ReadonlyURLSearchParams): string => {
	const currentDate = new Date();
	return searchParams.get('asOf') || getISODate(currentDate);
};

export const useAsOf = (): string => {
	const searchParams = useSearchParams();
	return getParamsDate(searchParams);
};
