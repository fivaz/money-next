import {
	ChangeEvent,
	Dispatch,
	FormEvent,
	SetStateAction,
	useRef,
	useState,
} from 'react';
import { Transaction } from '@/lib/transaction2/transaction2.model';
import OperationSelector from '@/components/transaction/transaction-form2/OperationSelector';
import { Field, Label } from '@/components/base/fieldset';
import { Textarea } from '@/components/base/textarea';
import { Text } from '@/components/base/text';
import { Input } from '@/components/base/input';
import { Switch } from '@/components/base/switch';
import { Dialog, DialogActions, DialogTitle } from '@/components/base/dialog';
import Button from '@/components/Button';
import { InfoIcon, LoaderCircleIcon, XIcon } from 'lucide-react';
import { Listbox, ListboxOption } from '@/components/base/listbox';
import { Budget } from '@/lib/budget/budget.model';
import useSWR from 'swr';
import { fetcher } from '@/lib/shared/api-client.utils';
import IconView from '@/components/icon-picker/IconView';
import { useTransactionList } from '@/lib/transaction2/useTransactionList';
import { buildTransaction } from '@/lib/transaction2/transaction2.utils';
import MoneyInput from '@/components/MoneyInput';
import { API } from '@/lib/const';
import Tooltip from '@/components/Tooltip';
import { SpreadForm } from '@/components/transaction/transaction-form2/SpreadForm';
import ConfirmButton from '@/components/Button/ConfirmButton';
import { Account } from '@/lib/account/account.model';
import { fetchBudgets } from '@/lib/budget/budget.utils';
import { fetchAccounts } from '@/lib/account/account.utils';
import { TransactionIn } from '@/components/transaction/transaction-form2/transaction-form.utils';

type TransactionFormProps = {
	transaction: TransactionIn;
	setTransaction: Dispatch<SetStateAction<TransactionIn>>;
	isOpen: boolean;
	closeFormAction: () => void;
};

