'use client';
import { Strong, Text } from '@/components/base/text';
import { type Budget } from '@/lib/budget/budget.model';
import { ChevronDownIcon, CogIcon } from 'lucide-react';
import BudgetFormButton from '@/components/budget/budget-form/BudgetFormButton';
import MoneyText from '@/components/MoneyText';
import IconView from '@/components/icon-picker/IconView';
import ProgressBar from '@/components/budget/ProgressBar';
import { API } from '@/lib/const';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import clsx from 'clsx';
import { Fragment } from 'react';
import { AnimatePresence, easeOut, motion } from 'framer-motion';
import { useSortable } from '@dnd-kit/react/sortable';
import TransactionItem from '../transaction/TransactionItem';
import useSWR from 'swr';
import { Transaction } from '@/lib/transaction/transaction.model';
import { fetcher } from '@/lib/shared/api-client.utils';

type BudgetItemProps = {
	budget: Budget;
	index: number;
	year: number;
	month: number;
};

export default function BudgetItem({ budget, index, year, month }: BudgetItemProps) {
	const { ref } = useSortable({ id: budget.id, index });

	const url = `/api/${API.BUDGETS}/${budget.id}/${API.TRANSACTIONS}?year=${year}&month=${month}`;

	const { data: transactions } = useSWR<Transaction[]>(url, fetcher);

	return (
		<Disclosure ref={ref} as="div" defaultOpen>
			{({ open }) => (
				<li className="rounded-lg border border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800">
					<div className="rounded-x-lg flex flex-col gap-2 rounded-t-lg border-b border-gray-300 p-3 dark:border-gray-600">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<Text>
									<IconView className="size-5" name={budget.icon} />
								</Text>

								<Strong className="min-w-0 flex-1 truncate">{budget.name}</Strong>
							</div>
							<div className="flex shrink-0 items-center gap-2">
								<MoneyText addColor={false} addSign={false}>
									{budget.amount}
								</MoneyText>

								<BudgetFormButton budget={budget}>
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
										{transactions?.map((transaction) => (
											<TransactionItem
												key={transaction.id}
												transaction={transaction}
												isEditable={false}
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
