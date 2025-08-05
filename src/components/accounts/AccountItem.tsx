'use client';
import { Strong, Text } from '@/components/base/text';
import { type Account } from '@/lib/account/account.model';
import { ChevronDownIcon, CogIcon } from 'lucide-react';
// import AccountFormButton from '@/components/account/account-form/AccountFormButton';
import MoneyText from '@/components/MoneyText';
import IconView from '@/components/icon-picker/IconView';
// import ProgressBar from '@/components/account/ProgressBar';
import { API } from '@/lib/const';
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
} from '@headlessui/react';
import clsx from 'clsx';
import { Fragment } from 'react';
import { AnimatePresence, easeOut, motion } from 'framer-motion';
import { useSortable } from '@dnd-kit/react/sortable';
import useSWR from 'swr';
import { Transaction } from '@/lib/transaction/transaction.model';
import { fetcher } from '@/lib/shared/api-client.utils';
import AccountFormButton from '@/components/accounts/account-form/AccountFormButton';
// import { TransactionListProvider } from '@/lib/transaction/TransactionListProvider';
// import AccountTransactions from '@/components/account/AccountTransactions';
// import JarIcon from '../icons/JarIcon';
// import Tooltip from '@/components/Tooltip';
// import { formatMoney } from '@/lib/shared/utils';

type AccountItemProps = {
	account: Account;
	index: number;
};

export default function AccountItem({ account, index }: AccountItemProps) {
	const { ref } = useSortable({ id: account.id, index });

	// const { data: initialTransactionsData, mutate } = useSWR<Transaction[]>(url, fetcher);
	//
	// const initialTransactions = initialTransactionsData || [];

	return (
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
									{account.id} - {account.name}
								</Strong>
							</div>
							<div className="flex shrink-0 items-center gap-2">
								<AccountFormButton account={account}>
									<CogIcon className="size-4 shrink-0" />
								</AccountFormButton>
							</div>
						</div>
					</div>

					{/*<TransactionListProvider initialItems={initialTransactions} mutate={mutate}>*/}
					{/*	<AnimatePresence>*/}
					{/*		{open && (*/}
					{/*			<DisclosurePanel static as={Fragment}>*/}
					{/*				<motion.div*/}
					{/*					initial={{ scale: 0.95, opacity: 0 }}*/}
					{/*					animate={{ scale: 1, opacity: 1 }}*/}
					{/*					exit={{ scale: 0.95, opacity: 0 }}*/}
					{/*					transition={{ duration: 0.1, ease: easeOut }}*/}
					{/*				>*/}
					{/*					<AccountTransactions />*/}
					{/*				</motion.div>*/}
					{/*			</DisclosurePanel>*/}
					{/*		)}*/}
					{/*	</AnimatePresence>*/}
					{/*</TransactionListProvider>*/}

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
	);
}
