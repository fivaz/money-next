'use client';
import { Strong, Text } from '@/components/base/text';
import { Budget } from '@/lib/budget/budget.model';
import { CalendarIcon, ClockIcon, CogIcon } from 'lucide-react';
import { type BudgetFormProps } from '@/components/budget/budget-form/BudgetForm';
import BudgetFormButton from '@/components/budget/budget-form/BudgetFormButton';
import { format, parse } from 'date-fns';
import { useMemo } from 'react';
import MoneyText from '@/components/MoneyText';

type BudgetItemProps = {
	budget: Budget;
} & Pick<BudgetFormProps, 'onConfirmSaveAction' | 'onAddOptimisticAction' | 'onDeleteAction'>;

export default function BudgetItem({
	budget,
	onAddOptimisticAction,
	onConfirmSaveAction,
	onDeleteAction,
}: BudgetItemProps) {
	return (
		<li className="flex items-center justify-between bg-white px-3 py-2 dark:bg-gray-700">
			<div className="flex min-w-0 items-center gap-4">
				<Strong className="min-w-0 flex-1 truncate">{budget.name}</Strong>
			</div>

			<div className="flex shrink-0 items-center gap-2">
				<MoneyText>{budget.amount}</MoneyText>

				<BudgetFormButton
					budget={budget}
					onAddOptimisticAction={onAddOptimisticAction}
					onConfirmSaveAction={onConfirmSaveAction}
					onDeleteAction={onDeleteAction}
				>
					<CogIcon className="size-4 shrink-0" />
				</BudgetFormButton>
			</div>
		</li>
	);
}
