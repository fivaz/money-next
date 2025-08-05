'use client';
import { type PropsWithChildren, useState } from 'react';
import Button from '@/components/Button';
import { PiggyBankIcon, Vault, VaultIcon } from 'lucide-react';
import { Account } from '@/lib/account/account.model';
import AccountForm from '@/components/accounts/account-form/AccountForm';

type AccountFormButtonProps = PropsWithChildren<{ account?: Account }>;

export default function AccountFormButton({
	children,
	account,
}: AccountFormButtonProps) {
	const [isOpen, setIsOpen] = useState(false);

	const closeDialog = () => setIsOpen(false);
	const openDialog = () => {
		console.log('account', account);
		setIsOpen(true);
	};

	return (
		<>
			<>
				<Button onClick={openDialog}>
					{children || (
						<>
							<VaultIcon className="size-5" />
							Add Account
						</>
					)}
				</Button>
			</>

			<AccountForm
				account={account}
				isOpen={isOpen}
				closeFormAction={closeDialog}
			/>
		</>
	);
}
