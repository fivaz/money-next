'use client';
import { Strong, Text } from '@/components/base/text';
import { type Account } from '@/lib/account/account.model';
import {
	ChevronDownIcon,
	CogIcon,
	HandCoinsIcon,
	PlusIcon,
} from 'lucide-react';
import IconView from '@/components/icon-picker/IconView';
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
} from '@headlessui/react';
import clsx from 'clsx';
import { Fragment, useEffect } from 'react';
import { AnimatePresence, easeOut, motion } from 'framer-motion';
import { useSortable } from '@dnd-kit/react/sortable';
import AccountFormButton from '@/components/accounts/account-form/AccountFormButton';
import TransactionFormButton2 from '@/components/transaction/transaction-form2/TransactionFormButton2';
import { TransactionListProvider2 } from '@/lib/transaction2/TransactionListProvider2';
import {
	fetchAccountBalance,
	fetchAccountTransactions,
} from '@/lib/transaction2/transaction2.utils';
import AccountTransactions from '@/components/accounts/AccountTransactions';
import { Transaction } from '@/lib/transaction2/transaction2.model';
import { useSearchParams } from 'next/navigation';
import {
	buildDate,
	formatForInput,
	getParamsDate,
} from '@/lib/shared/date.utils';
import TotalIcon from '@/components/icons/TotalIcon';
import MoneyText from '@/components/MoneyText';

type AccountItemProps = {
	account: Account;
	index: number;
	year: number;
	month: number;
};

export default function AccountItem({
	account,
	index,
	year,
	month,
}: AccountItemProps) {
	const { ref } = useSortable({ id: account.id, index });

	const initialTransactions = fetchAccountTransactions(account.id, year, month);

	const balance = fetchAccountBalance(account.id, year, month);

	const getAccountTransaction = (): Partial<Transaction> => {
		return {
			account,
			date: formatForInput(buildDate(year, month)),
		};
	};

	return (
		<TransactionListProvider2 initialTransactions={initialTransactions}>
			<Disclosure ref={ref} as="div" defaultOpen>
				{({ open }) => (
					<li className="rounded-lg border border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800">
						<div className="rounded-x-lg flex flex-col gap-2 rounded-t-lg border-b border-gray-300 p-3 dark:border-gray-600">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2 truncate">
									<Text>
										<IconView className="size-5" name={account.icon} />
									</Text>

									<Strong className="min-w-0 flex-1 truncate">
										{account.name}
									</Strong>
								</div>
								<div className="flex shrink-0 items-center gap-2">
									<Text className="flex items-center gap-2">
										<TotalIcon className="size-4" />
										<MoneyText className="shrink-0">{balance}</MoneyText>
									</Text>
									<TransactionFormButton2 transaction={getAccountTransaction()}>
										<PlusIcon className="size-4 shrink-0" />
										<HandCoinsIcon className="size-4 shrink-0" />
									</TransactionFormButton2>
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
								<ChevronDownIcon
									className={clsx(open && 'rotate-180 transform')}
								/>
							</Text>
						</DisclosureButton>
					</li>
				)}
			</Disclosure>
		</TransactionListProvider2>
	);
}
