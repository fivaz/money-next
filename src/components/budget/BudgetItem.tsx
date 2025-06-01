'use client';
import { Strong } from '@/components/base/text';
import { Text } from '@/components/base/text';
import { type Budget } from '@/lib/budget/budget.model';
import { CogIcon } from 'lucide-react';
import { type BudgetFormProps } from '@/components/budget/budget-form/BudgetForm';
import BudgetFormButton from '@/components/budget/budget-form/BudgetFormButton';
import MoneyText from '@/components/MoneyText';
import IconView from '@/components/icon-picker/IconView';
import ProgressBar from '@/components/budget/ProgressBar';
import useSWR from 'swr';
import { Transaction } from '@/lib/transaction/transaction.model';
import { useAtomValue } from 'jotai/index';
import { currentDateAtom } from '@/components/date-switcher/DateSwitcherClient';
import { API } from '@/lib/const';

type BudgetItemProps = {
	budget: Budget;
} & Pick<BudgetFormProps, 'onConfirmSaveAction' | 'onAddOptimisticAction' | 'onDeleteAction'>;

const fetcher = (url: string) =>
	fetch(url, { credentials: 'include' }).then((res) => {
		if (!res.ok) throw new Error('Failed to fetch transactions');
		return res.json();
	});

export default function BudgetItem({
	budget,
	onAddOptimisticAction,
	onConfirmSaveAction,
	onDeleteAction,
}: BudgetItemProps) {
	const date = useAtomValue(currentDateAtom);

	const {
		data: transactions,
		error,
		isLoading,
	} = useSWR<Transaction[]>(
		`/api/${API.BUDGETS}/${budget.id}/${API.TRANSACTIONS}?year=${date.getFullYear()}&month=${date.getMonth() + 1}`,
		fetcher,
	);

	return (
		<li className="rounded-lg border border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-800">
			<div className="rounded-x-lg flex flex-col gap-2 rounded-t-lg border-b border-gray-300 p-3 dark:border-gray-600">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Text>
							<IconView className="size-5" name={budget.icon} />
						</Text>

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

				<ProgressBar budget={budget} transactions={transactions ?? []} />

				<div className="mt-3">
					{isLoading && <p>Loading transactions...</p>}
					{error && <p className="text-red-500">Error: {error.message}</p>}
					{!isLoading && !error && transactions && transactions.length === 0 && (
						<p className="text-gray-500">No transactions found</p>
					)}
					{!isLoading && !error && transactions && transactions.length > 0 && (
						<ul className="max-h-40 space-y-1 overflow-y-auto">
							{transactions.map((tx) => (
								<li key={tx.id} className="flex justify-between text-sm">
									<span className="truncate">{tx.description}</span>
									<span>{tx.amount}</span>
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</li>
	);
}
