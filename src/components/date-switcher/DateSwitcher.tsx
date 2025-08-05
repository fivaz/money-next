'use client';
import { addMonths, format, isSameYear, subMonths } from 'date-fns';
import { Calendar1Icon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { ChangeEvent, useMemo, useRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getISODate, getParamsDate } from '@/lib/shared/date.utils';

type DateSwitcherClientProps = {};
export default function DateSwitcher({}: DateSwitcherClientProps) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [year, month] = getParamsDate(searchParams);

	const date = useMemo(() => new Date(year, month - 1), [year, month]);

	const dateInput = useRef<HTMLInputElement>(null);

	const formattedDate = useMemo(() => {
		if (isSameYear(date, new Date())) {
			return format(date, 'MMMM'); // e.g., "March"
		} else {
			return format(date, 'MMMM, yyyy'); // e.g., "March, 2025"
		}
	}, [date]);

	const handlePrevMonth = () => {
		const newDate = subMonths(date, 1);
		changeRoute(newDate);
	};

	const handleNextMonth = () => {
		const newDate = addMonths(date, 1);
		changeRoute(newDate);
	};

	const changeRoute = (date: Date) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set('year', date.getFullYear().toString());
		params.set('month', (date.getMonth() + 1).toString());

		router.push(`${pathname}?${params.toString()}`);
	};

	const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newDate = new Date(e.target.value);
		if (!isNaN(newDate.getTime())) {
			changeRoute(newDate);
		}
	};

	const showDatePicker = () => {
		if (dateInput.current) {
			dateInput.current.showPicker();
		}
	};

	return (
		<div className="relative flex items-center shadow-xs md:items-stretch">
			<button
				onClick={handlePrevMonth}
				type="button"
				className="flex h-11 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 bg-white pr-1 text-gray-400 hover:text-gray-500 focus:relative md:h-9 md:w-9 md:pr-0 md:hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-400"
			>
				<ChevronLeftIcon className="size-5" />
			</button>
			<button
				onClick={showDatePicker}
				type="button"
				className="flex h-11 items-center gap-2 border-y border-gray-300 bg-white text-sm font-semibold text-gray-900 hover:bg-gray-50 hover:text-gray-500 focus:relative md:h-9 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-400"
			>
				<Calendar1Icon className="size-4" aria-hidden="true" />
				{formattedDate}
			</button>
			<input
				ref={dateInput}
				type="date"
				value={getISODate(date)}
				onChange={(e) => handleDateChange(e)}
				className="pointer-events-none absolute opacity-0"
			/>
			<button
				onClick={handleNextMonth}
				type="button"
				className="flex h-11 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 bg-white pl-1 text-gray-400 hover:text-gray-500 focus:relative md:h-9 md:w-9 md:pl-0 md:hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-400"
			>
				<span className="sr-only">Next month</span>
				<ChevronRightIcon className="size-5" aria-hidden="true" />
			</button>
		</div>
	);
}