export default function TransactionForm2({
	transaction,
	setTransaction,
	isOpen,
	closeFormAction,
}: TransactionFormProps) {
	const { createTransaction, updateTransaction, deleteTransaction } =
		useTransactionList();

	const { budgets, isLoading: isBudgetLoading } = fetchBudgets();

	const { accounts, isLoading: isAccountLoading } = fetchAccounts();

	const formRef = useRef<HTMLFormElement | null>(null);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (transaction?.id) void updateTransaction(transaction);
		else void createTransaction(transaction);

		closeFormAction();
	};

	const handleDelete = async () => {
		if (transaction?.id) {
			void deleteTransaction(transaction?.id);
		}
	};

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setTransaction((transaction) => ({
			...transaction,
			[e.target.name]: e.target.value,
		}));
	};

	const handleAccount = (value: Account) => {
		setTransaction((transaction) => ({
			...transaction,
			account: value,
		}));
	};

	const handleDestination = (value: Account | null) => {
		setTransaction((transaction) => ({
			...transaction,
			destination: value,
		}));
	};

	const handleBudget = (value: Budget | null) => {
		setTransaction((transaction) => ({
			...transaction,
			budget: value,
		}));
	};

	const handleSwitch = (value: boolean) => {
		setTransaction((transaction) => ({
			...transaction,
			isPaid: value,
		}));
	};

	return (
		<Dialog open={isOpen} onClose={closeFormAction}>
			<DialogTitle className="flex items-center justify-between">
				<span>{transaction?.id ? 'Edit Transaction' : 'Add Transaction'}</span>
				<Button onClick={closeFormAction} size="p-1">
					<XIcon />
				</Button>
			</DialogTitle>

			<form ref={formRef} className="mt-4 space-y-4" onSubmit={handleSubmit}>
				<input type="hidden" name="id" defaultValue={transaction?.id} />
				<OperationSelector
					setTransaction={setTransaction}
					transaction={transaction}
				/>

				<Field>
					<Label>Description</Label>
					<Textarea
						name="description"
						value={transaction.description}
						onChange={handleChange}
						autoFocus
					/>
				</Field>

				<div className="grid grid-cols-3 gap-4">
					<Field className="col-span-2">
						<Label>Date</Label>
						<Input
							name="date"
							required
							type="datetime-local"
							onChange={handleChange}
							value={transaction.date}
							autoFocus
						/>
					</Field>

					<Field className="col-span-1">
						<Label>Amount</Label>
						<MoneyInput
							required
							name="amount"
							value={transaction.amount.toString()}
							onChange={handleChange}
						/>
					</Field>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<Field className="col-span-2 md:col-span-1">
						<Label>Account</Label>
						{isAccountLoading ? (
							<Text>
								Loading accounts{' '}
								<LoaderCircleIcon className="size-5 animate-spin" />
							</Text>
						) : (
							<Listbox
								name="account"
								value={transaction?.account}
								onChange={handleAccount}
								placeholder="Select account&hellip;"
							>
								{accounts.map((account) => (
									<ListboxOption
										key={account.id}
										value={account}
										className="flex gap-2"
									>
										<IconView name={account.icon} className="size-4" />
										{account.name}
									</ListboxOption>
								))}
							</Listbox>
						)}
					</Field>

					<Field className="col-span-2 md:col-span-1">
						<Label>Destination</Label>
						{isAccountLoading ? (
							<Text>
								Loading accounts{' '}
								<LoaderCircleIcon className="size-5 animate-spin" />
							</Text>
						) : (
							<Listbox
								name="destination"
								disabled={transaction.operation !== 'transfer'}
								value={transaction?.destination}
								onChange={handleDestination}
								placeholder="Select account&hellip;"
							>
								<ListboxOption value={null} className="flex gap-2">
									<IconView name={''} className="size-4" />
									No account
								</ListboxOption>
								{accounts
									.filter((account) => account.id !== transaction?.account?.id)
									.map((account) => (
										<ListboxOption
											key={account.id}
											value={account}
											className="flex gap-2"
										>
											<IconView name={account.icon} className="size-4" />
											{account.name}
										</ListboxOption>
									))}
							</Listbox>
						)}
					</Field>
				</div>

				<div className="flex items-center gap-4">
					<Field className="flex-1">
						<Label>Budget</Label>
						{isBudgetLoading ? (
							<Text>
								Loading budgets{' '}
								<LoaderCircleIcon className="size-5 animate-spin" />
							</Text>
						) : (
							<Listbox
								name="budget"
								value={transaction?.budget}
								onChange={handleBudget}
								placeholder="Select budget&hellip;"
							>
								<ListboxOption value={null} className="flex gap-2">
									<IconView name={''} className="size-4" />
									No budget
								</ListboxOption>
								{budgets.map((budget) => (
									<ListboxOption
										key={budget.id}
										value={budget}
										className="flex gap-2"
									>
										<IconView name={budget.icon} className="size-4" />
										{budget.name}
									</ListboxOption>
								))}
							</Listbox>
						)}
					</Field>

					<Field className="flex h-[73px] flex-col items-center justify-between">
						<Label>Is paid</Label>
						<Switch
							className="mb-2"
							name="isPaid"
							color="amber"
							onChange={handleSwitch}
							checked={transaction?.isPaid}
						/>
					</Field>
				</div>

				<Field>
					<div className="flex items-center gap-2">
						<Label className="grow text-left">Reference date</Label>
						<Tooltip message="Moves the transaction to another date’s budget">
							<InfoIcon className="mr-2 size-5" />
						</Tooltip>
					</div>
					<Input
						className="mt-3"
						name="referenceDate"
						type="date"
						value={transaction.referenceDate}
						onChange={handleChange}
					/>
				</Field>

				<SpreadForm transaction={transaction} handleChange={handleChange} />

				<DialogActions>
					<div>
						{transaction?.id && (
							<ConfirmButton
								className="w-full justify-center sm:w-auto sm:justify-start"
								message="This transaction will be permanently deleted. This action cannot be undone."
								type="button"
								color="red"
								size="sm:px-2.5 sm:py-1.5 p-2.5"
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
