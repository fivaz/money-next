'use client';
import BudgetItem from '@/components/budget/BudgetItem';
import BudgetFormButton from '@/components/budget/budget-form/BudgetFormButton';
import { DragDropProvider } from '@dnd-kit/react';
import { move } from '@dnd-kit/helpers';
import { reorderBudgets } from '@/lib/budget/budget.actions';
import DateSwitcher from '@/components/date-switcher/DateSwitcher';
import { useBudgetList } from '@/lib/budget/BudgetListProvider';
import { useSearchParams } from 'next/navigation';
import { getParamsDate } from '@/lib/shared/date.utils';
import TotalIcon from '@/components/icons/TotalIcon';
import MoneyText from '@/components/MoneyText';
import { Suspense, useMemo } from 'react';
import { HandCoinsIcon, PiggyBankIcon } from 'lucide-react';
import Tooltip from '../Tooltip';
import DateSwitcherSkeleton from '@/components/date-switcher/DateSwitcherSkeleton';
import { getAmount } from '@/lib/budget/budget.utils';
import { formatMoney } from '@/lib/shared/utils';

type BudgetProps = {
	budgetedSpent: number;
};
export default function BudgetList({ budgetedSpent }: BudgetProps) {
	const { updateList, items: budgets } = useBudgetList();

	const searchParams = useSearchParams();
	const [year, month] = getParamsDate(searchParams);

	const handleDragEnd = (event: Parameters<typeof move>[1]) => {
		const newBudgets = move(budgets, event);
		updateList(newBudgets);
		void reorderBudgets(newBudgets);
	};

	const totalAmount = budgets.reduce((total, budget) => budget.amount + total, 0);

	console.log('budgets', budgets);

	const totalAccumulativeAmount = budgets.reduce(
		(total, budget) => (budget.accumulativeAmount || 0) + total,
		0,
	);

	const finalAmount = totalAmount + totalAccumulativeAmount;

	const difference = finalAmount + budgetedSpent;

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-wrap justify-between gap-5 sm:-mt-14 sm:ml-32 sm:flex-row sm:justify-end">
				<div className="flex items-center gap-2">
					<Tooltip
						message={`total budget: ${formatMoney(totalAmount)} ${totalAccumulativeAmount >= 0 ? '+' : '-'} ${formatMoney(totalAccumulativeAmount)}`}
					>
						<div className="flex items-center gap-2">
							<TotalIcon className="text-yellow-500">
								<PiggyBankIcon className="size-5" />
							</TotalIcon>
							<MoneyText addColor={false} addSign={false}>
								{finalAmount}
							</MoneyText>
						</div>
					</Tooltip>

					<span>-</span>

					<Tooltip message={`total spent`}>
						<div className="flex items-center gap-2">
							<TotalIcon className="text-yellow-500">
								<HandCoinsIcon className="size-5" />
							</TotalIcon>
							<MoneyText addColor={false} addSign={false}>
								{budgetedSpent}
							</MoneyText>
						</div>
					</Tooltip>

					<span>=</span>

					<MoneyText>{difference}</MoneyText>
				</div>

				<Suspense fallback={<DateSwitcherSkeleton />}>
					<DateSwitcher />
				</Suspense>
				<BudgetFormButton />
			</div>

			<ul className="mt-4 space-y-2">
				<DragDropProvider onDragEnd={handleDragEnd}>
					{budgets.map((budget, index) => (
						<BudgetItem index={index} key={budget.id} budget={budget} year={year} month={month} />
					))}
				</DragDropProvider>
			</ul>
		</div>
	);
}
