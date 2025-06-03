'use client';
import BudgetItem from '@/components/budget/BudgetItem';
import BudgetFormButton from '@/components/budget/budget-form/BudgetFormButton';
import { type Budget } from '@/lib/budget/budget.model';
import { DragDropProvider } from '@dnd-kit/react';
import { move } from '@dnd-kit/helpers';
import { reorderBudgets } from '@/lib/budget/budget.actions';
import { useOptimisticList } from '@/lib/shared/optmistic.hook';
import { sortBudgets } from '@/lib/budget/budget.utils';
import { Button } from '@/components/base/button';
import { Text } from '@/components/base/text';
import { ChevronDownIcon, CogIcon, LoaderIcon } from 'lucide-react';
import { Skeleton } from '@/components/Skeleton';
import clsx from 'clsx';
import MoneyText from '@/components/MoneyText';
import { getDate, getDaysInMonth, startOfDay } from 'date-fns';

export default function BudgetListSkeleton() {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex justify-end">
				<Button disabled color="light/dark" className="flex items-center">
					<LoaderIcon className="anime-spin size-4" />
					Add Budget
				</Button>
			</div>
			<ul className="mt-4 space-y-2">
				{[...Array(100)].map((_, index) => (
					<BudgetItemSkeleton key={index} />
				))}
			</ul>
		</div>
	);
}

function BudgetItemSkeleton() {
	return (
		<div>
			<li className="rounded-lg border border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-800">
				<div className="rounded-x-lg flex flex-col gap-2 rounded-t-lg border-b border-gray-300 p-3 dark:border-gray-600">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<Skeleton />
						</div>
						<div className="flex shrink-0 items-center gap-2">
							<Skeleton />

							<Button disabled color="light/dark">
								<CogIcon className="size-4 shrink-0" />
							</Button>
						</div>
					</div>

					<ProgressBarSkeleton />
				</div>

				<Button outline className="flex w-full justify-center p-2">
					<Text>
						<ChevronDownIcon className="rotate-180 transform" />
					</Text>
				</Button>
			</li>
		</div>
	);
}

function ProgressBarSkeleton() {
	const currentDate = startOfDay(new Date());
	const currentDay = getDate(currentDate);
	const daysInMonth = getDaysInMonth(currentDate);

	const dayOfMonthPercentage = Math.round((currentDay / daysInMonth) * 100);

	return (
		<div className="flex items-center gap-2">
			<div className="relative h-3 flex-1 rounded-full bg-gray-200">
				<div
					className={clsx('relative h-3 rounded-full transition-all duration-300 ease-in-out')}
					style={{ width: `0%` }}
				>
					<span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-stone-600"></span>
				</div>
				<div
					className="absolute top-0 h-full border-l-2 border-dashed border-red-400"
					style={{ left: `${dayOfMonthPercentage}%` }}
				/>

				<span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-gray-600">
					<Skeleton />
				</span>
			</div>
			<div className="flex items-center gap-1 text-gray-600">
				(<Skeleton className="w-14" /> / <Skeleton className="w-14" />)
			</div>
		</div>
	);
}
