'use client';
import { addMonths, format, isSameYear, subMonths } from 'date-fns';
import { Button } from '../base/button';
import { atom, useAtom } from 'jotai';
import { Calendar1Icon, ChevronLeft, ChevronRight } from 'lucide-react';
import { ChangeEvent, useMemo, useRef } from 'react';
import { Text } from '@/components/base/text';
import MoneyText from '@/components/MoneyText';

// Define the atom for current date
export const currentDateAtom = atom(new Date());

export default function DateSwitcher() {
	const [date, setDate] = useAtom(currentDateAtom);
	const dateInput = useRef<HTMLInputElement>(null);

	// Mock data for balance; replace with actual data source
	const expectedBalance = 1000; // Example value
	const balanceDifference = 50; // Example value
	const balanceClass = balanceDifference >= 0 ? 'text-green-500' : 'text-red-500';

	const formattedDate = useMemo(() => {
		if (isSameYear(date, new Date())) {
			return format(date, 'MMMM'); // e.g., "March"
		} else {
			return format(date, 'MMMM, yyyy'); // e.g., "March, 2025"
		}
	}, [date]);

	const handlePrevMonth = () => {
		setDate((prevDate) => subMonths(prevDate, 1));
	};

	const handleNextMonth = () => {
		setDate((prevDate) => addMonths(prevDate, 1));
	};

	const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newDate = new Date(e.target.value);
		if (!isNaN(newDate.getTime())) {
			setDate(newDate);
		}
	};

	const showDatePicker = () => {
		if (dateInput.current) {
			dateInput.current.showPicker();
		}
	};

	// Convert date to ISO format for input (YYYY-MM-DD)
	const getISODate = () => {
		return format(date, 'yyyy-MM-dd');
	};

	return (
		<div className="flex items-center justify-between gap-3 p-3">
			<Button onClick={handlePrevMonth}>
				<ChevronLeft className="size-7" />
			</Button>
			<div className="flex flex-col items-center">
				<div className="flex items-center justify-center gap-2">
					<Text>{formattedDate}</Text>
					<Button size="p-1" className="focus:outline-none" onClick={showDatePicker}>
						<Calendar1Icon
							className="size-4 text-yellow-500 dark:text-yellow-400"
							aria-hidden="true"
						/>
					</Button>
					<input
						ref={dateInput}
						type="date"
						value={getISODate()}
						onChange={(e) => handleDateChange}
						className="pointer-events-none absolute opacity-0"
					/>
				</div>
				<div className="flex items-center gap-2">
					<Text>
						<MoneyText>{expectedBalance}</MoneyText>
					</Text>
					<Text>
						( <MoneyText className={balanceClass}>{balanceDifference}</MoneyText> )
					</Text>
				</div>
			</div>
			<Button onClick={handleNextMonth}>
				<ChevronRight className="size-7" />
			</Button>
		</div>
	);
}
