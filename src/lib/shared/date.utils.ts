import { format, formatDate, lastDayOfMonth, parse, parseISO, set } from 'date-fns';
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';

export const DATE_FORMAT = "yyyy-MM-dd'T'HH:mm";

export const isoToInputFormat = (isoDate: string) => format(parseISO(isoDate), DATE_FORMAT);

export const dateToInputFormat = (date: Date = new Date()) => format(date, DATE_FORMAT);

export const getParamsDate = (searchParams: ReadonlyURLSearchParams) => {
	const year = Number(searchParams.get('year')) || new Date().getFullYear();
	const month = Number(searchParams.get('month')) || new Date().getMonth() + 1;

	return [year, month];
};

export const useYearMonth = () => {
	const searchParams = useSearchParams();
	return getParamsDate(searchParams);
};

export const buildDate = (year: number, month: number): Date => {
	// add current day to month and year
	const baseDate = new Date(year, month - 1, 1);
	const maxDay = lastDayOfMonth(baseDate).getDate();
	const clampedDay = Math.min(new Date().getDate(), maxDay);

	return set(baseDate, { date: clampedDay, hours: 12 });
};

export const ISO_DATE = 'yyyy-MM-dd';

export const FR_DATE = 'dd/MM/yyyy';

export const getISODate = (date: Date) => formatDate(date, ISO_DATE);

export const formatFRDate = (dateString: string) =>
	formatDate(parse(dateString, ISO_DATE, new Date()), FR_DATE);
