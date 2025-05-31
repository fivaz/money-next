'use client';
import { type PropsWithChildren, useState, useTransition, useRef } from 'react';
import { Transaction } from '@/lib/transaction/transaction.model';
import { Heading } from '@/components/base/heading';
import OperationSelector from '@/components/transaction/transaction-form/OperationSelector';
import { Field, Fieldset, Label } from '@/components/base/fieldset';
import { Textarea } from '@/components/base/textarea';
import { Text } from '@/components/base/text';
import { Input } from '@/components/base/input';
import { Switch, SwitchField } from '@/components/base/switch';
import { Dialog, DialogActions, DialogTitle } from '@/components/base/dialog';
import { Button } from '@/components/base/button';
import { saveTransaction } from '@/app/actions/transaction';
import { XIcon } from 'lucide-react';
import { buildTransaction } from '@/lib/transaction/transaction.utils';
import MoneyInput from '@/components/MoneyInput';

export type TransactionFormProps = {
	transaction?: Transaction;
	isOpen: boolean;
	closeFormAction: () => void;
	onAddOptimisticAction: (transaction: Transaction) => void;
	onConfirmSaveAction: (tempId: number, realTransaction: Transaction) => void;
	onDeleteAction?: (transaction: Transaction) => void;
};

export default function TransactionForm({
	transaction,
	isOpen,
	closeFormAction,
	onAddOptimisticAction,
	onConfirmSaveAction,
	onDeleteAction,
}: TransactionFormProps) {
	const [isPending, startTransition] = useTransition();
	const [operation, setOperation] = useState<'expense' | 'income'>(
		transaction?.amount && transaction.amount > 0 ? 'income' : 'expense',
	);
	const [amount, setAmount] = useState<string>(transaction?.amount.toString() || '');
	const formRef = useRef<HTMLFormElement>(null); // Add ref to access form element

	const isEditing = !!transaction?.id;

	function parseAmount(amount: string, operation: 'expense' | 'income'): string {
		const positiveValue = Math.abs(Number(amount));
		return (operation === 'income' ? positiveValue : positiveValue * -1).toString();
	}

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

	async function handleSubmit(formData: FormData) {
		const id = isEditing ? transaction.id! : Date.now();
		const newTransactionWithoutId = buildTransaction(formData);
		const newTransaction = { id, ...newTransactionWithoutId };

		onAddOptimisticAction(newTransaction);

		startTransition(async () => {
			try {
				const saved = await saveTransaction(newTransaction, isEditing);
				onConfirmSaveAction(id, saved);
				resetForm();
				closeFormAction();
			} catch (err) {
				console.error('Failed to save transaction:', err);
			}
		});
	}
	function handleDelete() {
		if (transaction && onDeleteAction) {
			onDeleteAction(transaction);
		}
	}

	return (
		<Dialog open={isOpen} onClose={closeFormAction}>
			<DialogTitle className="flex items-center justify-between">
				<span>{isEditing ? 'Edit Transaction' : 'Add Transaction'}</span>
				<Button onClick={closeFormAction} outline size="p-1">
					<XIcon />
				</Button>
			</DialogTitle>

			<form className="z-20 mt-4 space-y-4" action={handleSubmit} ref={formRef}>
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
						<Label>Amount {amount}</Label>
						<MoneyInput name="amount" value={amount} onChange={handleChangeAmount} />
					</Field>
				</div>

				<div className="flex items-center gap-4">
					<Text>budget</Text>

					<SwitchField>
						<Label>is paid</Label>
						<Switch name="isPaid" defaultChecked={transaction?.isPaid} />
					</SwitchField>
				</div>

				<Field className="col-span-2">
					<Label>Reference date</Label>
					<Input name="referenceDate" type="date" defaultValue={transaction?.referenceDate} />
				</Field>

				<DialogActions>
					<div>
						{isEditing && onDeleteAction && (
							<Button type="button" color="red" onClick={handleDelete}>
								Delete
							</Button>
						)}
					</div>
					<Button type="submit" disabled={isPending}>
						{isPending ? 'Saving...' : 'Save'}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
}
