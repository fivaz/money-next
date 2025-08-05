'use client';
import { FormEvent, useRef } from 'react';
import { Field, Label } from '@/components/base/fieldset';
import { Input } from '@/components/base/input';
import { Dialog, DialogActions, DialogTitle } from '@/components/base/dialog';
import Button from '@/components/Button';
import { XIcon } from 'lucide-react';
import MoneyInput from '@/components/MoneyInput';
import IconPicker from '@/components/icon-picker/IconPicker';
import { buildAccount } from '@/lib/account/account.utils';
import type { Account } from '@/lib/account/account.model';

import { mutate } from 'swr';
import { API } from '@/lib/const';
import ConfirmButton from '@/components/Button/ConfirmButton';
import { Switch } from '@/components/base/switch';
import JarIcon from '@/components/icons/JarIcon';
import Tooltip from '@/components/Tooltip';
import { useAccountList } from '@/lib/account/useAccountList';

type AccountFormProps = {
	account?: Account;
	isOpen: boolean;
	closeFormAction: () => void;
};

export default function AccountForm({
	account,
	isOpen,
	closeFormAction,
}: AccountFormProps) {
	const formRef = useRef<HTMLFormElement>(null);
	const { createAccount, updateAccount, deleteAccount } = useAccountList();

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const newAccount = buildAccount(formData);

		if (account?.id) void updateAccount(newAccount);
		else void createAccount(newAccount);

		formRef.current?.reset();
		closeFormAction();
	};

	const handleDelete = () => {
		if (account?.id) {
			void deleteAccount(account.id);
		}
	};

	return (
		<Dialog open={isOpen} onClose={closeFormAction}>
			<DialogTitle className="flex items-center justify-between">
				<span>{account?.id ? 'Edit Account' : 'Add Account'}</span>
				<Button onClick={closeFormAction} size="p-1">
					<XIcon />
				</Button>
			</DialogTitle>

			<form
				className="z-20 mt-4 space-y-4"
				onSubmit={handleSubmit}
				ref={formRef}
			>
				<input type="hidden" name="id" defaultValue={account?.id} />
				<input
					type="hidden"
					name="sortOrder"
					defaultValue={account?.sortOrder}
				/>

				<Field>
					<Label>Name</Label>
					<Input name="name" defaultValue={account?.name} />
				</Field>

				<IconPicker name="icon" defaultValue={account?.icon} />

				<DialogActions>
					<div>
						{account?.id && (
							<ConfirmButton
								className="w-full justify-center sm:w-auto sm:justify-start"
								message="This account will be permanently deleted. This action cannot be undone."
								size="sm:px-2.5 sm:py-1.5 p-2.5"
								type="button"
								color="red"
								onClick={handleDelete}
							>
								Delete
							</ConfirmButton>
						)}
					</div>
					<Button
						className="w-full justify-center sm:w-auto sm:justify-start"
						size="sm:px-2.5 sm:py-1.5 p-2.5"
						type="submit"
					>
						Save
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
}
