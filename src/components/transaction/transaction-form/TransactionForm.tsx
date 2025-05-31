'use client';
import { type PropsWithChildren, useTransition } from 'react';
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

	async function handleSubmit(formData: FormData) {
		const id = transaction?.id || Date.now();

		const newTransaction = buildTransaction(formData);

		onAddOptimisticAction({ id, ...newTransaction });

		startTransition(async () => {
			try {
				const saved = await saveTransaction(newTransaction);
				onConfirmSaveAction(id, saved);
				closeFormAction();
			} catch (err) {
				if (err instanceof Error) {
					console.error(err.message); // log to dev console
				} else {
					console.error(err);
				}
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
			<DialogTitle className="font-semibold">
				<span>{transaction?.id ? 'Edit Transaction' : 'Add Transaction'}</span>
				<Button onClick={closeFormAction}>
					<XIcon />
				</Button>
			</DialogTitle>

			<form className="z-20 mt-4 space-y-4" action={handleSubmit}>
				<OperationSelector value={transaction?.id ? 'income' : 'expense'} />
				<Field>
					<Label>Description</Label>
					<Textarea name="description" defaultValue={transaction?.description} />
				</Field>
				<div className="grid grid-cols-3 gap-4">
					<Field className="col-span-2">
						<Label>Date</Label>
						<Input name="date" type="datetime-local" defaultValue={transaction?.date} autoFocus />
					</Field>

					<Field className="col-span-1">
						<Label>Amount</Label>
						<Input name="amount" defaultValue={transaction?.amount} />
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
					{transaction?.id && onDeleteAction && (
						<Button type="button" color="red" onClick={handleDelete}>
							Delete
						</Button>
					)}

					<Button type="submit"> {isPending ? 'Saving...' : 'Save'}</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
}
