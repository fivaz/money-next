import { Field, Label } from '@/components/base/fieldset';
import { LoaderCircleIcon } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { useAccounts } from '@/lib/account/account.utils-api';
import { Listbox, ListboxOption } from '@/components/base/listbox';
import { TransactionIn } from '@/components/transaction/transaction-form/transaction-form.utils';
import { Account } from '@/lib/account/account.model';
import { Text } from '@/components/base/text';
import IconView from '@/components/icon-picker/IconView';

type AccountsSectionProps = {
	setTransactionIn: Dispatch<SetStateAction<TransactionIn>>;
	transactionIn: TransactionIn;
};

export default function AccountsSection({ transactionIn, setTransactionIn }: AccountsSectionProps) {
	const { accounts, isLoading: isAccountLoading } = useAccounts();

	const handleAccount = (value: Account) => {
		setTransactionIn((transaction) => ({
			...transaction,
			account: value,
		}));
	};

	const handleDestination = (value: Account | null) => {
		setTransactionIn((transaction) => ({
			...transaction,
			destination: value,
		}));
	};

	return (
		<div className="grid grid-cols-2 gap-4">
			<Field className="col-span-2 md:col-span-1">
				<Label>Account</Label>
				{isAccountLoading ? (
					<Text>
						Loading accounts <LoaderCircleIcon className="size-5 animate-spin" />
					</Text>
				) : (
					<Listbox
						name="account"
						value={transactionIn?.account}
						onChange={handleAccount}
						placeholder="Select account&hellip;"
					>
						{accounts.map((account) => (
							<ListboxOption key={account.id} value={account} className="flex gap-2">
								<IconView name={account.icon} className="size-4 shrink-0" />
								<span className="truncate">{account.name}</span>
							</ListboxOption>
						))}
					</Listbox>
				)}
			</Field>

			<Field className="col-span-2 md:col-span-1">
				<Label>Destination</Label>
				{isAccountLoading ? (
					<Text>
						Loading accounts <LoaderCircleIcon className="size-5 animate-spin" />
					</Text>
				) : (
					<Listbox
						name="destination"
						disabled={transactionIn.operation !== 'transfer'}
						value={transactionIn?.destination}
						onChange={handleDestination}
						placeholder="Select account&hellip;"
					>
						<ListboxOption value={null} className="flex gap-2">
							<IconView name={''} className="size-4" />
							No account
						</ListboxOption>
						{accounts
							.filter((account) => account.id !== transactionIn?.account?.id)
							.map((account) => (
								<ListboxOption key={account.id} value={account} className="flex gap-2">
									<IconView name={account.icon} className="size-4 shrink-0" />
									<span className="truncate">{account.name}</span>
								</ListboxOption>
							))}
					</Listbox>
				)}
			</Field>
		</div>
	);
}
