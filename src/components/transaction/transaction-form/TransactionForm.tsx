import { FormEvent, useRef, useState } from 'react';
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
import { InfoIcon, LoaderCircleIcon, XIcon } from 'lucide-react';
import { Listbox, ListboxOption } from '@/components/base/listbox';
import { Budget } from '@/lib/budget/budget.model';
import useSWR from 'swr';
import { fetcher } from '@/lib/shared/api-client.utils';
import IconView from '@/components/icon-picker/IconView';
import { useTransactionList } from '@/lib/transaction/TransactionListProvider';
import { buildTransaction } from '@/lib/transaction/transaction.utils';
import { useSearchParams } from 'next/navigation';
import { buildDate, formatForInput, getParamsDate } from '@/lib/shared/date.utils';
import MoneyInput from '@/components/MoneyInput';
import { API } from '@/lib/const';
import Tooltip from '@/components/Tooltip';
import { SpreadForm } from '@/components/transaction/transaction-form/SpreadForm';
import ConfirmButton from '@/components/Button/ConfirmButton';

type TransactionFormProps = {
	transaction?: Transaction;
	isOpen: boolean;
	closeFormAction: () => void;
};

export default function TransactionForm({
	transaction,
	isOpen,
	closeFormAction,
}: TransactionFormProps) {
	const { addItem, editItem, deleteItem, mutate } = useTransactionList();

	const searchParams = useSearchParams();
	const [year, month] = getParamsDate(searchParams);
	const date = buildDate(year, month);

	const { data: budgets, isLoading } = useSWR<Budget[]>(`/api/${API.BUDGETS}`, fetcher);

	const formRef = useRef<HTMLFormElement | null>(null);

	const [amount, setAmount] = useState<string>(transaction?.amount?.toString() || '');

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
		const finalTransaction = buildTransaction(formData, budgets);

		if (transaction?.id) void editTransaction(finalTransaction);
		else void addTransaction(finalTransaction);

		closeFormAction();
		resetForm();
	};

	const addTransaction = async (transactionWithoutId: Omit<Transaction, 'id'>) => {
		const transactionWithId = { ...transactionWithoutId, id: -Date.now() };
		addItem(transactionWithId);

		await addTransactionDB(transactionWithoutId, !!mutate);
		mutate?.();
	};

	const editTransaction = async (transaction: Transaction) => {
		editItem(transaction);

		await editTransactionDB(transaction, !!mutate);
		mutate?.();
	};

	const handleDelete = async () => {
		if (transaction?.id) {
			deleteItem(transaction?.id);

			await deleteTransactionDB(transaction?.id, !!mutate);
			mutate?.();
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
					defaultValue={transaction && Number(transaction?.amount) > 0 ? 'income' : 'expense'}
				/>
				<Field>
					<Label>Description</Label>
					<Textarea name="description" defaultValue={transaction?.description} autoFocus />
				</Field>
				<div className="grid grid-cols-3 gap-4">
					<Field className="col-span-2">
						<Label>Date</Label>
						<Input
							name="date"
							required
							type="datetime-local"
							defaultValue={transaction?.date || formatForInput(date)}
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

				<div className="flex items-center gap-4">
					<Field className="flex-1">
						<Label>Budget</Label>
						{isLoading ? (
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
								{budgets?.map((budget) => (
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
							defaultChecked={transaction?.isPaid || true}
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
						defaultValue={transaction?.referenceDate}
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
