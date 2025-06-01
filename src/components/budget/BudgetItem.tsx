'use client';
import { Strong } from '@/components/base/text';
import { Text } from '@/components/base/text';
import { type Budget } from '@/lib/budget/budget.model';
import { ChevronDownIcon, CogIcon } from 'lucide-react';
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
import { Disclosure, DisclosureButton, DisclosurePanel, Transition } from '@headlessui/react';
import TransactionItem from '@/components/transaction/TransactionItem';
import clsx from 'clsx';
import { Fragment, useEffect, useOptimistic } from 'react';
import { useTransactionsWithOptimistic } from '@/lib/transaction/transaction.hook';
import { AnimatePresence, easeOut, motion } from 'framer-motion';

type BudgetItemProps = {
	budget: Budget;
} & Pick<BudgetFormProps, 'onConfirmSaveAction' | 'onAddOptimisticAction' | 'onDeleteAction'>;

export default function BudgetItem({
	budget,
	onAddOptimisticAction,
	onConfirmSaveAction,
	onDeleteAction,
}: BudgetItemProps) {
	const date = useAtomValue(currentDateAtom);

	const url = `/api/${API.BUDGETS}/${budget.id}/${API.TRANSACTIONS}?year=${date.getFullYear()}&month=${date.getMonth() + 1}`;

	const { transactions, error, isLoading, addOrUpdateOptimistic, confirmSave } =
		useTransactionsWithOptimistic(url);

	return (
		<Disclosure>
			{({ open }) => (
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
					</div>

					<AnimatePresence>
						{open && (
							<DisclosurePanel static as={Fragment}>
								<motion.div
									initial={{ scale: 0.95, opacity: 0 }}
									animate={{ scale: 1, opacity: 1 }}
									exit={{ scale: 0.95, opacity: 0 }}
									transition={{ duration: 0.1, ease: easeOut }}
								>
									<ul role="list" className="divide-y divide-gray-300 dark:divide-gray-600">
										{transactions.map((transaction) => (
											<TransactionItem
												key={transaction.id}
												transaction={transaction}
												onAddOptimisticAction={addOrUpdateOptimistic}
												onConfirmSaveAction={confirmSave}
											/>
										))}
									</ul>
								</motion.div>
							</DisclosurePanel>
						)}
					</AnimatePresence>

					<DisclosureButton className="flex w-full justify-center p-2">
						<Text>
							<ChevronDownIcon className={clsx(open && 'rotate-180 transform')} />
						</Text>
					</DisclosureButton>
				</li>
			)}
		</Disclosure>
	);
}
