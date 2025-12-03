import { format, formatDate, parse, parseISO } from 'date-fns';
import { setHours, setMinutes, setSeconds } from 'date-fns';

export const DATE_FORMAT = "yyyy-MM-dd'T'HH:mm";

export const isoToInputFormat = (isoDate: string) => format(parseISO(isoDate), DATE_FORMAT);

export const dateToInputFormat = (date: Date = new Date()) => format(date, DATE_FORMAT);

export const ISO_DATE = 'yyyy-MM-dd';

export const FR_DATE = 'dd/MM/yyyy';

export const getISODate = (date: Date) => formatDate(date, ISO_DATE);

export const parseISODate = (dateString: string) => parse(dateString, ISO_DATE, new Date());

export const formatFRDate = (dateString: string) =>
	formatDate(parse(dateString, ISO_DATE, new Date()), FR_DATE);

export function toIsoAtNoon(dateString: string) {
	// Parse the YYYY-MM-DD string into a Date
	let date = parseISODate(dateString);

	// Set the time to 12:00 PM
	date = setHours(date, 12);
	date = setMinutes(date, 0);
	date = setSeconds(date, 0);

	return date.toISOString();
}
