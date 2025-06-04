import { useState, useRef, FormEvent, ChangeEvent, SetStateAction, Dispatch } from 'react';
import { Transaction, TransactionIn } from '@/lib/transaction/transaction.model';
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
import { formatForInput } from '@/lib/shared/date.utils';

export type TransactionFormProps = {
	transaction: TransactionIn;
	setTransaction: Dispatch<SetStateAction<TransactionIn>>;
	isOpen: boolean;
	closeFormAction: () => void;
};

export default function TransactionForm({
	transaction,
	setTransaction,
	isOpen,
	closeFormAction,
}: TransactionFormProps) {
	const formRef = useRef<HTMLFormElement>(null);
	const { addItem, editItem, deleteItem } = useTransactionList();

	const [operation, setOperation] = useState<'expense' | 'income'>(
		Number(transaction.amount) > 0 ? 'income' : 'expense',
	);

	const { data: budgets } = useSWR<Budget[]>('/api/budgets', fetcher);

	function applySign(value: string | number, operation: 'income' | 'expense') {
		const num = Math.abs(Number(value));
		const signedValue = operation === 'expense' ? -num : num;
		return signedValue === 0 ? '' : signedValue.toString();
	}

	const handleOperationChange = (newOperation: 'income' | 'expense') => {
		setOperation(newOperation);
		setTransaction((prev) => ({ ...prev, amount: applySign(prev.amount, newOperation) }));
	};

	const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
		setTransaction((prev) => ({ ...prev, amount: applySign(e.target.value, operation) }));
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
		setTransaction((prev) => ({ ...prev, [e.target.name]: e.target.value }));

	const handleIsPaid = (isPaid: boolean) => setTransaction((prev) => ({ ...prev, isPaid }));

	const handleBudget = (budget: Budget | null) => setTransaction((prev) => ({ ...prev, budget }));

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const finalTransaction = { ...transaction, amount: Number(transaction.amount) };

		if (transaction.id) editTransaction(finalTransaction);
		else addTransaction(finalTransaction);

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
		if (transaction.id) {
			deleteItem(transaction.id);

			void deleteTransactionDB(transaction.id);
		}
	}

	return (
		<Dialog open={isOpen} onClose={closeFormAction}>
			<DialogTitle className="flex items-center justify-between">
				<span>{transaction.id ? 'Edit Transaction' : 'Add Transaction'}</span>
				<Button onClick={closeFormAction} size="p-1">
					<XIcon />
				</Button>
			</DialogTitle>

			<form className="mt-4 space-y-4" onSubmit={handleSubmit}>
				<OperationSelector value={operation} onChangeAction={handleOperationChange} />
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
						<MoneyInput name="amount" onChange={handleAmountChange} value={transaction.amount} />
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
								value={transaction.budget}
								onChange={handleBudget}
								placeholder="Select budget&hellip;"
							>
								<ListboxOption value={null} className="flex gap-2">
									<IconView name={''} className="size-4" />
									No budget
								</ListboxOption>
								{budgets.map((budget) => (
									<ListboxOption key={budget.id} value={budget} className="flex gap-2">
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
							onChange={handleIsPaid}
							className="mb-2"
							name="isPaid"
							color="amber"
							defaultChecked={transaction.isPaid}
						/>
					</Field>
				</div>

				<Field className="col-span-2">
					<Label>Reference date</Label>
					<Input
						onChange={handleChange}
						name="referenceDate"
						type="date"
						value={transaction.referenceDate}
					/>
				</Field>

				<DialogActions>
					<div>
						{transaction.id && (
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
