'use client';
import { format, isSameYear } from 'date-fns';
import { Calendar1Icon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useMemo } from 'react';
import { Button } from '@/components/base/button';
import { Heading } from '@/components/base/heading';
import { Skeleton } from '@/components/Skeleton';

type DateSwitcherClientProps = {};
export default function DateSwitcherSkeleton({}: DateSwitcherClientProps) {
	const currentYear = new Date().getFullYear();
	const currentMonth = new Date().getMonth() + 1;

	const date = useMemo(() => new Date(currentYear, currentMonth - 1), [currentYear, currentMonth]);

	const formattedDate = useMemo(() => {
		if (isSameYear(date, new Date())) {
			return format(date, 'MMMM'); // e.g., "March"
		} else {
			return format(date, 'MMMM, yyyy'); // e.g., "March, 2025"
		}
	}, [date]);

	return (
		<div className="flex items-center justify-between gap-3 p-3">
			<Button outline disabled>
				<ChevronLeft className="size-7" />
			</Button>
			<div className="flex flex-col items-center">
				<div className="flex items-center justify-center gap-2">
					<Heading>{formattedDate}</Heading>
					<Button outline size="p-1" className="focus:outline-none" disabled>
						<Calendar1Icon
							className="size-4 text-yellow-500 dark:text-yellow-400"
							aria-hidden="true"
						/>
					</Button>
				</div>
				<div className="flex items-center gap-2">
					<Skeleton />
					<Skeleton />
				</div>
			</div>
			<Button outline disabled>
				<ChevronRight className="size-7" />
			</Button>
		</div>
	);
}
