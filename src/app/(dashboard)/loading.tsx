import { ArrowDownNarrowWideIcon, CalendarIcon, ClockIcon, CogIcon, PlusIcon } from 'lucide-react';
import Button from '@/components/Button';
import IconView from '@/components/icon-picker/IconView';
import { Skeleton } from '@/components/Skeleton';
import { Heading } from '@/components/base/heading';
import DateSwitcher from '@/components/date-switcher/DateSwitcher';
import { Strong } from '@/components/base/text';
import TotalIcon from '@/components/icons/TotalIcon';
import DateSwitcherSkeleton from '@/components/date-switcher/DateSwitcherSkeleton';

export default function HomePageSkeleton() {
	return (
		<main className="flex flex-col gap-5">
			<div className="flex flex-row items-center justify-between gap-3">
				<Heading>Transactions</Heading>
				<DateSwitcherSkeleton />
			</div>
			<TransactionListSkeleton />
		</main>
	);
}

export function TransactionListSkeleton() {
	return (
		<div className="flex flex-col rounded-lg border border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-800">
			<div className="sticky top-0 z-10 flex items-center justify-end gap-4 rounded-t-lg border-b border-l border-gray-300 bg-gray-100 p-3 dark:border-gray-600 dark:bg-gray-800">
				<div className="flex items-center gap-2">
					<TotalIcon className="size-4" />
					<Skeleton />
				</div>
				<Button size="px-2 py-1.5" disabled>
					<ArrowDownNarrowWideIcon className="size-5" />
				</Button>
				<Button disabled size="p-1.5 px-2.5" className="flex items-center">
					<PlusIcon className="size-5" />
					<span className="hidden sm:block">Transaction</span>
				</Button>
			</div>
			<ul role="list" className="divide-y divide-gray-300 dark:divide-gray-600">
				{[...Array(100)].map((_, index) => (
					<TransactionItemSkeleton key={index} />
				))}
			</ul>
		</div>
	);
}

function TransactionItemSkeleton() {
	return (
		<li className="flex items-center justify-between bg-white px-3 py-2 dark:bg-gray-700">
			<div className="flex min-w-0 items-center gap-2 sm:gap-4">
				<div className="flex min-w-0 items-center gap-2">
					<div className="flex shrink-0 items-center gap-2">
						<CalendarIcon className="hidden size-4 shrink-0 md:block" />
						<Skeleton className="block w-12 md:hidden" />
						<Skeleton className="hidden w-14 md:block" />
					</div>
					<div className="hidden shrink-0 items-center gap-2 md:flex">
						<ClockIcon className="size-4 shrink-0" />
						<Skeleton className="w-10" />
					</div>
				</div>

				<div className="flex items-center gap-2 truncate">
					<Strong>
						<IconView className="size-4 shrink-0 text-yellow-500" name="" />
					</Strong>
					<Skeleton className="min-w-0 flex-1 truncate" />
				</div>
			</div>

			<div className="flex shrink-0 items-center gap-2">
				<Skeleton />

				<Button disabled size="p-2">
					<CogIcon className="size-4 shrink-0" />
				</Button>
			</div>
		</li>
	);
}
