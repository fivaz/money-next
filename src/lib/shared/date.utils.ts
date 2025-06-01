import { format } from 'date-fns';

export const DATE_FORMAT = "yyyy-MM-dd'T'HH:mm";

export const formatForInput = (date: Date = new Date()) => format(date, DATE_FORMAT);
