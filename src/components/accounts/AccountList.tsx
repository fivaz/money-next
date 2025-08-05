'use client';

import AccountItem from '@/components/accounts/AccountItem';
import AccountFormButton from '@/components/accounts/account-form/AccountFormButton';
import { useAccountList } from '@/lib/account/useAccountList';
import { useSearchParams } from 'next/navigation';
import { getParamsDate } from '@/lib/shared/date.utils';
import DateSwitcher from '@/components/date-switcher/DateSwitcher';
import { VaultIcon } from 'lucide-react';
import SearchTransactions from '@/components/transaction/SearchTransactions';

export default function AccountList() {
	const { accounts } = useAccountList();

	const searchParams = useSearchParams();
	const [year, month] = getParamsDate(searchParams);

	return (
		<div className="flex flex-col gap-5">
			<div className="flex justify-end gap-5">
				<AccountFormButton size="p-2">
					<VaultIcon className="size-5" />
					<span className="hidden md:block">Add Account</span>
				</AccountFormButton>
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
