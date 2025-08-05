'use client';
import { Strong, Text } from '@/components/base/text';
import { type Account } from '@/lib/account/account.model';
import {
	ArrowDown01Icon,
	ArrowDown10Icon,
	ChevronDownIcon,
	CogIcon,
	HandCoinsIcon,
	PlusIcon,
} from 'lucide-react';
import IconView from '@/components/icon-picker/IconView';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import clsx from 'clsx';
import { Fragment, useState } from 'react';
import { AnimatePresence, easeOut, motion } from 'framer-motion';
import { useSortable } from '@dnd-kit/react/sortable';
import AccountFormButton from '@/components/accounts/account-form/AccountFormButton';
import TransactionFormButton from '@/components/transaction/transaction-form/TransactionFormButton';
import { TransactionListProvider } from '@/lib/transaction/provider/TransactionListProvider';
import {
	fetchAccountBalance,
	fetchAccountTransactions,
} from '@/lib/transaction/transaction.utils-api';
import AccountTransactions from '@/components/accounts/AccountTransactions';
import { Transaction } from '@/lib/transaction/transaction.model';

import { buildDate, formatForInput } from '@/lib/shared/date.utils';
import TotalIcon from '@/components/icons/TotalIcon';
import MoneyText from '@/components/MoneyText';
import Button from '@/components/Button';

type AccountItemProps = {
	account: Account;
	index: number;
	year: number;
	month: number;
};

export default function AccountItem({ account, index, year, month }: AccountItemProps) {
	const { ref } = useSortable({ id: account.id, index });

	const initialTransactions = fetchAccountTransactions(account.id, year, month);

	const balance = fetchAccountBalance(account.id, year, month);

	const [orderDesc, setOrderDesc] = useState(true);

	const getNewAccountTransaction = (): Partial<Transaction> => {
		return {
			account,
			date: formatForInput(buildDate(year, month)),
		};
	};

	return (
		<Disclosure ref={ref} as="div" defaultOpen>
			{({ open }) => (
				<TransactionListProvider
					initialTransactions={initialTransactions}
					orderDesc={orderDesc}
					source={{ type: 'account', id: account.id }}
				>
					<li className="rounded-lg border border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800">
						<div className="sticky top-0 z-10 flex flex-col gap-2 border-b border-gray-300 bg-gray-50 p-3 dark:border-gray-600 dark:bg-gray-800">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2 truncate">
									<Text>
										<IconView className="size-5" name={account.icon} />
									</Text>

									<Strong className="min-w-0 flex-1 truncate">{account.name}</Strong>
								</div>

								<div className="flex shrink-0 items-center gap-2">
									<Text className="flex items-center gap-2">
										<TotalIcon className="size-4" />
										<MoneyText className="shrink-0">{balance}</MoneyText>
									</Text>

									<Button onClick={() => setOrderDesc((order) => !order)}>
										{orderDesc ? (
											<ArrowDown01Icon className="size-4" />
										) : (
											<ArrowDown10Icon className="size-4" />
										)}
									</Button>

									<TransactionFormButton transaction={getNewAccountTransaction()}>
										<PlusIcon className="size-4 shrink-0" />
										<HandCoinsIcon className="size-4 shrink-0" />
									</TransactionFormButton>

									<AccountFormButton account={account}>
										<CogIcon className="size-4 shrink-0" />
									</AccountFormButton>
								</div>
							</div>
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
										<AccountTransactions accountId={account.id} />
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
				</TransactionListProvider>
			)}
		</Disclosure>
	);
}
