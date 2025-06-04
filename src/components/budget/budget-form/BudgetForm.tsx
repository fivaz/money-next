'use client';
import { FormEvent, useRef } from 'react';
import { type Budget } from '@/lib/budget/budget.model';
import { Field, Label } from '@/components/base/fieldset';
import { Input } from '@/components/base/input';
import { Dialog, DialogActions, DialogTitle } from '@/components/base/dialog';
import Button from '@/components/Button';
import { deleteBudget, saveBudget } from '@/lib/budget/budget.actions';
import { XIcon } from 'lucide-react';
import { buildBudget } from '@/lib/budget/budget.utils';
import MoneyInput from '@/components/MoneyInput';
import IconPicker from '@/components/icon-picker/IconPicker';

export type BudgetFormProps = {
	budget?: Budget;
	isOpen: boolean;
	closeFormAction: () => void;
	onAddOrUpdateAction: (budget: Budget) => number;
	onConfirmSaveAction: (tempId: number, realBudget: Budget) => void;
	onDeleteAction?: (budget: Budget) => void;
};

export default function BudgetForm({
	budget,
	isOpen,
	closeFormAction,
	onAddOrUpdateAction,
	onConfirmSaveAction,
	onDeleteAction,
}: BudgetFormProps) {
	const formRef = useRef<HTMLFormElement>(null); // Add ref to access form element

	const isEditing = !!budget?.id;

	const resetForm = () => formRef.current?.reset();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const newBudget = buildBudget(formData);

		const tempId = onAddOrUpdateAction(newBudget);
		resetForm();
		closeFormAction();

		try {
			const saved = await saveBudget(newBudget);
			onConfirmSaveAction(tempId, saved);
		} catch (err) {
			console.error('Failed to save source:', err);
		}
	};

	async function handleDelete() {
		if (budget && onDeleteAction) {
			onDeleteAction(budget);
			await deleteBudget(budget.id);
		}
	}

	return (
		<Dialog open={isOpen} onClose={closeFormAction}>
			<DialogTitle className="flex items-center justify-between">
				<span>{isEditing ? 'Edit Budget' : 'Add Budget'}</span>
				<Button onClick={closeFormAction} size="p-1">
					<XIcon />
				</Button>
			</DialogTitle>

			<form className="z-20 mt-4 space-y-4" onSubmit={handleSubmit} ref={formRef}>
				<input type="hidden" name="id" defaultValue={budget?.id} />
				<div className="grid grid-cols-3 gap-4">
					<Field className="col-span-2">
						<Label>Name</Label>
						<Input name="name" defaultValue={budget?.name} />
					</Field>
					<Field className="col-span-1">
						<Label>Amount</Label>
						<MoneyInput name="amount" defaultValue={budget?.amount.toString()} />
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
					<Button type="submit">Save</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
}
