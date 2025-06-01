import { getDate, getDaysInMonth, startOfDay } from 'date-fns';
import MoneyText from '@/components/MoneyText';
import { Text } from '@/components/base/text';
import { type BudgetWithTransactions } from '@/lib/budget/budget-transaction.model';
import { Transaction } from '@/lib/transaction/transaction.model';

// Define props interface
interface ProgressBarProps {
	budget: BudgetWithTransactions;
}

export default function ProgressBar({ budget }: ProgressBarProps) {
	// Get current date information using date-fns
	const currentDate = startOfDay(new Date());
	const currentDay = getDate(currentDate);
	const daysInMonth = getDaysInMonth(currentDate);

	// Calculate day of month percentage
	const dayOfMonthPercentage = Math.round((currentDay / daysInMonth) * 100);

	// Calculate total spent from transactions
	const totalSpent = budget.transactions.reduce((sum, transaction) => sum + transaction.amount, 0);

	// Calculate actual percentage (can exceed 100%)
	const actualPercentage = Math.round((totalSpent / budget.amount) * 100);

	// Calculate progress percentage for bar width (capped at 100%)
	const progressPercentage = Math.min(actualPercentage, 100);

	// Determine progress bar color based on if budget is exceeded
	const progressColor = totalSpent > budget.amount ? 'bg-red-500' : 'bg-yellow-500';

	// Dynamic classes
	const progressBarClass = `${progressColor} h-3 rounded-full transition-all duration-300 ease-in-out relative`;
	const containerClass = `bg-gray-200 h-3 rounded-full w-full`;

	return (
		<div className="flex items-center gap-2">
			<div className={containerClass} style={{ position: 'relative' }}>
				<div className={progressBarClass} style={{ width: `${progressPercentage}%` }}>
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
				(<MoneyText>{totalSpent}</MoneyText> / <MoneyText>{budget.amount}</MoneyText>)
			</Text>
		</div>
	);
}
