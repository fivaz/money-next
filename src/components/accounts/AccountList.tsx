'use client';

import AccountItem from '@/components/accounts/AccountItem';
import AccountFormButton from '@/components/accounts/account-form/AccountFormButton';
import { useAccountList } from '@/lib/account/useAccountList';
import { useSearchParams } from 'next/navigation';
import { getParamsDate } from '@/lib/shared/date.utils';

export default function AccountList() {
	const { accounts } = useAccountList();

	const searchParams = useSearchParams();
	const [year, month] = getParamsDate(searchParams);

	return (
		<div className="flex flex-col gap-5">
			<div className="-mt-13.5 flex justify-end">
				<AccountFormButton />
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
