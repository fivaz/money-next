'use client';

import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useState,
	useTransition,
} from 'react';
import {
	createAccountAction,
	updateAccountAction,
	deleteAccountAction,
} from '@/lib/account/account.actions';
import { Account } from './account.model';
import { mutateTransactions } from '@/lib/transaction/transaction.utils-api';
import { mutateAccounts } from '@/lib/account/account.utils-api';

type AccountListContextType = {
	accounts: Account[];
	setAccounts: Dispatch<SetStateAction<Account[]>>;
	createAccount: (data: Account) => Promise<void>;
	updateAccount: (data: Account) => Promise<void>;
	deleteAccount: (id: number) => Promise<void>;
};

export const AccountListContext = createContext<AccountListContextType | undefined>(undefined);

export function AccountListProvider({
	children,
	initialAccounts,
}: {
	children: ReactNode;
	initialAccounts: Account[];
}) {
	const [accounts, setAccounts] = useState<Account[]>(initialAccounts);

	const createAccount = async (data: Omit<Account, 'id'>) => {
		const tempId = Date.now();
		const optimisticAccount: Account = { ...data, id: tempId };

		const previousAccounts = accounts;
		setAccounts((prev) => [optimisticAccount, ...prev]);

		try {
			const created = await createAccountAction(data);
			setAccounts((prev) => prev.map((current) => (current.id === tempId ? created : current)));
			mutateAccounts();
		} catch (err) {
			console.error('Create failed', err);
			setAccounts(previousAccounts); // rollback
		}
	};

	const updateAccount = async (update: Account) => {
		const previousAccounts = accounts;

		setAccounts((prev) => prev.map((current) => (current.id === update.id ? update : current)));

		try {
			await updateAccountAction(update);
			mutateAccounts();
		} catch (err) {
			console.error('Update failed', err);
			setAccounts(previousAccounts); // rollback
		}
	};

	const deleteAccount = async (id: number) => {
		const previousAccounts = accounts;
		setAccounts((prev) => prev.filter((current) => current.id !== id));

		try {
			await deleteAccountAction(id);
			mutateAccounts();
		} catch (err) {
			console.error('Delete failed', err);
			setAccounts(previousAccounts); // rollback
		}
	};

	return (
		<AccountListContext.Provider
			value={{
				accounts,
				setAccounts,
				createAccount,
				updateAccount,
				deleteAccount,
			}}
		>
			{children}
		</AccountListContext.Provider>
	);
}
