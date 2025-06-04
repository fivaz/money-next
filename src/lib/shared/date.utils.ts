import { format, lastDayOfMonth, set } from 'date-fns';
import { ReadonlyURLSearchParams } from 'next/navigation';

export const DATE_FORMAT = "yyyy-MM-dd'T'HH:mm";

export const formatForInput = (date: Date = new Date()) => format(date, DATE_FORMAT);

export const getParamsDate = (searchParams: ReadonlyURLSearchParams) => {
	const year = Number(searchParams.get('year')) || new Date().getFullYear();
	const month = Number(searchParams.get('month')) || new Date().getMonth() + 1;

	return [year, month];
};

export const buildDate = (year: number, month: number): Date => {
	// add current day to month and year
	const baseDate = new Date(year, month - 1, 1);
	const maxDay = lastDayOfMonth(baseDate).getDate();
	const clampedDay = Math.min(new Date().getDate(), maxDay);

	return set(baseDate, { date: clampedDay });
};
