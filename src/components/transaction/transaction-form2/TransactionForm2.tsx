import { FormEvent, useRef, useState } from 'react';
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

type TransactionFormProps = {
	transaction?: Partial<Transaction>;
	isOpen: boolean;
	closeFormAction: () => void;
};

export default function TransactionForm2({
	transaction,
	isOpen,
	closeFormAction,
}: TransactionFormProps) {
	const { createTransaction, updateTransaction, deleteTransaction } =
		useTransactionList();

	const { budgets, isLoading: isBudgetLoading } = fetchBudgets();

	const { accounts, isLoading: isAccountLoading } = fetchAccounts();

	const formRef = useRef<HTMLFormElement | null>(null);

	const [amount, setAmount] = useState<string>(
		transaction?.amount?.toString() || '',
	);

	const resetForm = () => {
		setTimeout(() => {
			formRef.current?.reset();
			setAmount(transaction?.amount?.toString() || '');
		}, 200);
	};

	const closeForm = () => {
		resetForm();
		closeFormAction();
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const finalTransaction = buildTransaction(formData, budgets, accounts);

		if (transaction?.id) void updateTransaction(finalTransaction);
		else void createTransaction(finalTransaction);

		closeFormAction();
		resetForm();
	};

	const handleDelete = async () => {
		if (transaction?.id) {
			void deleteTransaction(transaction?.id);
		}
	};

	return (
		<Dialog open={isOpen} onClose={closeForm}>
			<DialogTitle className="flex items-center justify-between">
				<span>{transaction?.id ? 'Edit Transaction' : 'Add Transaction'}</span>
				<Button onClick={closeForm} size="p-1">
					<XIcon />
				</Button>
			</DialogTitle>

			<form ref={formRef} className="mt-4 space-y-4" onSubmit={handleSubmit}>
				<input type="hidden" name="id" defaultValue={transaction?.id} />
				<OperationSelector
					defaultValue={
						transaction && Number(transaction?.amount) > 0
							? 'income'
							: 'expense'
					}
				/>
				<Field>
					<Label>Description</Label>
					<Textarea
						name="description"
						defaultValue={transaction?.description}
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
							defaultValue={transaction?.date}
							autoFocus
						/>
					</Field>

					<Field className="col-span-1">
						<Label>Amount</Label>
						<MoneyInput
							required
							name="amount"
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
						/>
					</Field>
				</div>

				<Field>
					<Label>Account</Label>
					{isAccountLoading ? (
						<Text>
							Loading accounts{' '}
							<LoaderCircleIcon className="size-5 animate-spin" />
						</Text>
					) : (
						<Listbox
							name="account"
							defaultValue={transaction?.account?.id}
							placeholder="Select account&hellip;"
						>
							<ListboxOption value={null} className="flex gap-2">
								<IconView name={''} className="size-4" />
								No account
							</ListboxOption>
							{accounts.map((account) => (
								<ListboxOption
									key={account.id}
									value={account.id}
									className="flex gap-2"
								>
									<IconView name={account.icon} className="size-4" />
									{account.name}
								</ListboxOption>
							))}
						</Listbox>
					)}
				</Field>

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
								defaultValue={transaction?.budget?.id}
								placeholder="Select budget&hellip;"
							>
								<ListboxOption value={null} className="flex gap-2">
									<IconView name={''} className="size-4" />
									No budget
								</ListboxOption>
								{budgets.map((budget) => (
									<ListboxOption
										key={budget.id}
										value={budget.id}
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
							defaultChecked={transaction?.isPaid ?? true}
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
						defaultValue={transaction?.referenceDate || ''}
					/>
				</Field>

				<SpreadForm transaction={transaction} amount={amount} />

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
