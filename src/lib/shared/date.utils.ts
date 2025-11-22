import { format, formatDate, lastDayOfMonth, parse, parseISO, set } from 'date-fns';
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';

export const DATE_FORMAT = "yyyy-MM-dd'T'HH:mm";

export const isoToInputFormat = (isoDate: string) => format(parseISO(isoDate), DATE_FORMAT);

export const dateToInputFormat = (date: Date = new Date()) => format(date, DATE_FORMAT);

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

export const ISO_DATE = 'yyyy-MM-dd';

export const FR_DATE = 'dd/MM/yyyy';

export const getISODate = (date: Date) => formatDate(date, ISO_DATE);

export const parseISODate = (dateString: string) => parse(dateString, ISO_DATE, new Date());

export const formatFRDate = (dateString: string) =>
	formatDate(parse(dateString, ISO_DATE, new Date()), FR_DATE);
