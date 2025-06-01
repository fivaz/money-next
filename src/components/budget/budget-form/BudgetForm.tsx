'use client';
import { useRef, useState, useTransition } from 'react';
import { type Budget } from '@/lib/budget/budget.model';
import { Field, Label } from '@/components/base/fieldset';
import { Input } from '@/components/base/input';
import { Dialog, DialogActions, DialogTitle } from '@/components/base/dialog';
import { Button } from '@/components/base/button';
import { saveBudget } from '@/lib/budget/budget.actions';
import { XIcon } from 'lucide-react';
import { buildBudget } from '@/lib/budget/budget.utils';
import MoneyInput from '@/components/MoneyInput';
import IconPicker from '@/components/icon-picker/IconPicker';

export type BudgetFormProps = {
	budget?: Budget;
	isOpen: boolean;
	closeFormAction: () => void;
	onAddOptimisticAction: (budget: Budget) => void;
	onConfirmSaveAction: (tempId: number, realBudget: Budget) => void;
	onDeleteAction?: (budget: Budget) => void;
};

export default function BudgetForm({
	budget,
	isOpen,
	closeFormAction,
	onAddOptimisticAction,
	onConfirmSaveAction,
	onDeleteAction,
}: BudgetFormProps) {
	const [isPending, startTransition] = useTransition();
	const [amount, setAmount] = useState<string>(budget?.amount.toString() || '');
	const formRef = useRef<HTMLFormElement>(null); // Add ref to access form element

	const isEditing = !!budget?.id;

	const resetForm = () => {
		// Reset form and state after successful submission
		formRef.current?.reset(); // Reset form inputs
	};

	async function handleSubmit(formData: FormData) {
		const id = isEditing ? budget.id! : -Date.now();
		const newBudgetWithoutId = buildBudget(formData);
		const newBudget = { id, ...newBudgetWithoutId, transactions: [] };

		onAddOptimisticAction(newBudget);

		startTransition(async () => {
			try {
				const saved = await saveBudget(newBudget, isEditing);
				onConfirmSaveAction(id, saved);
				resetForm();
				closeFormAction();
			} catch (err) {
				console.error('Failed to save budget:', err);
			}
		});
	}

	function handleDelete() {
		if (budget && onDeleteAction) {
			onDeleteAction(budget);
		}
	}

	return (
		<Dialog open={isOpen} onClose={closeFormAction}>
			<DialogTitle className="flex items-center justify-between">
				<span>{isEditing ? 'Edit Budget' : 'Add Budget'}</span>
				<Button onClick={closeFormAction} outline size="p-1">
					<XIcon />
				</Button>
			</DialogTitle>

			<form className="z-20 mt-4 space-y-4" action={handleSubmit} ref={formRef}>
				<input type="hidden" name="id" defaultValue={budget?.id} />
				<div className="grid grid-cols-3 gap-4">
					<Field className="col-span-2">
						<Label>Name</Label>
						<Input name="name" defaultValue={budget?.name} />
					</Field>
					<Field className="col-span-1">
						<Label>Amount</Label>
						<MoneyInput name="amount" defaultValue={amount} />
					</Field>
				</div>

				<IconPicker name="icon" defaultValue={budget?.icon} />

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
