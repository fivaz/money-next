'use client';
import { type PropsWithChildren, useState } from 'react';
import Button from '@/components/Button';
import { PiggyBankIcon, Vault, VaultIcon } from 'lucide-react';
import { Account } from '@/lib/account/account.model';
import AccountForm from '@/components/accounts/account-form/AccountForm';

type AccountFormButtonProps = PropsWithChildren<{
	account?: Account;
	className?: string;
	size?: string;
}>;

export default function AccountFormButton({
	children,
	account,
	size,
	className,
}: AccountFormButtonProps) {
	const [isOpen, setIsOpen] = useState(false);

	const closeDialog = () => setIsOpen(false);
	const openDialog = () => setIsOpen(true);
	return (
		<>
			<>
				<Button onClick={openDialog} className={className} size={size}>
					{children || (
						<>
							<VaultIcon className="size-5" />
							<span>Add Account</span>
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
