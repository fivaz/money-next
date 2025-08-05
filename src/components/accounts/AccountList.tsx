'use client';

import AccountItem from '@/components/accounts/AccountItem';
import AccountFormButton from '@/components/accounts/account-form/AccountFormButton';
import { useAccountList } from '@/lib/account/useAccountList';
import { useSearchParams } from 'next/navigation';
import { getParamsDate } from '@/lib/shared/date.utils';
import DateSwitcher from '@/components/date-switcher/DateSwitcher';
import { VaultIcon } from 'lucide-react';
import SearchTransactions from '@/components/transaction/SearchTransactions';
import { move } from '@dnd-kit/helpers';
import { reorderBudgets } from '@/lib/budget/budget.actions';
import { reorderAccounts } from '@/lib/account/account.actions';
import { DragDropProvider } from '@dnd-kit/react';

export default function AccountList() {
	const { accounts, setAccounts } = useAccountList();

	const searchParams = useSearchParams();
	const [year, month] = getParamsDate(searchParams);

	const handleDragEnd = (event: Parameters<typeof move>[1]) => {
		const newAccounts = move(accounts, event);
		setAccounts(newAccounts);
		void reorderAccounts(newAccounts);
	};

	return (
		<div className="flex flex-col gap-5">
			<div className="flex justify-end gap-5">
				<AccountFormButton size="p-2">
					<VaultIcon className="size-5" />
					<span className="hidden md:block">Add Account</span>
				</AccountFormButton>
			</div>
			<ul className="space-y-2">
				<DragDropProvider onDragEnd={handleDragEnd}>
					{accounts.map((account, index) => (
						<AccountItem
							index={index}
							key={account.id}
							account={account}
							year={year}
							month={month}
						/>
					))}
				</DragDropProvider>
			</ul>
		</div>
	);
}
