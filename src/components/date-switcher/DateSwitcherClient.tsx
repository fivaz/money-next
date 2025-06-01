'use client';
import { addMonths, format, isSameYear, subMonths } from 'date-fns';
import { atom } from 'jotai';
import { Calendar1Icon, ChevronLeft, ChevronRight } from 'lucide-react';
import { ChangeEvent, useMemo, useRef } from 'react';
import MoneyText from '@/components/MoneyText';
import { Button } from '@/components/base/button';
import { Heading, Subheading } from '@/components/base/heading';
import { Skeleton } from '@/components/Skeleton';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const currentDateAtom = atom(new Date());

type DateSwitcherClientProps = {
	actualBalance: number;
	isLoading?: boolean;
};
export default function DateSwitcherClient({
	actualBalance,
	isLoading = false,
}: DateSwitcherClientProps) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const currentYear = Number(searchParams.get('year')) || new Date().getFullYear();
	const currentMonth = Number(searchParams.get('month')) || new Date().getMonth() + 1;

	const date = useMemo(() => new Date(currentYear, currentMonth - 1), [currentYear, currentMonth]);

	const dateInput = useRef<HTMLInputElement>(null);

	// Mock data for balance; replace with actual data source
	const expectedBalance = 1000; // Example value
	const balanceDifference = expectedBalance - actualBalance;
	const balanceClass = balanceDifference >= 0 ? 'text-green-500' : 'text-red-500';

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

	// Convert date to ISO format for input (YYYY-MM-DD)
	const getISODate = () => {
		return format(date, 'yyyy-MM-dd');
	};

	return (
		<div className="flex items-center justify-between gap-3 p-3">
			<Button outline onClick={handlePrevMonth}>
				<ChevronLeft className="size-7" />
			</Button>
			<div className="flex flex-col items-center">
				<div className="flex items-center justify-center gap-2">
					<Heading>{formattedDate}</Heading>
					<Button outline size="p-1" className="focus:outline-none" onClick={showDatePicker}>
						<Calendar1Icon
							className="size-4 text-yellow-500 dark:text-yellow-400"
							aria-hidden="true"
						/>
					</Button>
					<input
						ref={dateInput}
						type="date"
						value={getISODate()}
						onChange={(e) => handleDateChange(e)}
						className="pointer-events-none absolute opacity-0"
					/>
				</div>
				<div className="flex items-center gap-2">
					<Subheading>
						{isLoading ? <Skeleton /> : <MoneyText>{actualBalance}</MoneyText>}
					</Subheading>
					<Subheading>
						(
						{isLoading ? (
							<Skeleton />
						) : (
							<MoneyText className={balanceClass}>{balanceDifference}</MoneyText>
						)}
						)
					</Subheading>
				</div>
			</div>
			<Button outline onClick={handleNextMonth}>
				<ChevronRight className="size-7" />
			</Button>
		</div>
	);
}
