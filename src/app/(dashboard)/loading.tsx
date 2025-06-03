import { CalendarIcon, ClockIcon, LoaderIcon } from 'lucide-react';
import Button from '@/components/Button';
import IconView from '@/components/icon-picker/IconView';
import { Skeleton } from '@/components/Skeleton';

export default function Loading() {
	return <TransactionListSkeleton />;
}

export function TransactionListSkeleton() {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex justify-end">
				<Button disabled>
					<LoaderIcon className="anime-spin size-4" />
					Add Transaction
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
			<div className="flex min-w-0 items-center gap-4">
				<div className="flex min-w-0 items-center gap-2">
					<div className="flex shrink-0 items-center gap-2">
						<CalendarIcon className="hidden size-4 shrink-0 md:block" />
						<span className="block md:hidden">
							<Skeleton />
						</span>
						<span className="hidden md:block">
							<Skeleton />
						</span>
					</div>
					<div className="hidden shrink-0 items-center gap-2 md:flex">
						<ClockIcon className="size-4 shrink-0" />
						<span className="">
							<Skeleton />
						</span>
					</div>
				</div>

				<div className="flex items-center gap-2 truncate">
					<div>
						<IconView className="size-4 shrink-0 text-yellow-500" name={''} />
					</div>
					<div className="min-w-0 flex-1 truncate">
						<Skeleton />
					</div>
				</div>
			</div>

			<div className="flex shrink-0 items-center gap-2">
				<Skeleton />

				<Button disabled>
					<LoaderIcon className="size-4 shrink-0 animate-spin" />
				</Button>
			</div>
		</li>
	);
}
