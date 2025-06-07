'use client';
import { Calendar1Icon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Skeleton } from '@/components/Skeleton';

type DateSwitcherClientProps = {};
export default function DateSwitcherSkeleton({}: DateSwitcherClientProps) {
	return (
		<div className="relative flex items-center rounded-md shadow-xs md:items-stretch">
			<button
				disabled
				type="button"
				className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 bg-white pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-400"
			>
				<ChevronLeftIcon className="size-5" />
			</button>
			<button
				disabled
				type="button"
				className="flex h-9 items-center gap-2 border-y border-gray-300 bg-white text-sm font-semibold text-gray-900 hover:bg-gray-50 hover:text-gray-500 focus:relative dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-400"
			>
				<Calendar1Icon className="size-4" aria-hidden="true" />
				<Skeleton className="w-6 sm:w-14" />
			</button>
			<button
				disabled
				type="button"
				className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 bg-white pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-400"
			>
				<span className="sr-only">Next month</span>
				<ChevronRightIcon className="size-5" aria-hidden="true" />
			</button>
		</div>
	);
}
