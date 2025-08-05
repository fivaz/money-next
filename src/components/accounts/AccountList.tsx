'use client';

import AccountItem from '@/components/accounts/AccountItem';
import AccountFormButton from '@/components/accounts/account-form/AccountFormButton';
import { useAccountList } from '@/lib/account/useAccountList';

export default function AccountList() {
	const { accounts } = useAccountList();

	return (
		<div>
			<AccountFormButton />
			<ul className="space-y-2">
				{accounts.map((account, index) => (
					<AccountItem key={account.id} account={account} index={index} />
				))}
			</ul>
		</div>
	);
}
