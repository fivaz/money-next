'use client';
import { useState, useRef, FormEvent } from 'react';
import { Transaction } from '@/lib/transaction/transaction.model';
import OperationSelector from '@/components/transaction/transaction-form/OperationSelector';
import { Field, Label } from '@/components/base/fieldset';
import { Textarea } from '@/components/base/textarea';
import { Text } from '@/components/base/text';
import { Input } from '@/components/base/input';
import { Switch } from '@/components/base/switch';
import { Dialog, DialogActions, DialogTitle } from '@/components/base/dialog';
import Button from '@/components/Button';
import {
	addTransactionDB,
	deleteTransactionDB,
	editTransactionDB,
} from '@/lib/transaction/transaction.actions';
import { LoaderCircleIcon, XIcon } from 'lucide-react';
import { buildTransaction } from '@/lib/transaction/transaction.utils';
import MoneyInput from '@/components/MoneyInput';
import { Listbox, ListboxOption } from '@/components/base/listbox';
import { Budget } from '@/lib/budget/budget.model';
import useSWR from 'swr';
import { fetcher } from '@/lib/shared/api-client.utils';
import IconView from '@/components/icon-picker/IconView';
import { useTransactionList } from '@/lib/transaction/TransactionListProvider';

export type TransactionFormProps = {
	transaction?: Transaction;
	isOpen: boolean;
	closeFormAction: () => void;
};

export default function TransactionForm({
	transaction,
	isOpen,
	closeFormAction,
}: TransactionFormProps) {
	const formRef = useRef<HTMLFormElement>(null);
	const { addItem, editItem, deleteItem } = useTransactionList();

	const [operation, setOperation] = useState<'expense' | 'income'>(
		transaction?.amount && transaction.amount > 0 ? 'income' : 'expense',
	);
	const [amount, setAmount] = useState<string>(transaction?.amount.toString() || '');

	const { data: budgets, error } = useSWR<Budget[]>('/api/budgets', fetcher);

	const parseAmount = (amount: string, operation: 'expense' | 'income'): string => {
		const positiveValue = Math.abs(Number(amount));
		return (operation === 'income' ? positiveValue : positiveValue * -1).toString();
	};

	const handleOperationChange = (newOperation: 'expense' | 'income') => {
		setOperation(newOperation);
		setAmount((amount) => parseAmount(amount, newOperation));
	};

	const resetForm = () => {
		// Reset form and state after successful submission
		formRef.current?.reset(); // Reset form inputs
		setAmount(''); // Reset controlled amount input
		setOperation('expense'); // Reset operation
	};

	const handleChangeAmount = (newAmount: string) => setAmount(parseAmount(newAmount, operation));

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const newTransaction = buildTransaction(formData);

		transaction?.id ? editTransaction(newTransaction) : addTransaction(newTransaction);

		resetForm();
		closeFormAction();
	};

	const addTransaction = (transactionWithoutId: Omit<Transaction, 'id'>) => {
		const transaction = { ...transactionWithoutId, id: -Date.now() };
		addItem(transaction);

		void addTransactionDB(transactionWithoutId);
	};

	const editTransaction = (transaction: Transaction) => {
		editItem(transaction);

		void editTransactionDB(transaction);
	};

	async function handleDelete() {
		if (transaction?.id) {
			deleteItem(transaction.id);

			void deleteTransactionDB(transaction.id);
		}
	}

	return (
		<Dialog open={isOpen} onClose={closeFormAction}>
			<DialogTitle className="flex items-center justify-between">
				<span>{transaction?.id ? 'Edit Transaction' : 'Add Transaction'}</span>
				<Button onClick={closeFormAction} size="p-1">
					<XIcon />
				</Button>
			</DialogTitle>

			<form className="mt-4 space-y-4" onSubmit={handleSubmit} ref={formRef}>
				<input type="hidden" name="id" defaultValue={transaction?.id} />
				<OperationSelector value={operation} onChangeAction={handleOperationChange} />
				<Field>
					<Label>Description</Label>
					<Textarea name="description" defaultValue={transaction?.description} />
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
						<MoneyInput name="amount" value={amount} onChange={handleChangeAmount} />
					</Field>
				</div>

				<div className="flex items-center gap-4">
					<Field className="flex-1">
						<Label>Budget</Label>
						{!budgets ? (
							<Text>
								Loading budgets <LoaderCircleIcon className="size-5 animate-spin" />
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
									<ListboxOption key={budget.id} value={budget.id} className="flex gap-2">
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
							defaultChecked={transaction?.isPaid}
						/>
					</Field>
				</div>

				<Field className="col-span-2">
					<Label>Reference date</Label>
					<Input name="referenceDate" type="date" defaultValue={transaction?.referenceDate} />
				</Field>

				<DialogActions>
					<div>
						{transaction?.id && (
							<Button type="button" color="red" onClick={handleDelete}>
								Delete
							</Button>
						)}
					</div>
					<Button type="submit">Save</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
}
