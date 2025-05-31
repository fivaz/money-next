import { type PropsWithChildren } from 'react';
import { Transaction } from '@/lib/transaction/transaction.model';
import { Heading } from '@/components/base/heading';
import OperationSelector from '@/components/transaction/transaction-form/OperationSelector';
import { Field, Fieldset, Label } from '@/components/base/fieldset';
import { Textarea } from '@/components/base/textarea';
import { Text } from '@/components/base/text';
import { Input } from '@/components/base/input';
import { Switch, SwitchField } from '@/components/base/switch';
import { DialogActions, DialogTitle } from '@/components/base/dialog';
import { Button } from '@/components/base/button';
import { saveTransaction } from '@/app/actions/transaction';

type TransactionFormProps = PropsWithChildren<{
	transaction?: Transaction;
}>;

export default function TransactionForm({ children, transaction }: TransactionFormProps) {
	async function handleSubmit(formData: FormData) {
		'use server';
		await saveTransaction(formData);
	}

	return (
		<>
			<DialogTitle className="font-semibold">
				{transaction?.id ? 'Edit Transaction' : 'Add Transaction'}
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
					<Button type="submit">Save</Button>
				</DialogActions>
			</form>
		</>
	);
}
