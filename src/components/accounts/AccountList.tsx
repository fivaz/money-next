'use client';

import AccountItem from '@/components/accounts/AccountItem';
import AccountFormButton from '@/components/accounts/account-form/AccountFormButton';
import { useAccountList } from '@/lib/account/useAccountList';
import { useSearchParams } from 'next/navigation';
import { getParamsDate } from '@/lib/shared/date.utils';
import DateSwitcher from '@/components/date-switcher/DateSwitcher';
import SearchInput from '@/components/SearchInput';
import { log } from 'node:util';
import { VaultIcon } from 'lucide-react';
import SearchTransactions from '@/components/transaction/SearchTransactions';

export default function AccountList() {
	const { accounts } = useAccountList();

	const searchParams = useSearchParams();
	const [year, month] = getParamsDate(searchParams);

	return (
		<div className="flex flex-col gap-5">
			<div className="-mt-13.5 flex flex-col items-end justify-end gap-4">
				<DateSwitcher />
				<div className="flex w-full items-center justify-between gap-4">
					<SearchTransactions />
					<AccountFormButton size="p-2">
						<VaultIcon className="size-5" />
						<span className="hidden md:block">Add Account</span>
					</AccountFormButton>
				</div>
			</div>
			<ul className="space-y-2">
				{accounts.map((account, index) => (
					<AccountItem
						key={account.id}
						account={account}
						index={index}
						year={year}
						month={month}
					/>
				))}
			</ul>
		</div>
	);
}
