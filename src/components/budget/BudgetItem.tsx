'use client';
import { Strong } from '@/components/base/text';
import { type BudgetWithTransactions } from '@/lib/budget/budget-transaction.model';
import { CogIcon } from 'lucide-react';
import { type BudgetFormProps } from '@/components/budget/budget-form/BudgetForm';
import BudgetFormButton from '@/components/budget/budget-form/BudgetFormButton';
import MoneyText from '@/components/MoneyText';
import IconView from '@/components/icon-picker/IconView';
import ProgressBar from '@/components/budget/ProgressBar';

type BudgetItemProps = {
	budget: BudgetWithTransactions;
} & Pick<BudgetFormProps, 'onConfirmSaveAction' | 'onAddOptimisticAction' | 'onDeleteAction'>;

export default function BudgetItem({
	budget,
	onAddOptimisticAction,
	onConfirmSaveAction,
	onDeleteAction,
}: BudgetItemProps) {
	return (
		<li className="rounded-lg border border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-800">
			<div className="rounded-x-lg flex flex-col gap-2 rounded-t-lg border-b border-gray-300 p-3 dark:border-gray-600">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<IconView className="size-5" name={budget.icon} />

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
				</div>

				<ProgressBar budget={budget} />
			</div>
		</li>
	);
}
