import { getDate, getDaysInMonth, startOfDay } from 'date-fns';
import MoneyText from '@/components/MoneyText';
import { Text } from '@/components/base/text';
import { type Budget } from '@/lib/budget/budget.model';
import { Transaction } from '@/lib/transaction/transaction.model';
import clsx from 'clsx';
import { sumTransactions } from '@/lib/transaction/transaction.utils';

// Define props interface
interface ProgressBarProps {
	budget: Budget;
	transactions: Transaction[];
}

export default function ProgressBar({ budget, transactions }: ProgressBarProps) {
	// Get current date information using date-fns
	const currentDate = startOfDay(new Date());
	const currentDay = getDate(currentDate);
	const daysInMonth = getDaysInMonth(currentDate);

	// Calculate day of month percentage
	const dayOfMonthPercentage = Math.round((currentDay / daysInMonth) * 100);

	// Calculate total spent from transactions
	const totalSpent = sumTransactions(transactions);

	const amount = budget.amount + (budget.accumulativeAmount || 0);

	// Calculate actual percentage (can exceed 100%)
	const actualPercentage = Math.round((Math.abs(totalSpent) / amount) * 100);

	// Calculate progress percentage for bar width (capped at 100%)
	const progressPercentage = Math.min(actualPercentage, 100);

	// Determine progress bar color based on if budget is exceeded
	const progressColor = Math.abs(totalSpent) > amount ? 'bg-red-500' : 'bg-yellow-500';

	return (
		<div
			className="flex items-center gap-2"
			onClick={() => console.log('progressPercentage', progressPercentage)}
		>
			<div className="relative h-3 flex-1 rounded-full bg-gray-200">
				<div
					className={clsx(
						'relative h-3 rounded-full transition-all duration-300 ease-in-out',
						progressColor,
					)}
					style={{ width: `${progressPercentage}%` }}
				>
					{progressPercentage >= 5 && (
						<span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-stone-600">
							{actualPercentage}%
						</span>
					)}
				</div>
				<div
					className="absolute top-0 h-full border-l-2 border-dashed border-red-400"
					style={{ left: `${dayOfMonthPercentage}%` }}
				/>
				{progressPercentage < 5 && (
					<span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-gray-600">
						{actualPercentage}%
					</span>
				)}
			</div>
			<Text className="text-gray-600">
				(<MoneyText>{totalSpent}</MoneyText> /{' '}
				<MoneyText addSign={false} addColor={false}>
					{amount}
				</MoneyText>
				)
			</Text>
		</div>
	);
}
