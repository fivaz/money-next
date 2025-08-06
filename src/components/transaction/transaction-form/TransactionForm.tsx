import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useRef } from 'react';
import OperationSelector from '@/components/transaction/transaction-form/OperationSelector';
import { Field, Label } from '@/components/base/fieldset';
import { Textarea } from '@/components/base/textarea';
import { Input } from '@/components/base/input';
import { Dialog, DialogActions, DialogTitle } from '@/components/base/dialog';
import Button from '@/components/Button';
import { InfoIcon, XIcon } from 'lucide-react';
import { useTransactionList } from '@/lib/transaction/useTransactionList';
import MoneyInput from '@/components/MoneyInput';
import Tooltip from '@/components/Tooltip';
import { RecurringSection } from '@/components/transaction/transaction-form/RecurringSection';
import ConfirmButton from '@/components/Button/ConfirmButton';
import {
	getTransactionFromIn,
	TransactionIn,
} from '@/components/transaction/transaction-form/transaction-form.utils';
import AccountsSection from '@/components/transaction/transaction-form/AccountsSection';
import BudgetAndPaidSection from '@/components/transaction/transaction-form/BudgetAndPaidSection';

type TransactionFormProps = {
	transactionIn: TransactionIn;
	setTransactionIn: Dispatch<SetStateAction<TransactionIn>>;
	isOpen: boolean;
	closeFormAction: () => void;
};

export default function TransactionForm({
	transactionIn,
	setTransactionIn,
	isOpen,
	closeFormAction,
}: TransactionFormProps) {
	const { createTransaction, updateTransaction, deleteTransaction } = useTransactionList();

	const formRef = useRef<HTMLFormElement | null>(null);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const transaction = getTransactionFromIn(transactionIn);

		if (transactionIn?.id) void updateTransaction(transaction);
		else void createTransaction(transaction);

		closeFormAction();
	};

	const handleDelete = () => {
		if (transactionIn?.id) {
			void deleteTransaction(transactionIn);
		}
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setTransactionIn((transaction) => ({
			...transaction,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<Dialog open={isOpen} onClose={closeFormAction}>
			<DialogTitle className="flex items-center justify-between">
				<span>{transactionIn?.id ? 'Edit Transaction' : 'Add Transaction'}</span>
				<Button onClick={closeFormAction} size="p-1">
					<XIcon />
				</Button>
			</DialogTitle>

			<form ref={formRef} className="mt-4 space-y-4" onSubmit={handleSubmit}>
				<OperationSelector setTransaction={setTransactionIn} transaction={transactionIn} />

				<Field>
					<Label>Description</Label>
					<Textarea
						name="description"
						value={transactionIn.description}
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
							value={transactionIn.date}
							autoFocus
						/>
					</Field>

					<Field className="col-span-1">
						<Label>Amount</Label>
						<MoneyInput
							required
							name="amount"
							value={transactionIn.amount ? transactionIn.amount.toString() : ''}
							onChange={handleChange}
						/>
					</Field>
				</div>

				<BudgetAndPaidSection transactionIn={transactionIn} setTransactionIn={setTransactionIn} />

				<AccountsSection transactionIn={transactionIn} setTransactionIn={setTransactionIn} />

				<Field className="mb-5">
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
						value={transactionIn.referenceDate}
						onChange={handleChange}
					/>
				</Field>

				{transactionIn?.operation === 'transfer' && (
					<RecurringSection transaction={transactionIn} handleChange={handleChange} />
				)}

				<DialogActions>
					<div>
						{transactionIn?.id > 0 && (
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
