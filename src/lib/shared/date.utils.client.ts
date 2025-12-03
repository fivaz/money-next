import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
import { getISODate } from '@/lib/shared/date.utils';

export const getParamsDate = (searchParams: ReadonlyURLSearchParams): [number, number, string] => {
	const currentDate = new Date();
	const year = Number(searchParams.get('year')) || currentDate.getFullYear();
	const month = Number(searchParams.get('month')) || currentDate.getMonth() + 1;
	const date = searchParams.get('asOf') || getISODate(currentDate);

	return [year, month, date];
};
export const useYearMonth = (): [number, number, string] => {
	const searchParams = useSearchParams();
	return getParamsDate(searchParams);
};
