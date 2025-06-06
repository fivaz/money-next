'use client';
import { FormEvent, useRef } from 'react';
import { Field, Label } from '@/components/base/fieldset';
import { Input } from '@/components/base/input';
import { Dialog, DialogActions, DialogTitle } from '@/components/base/dialog';
import Button from '@/components/Button';
import { XIcon } from 'lucide-react';
import MoneyInput from '@/components/MoneyInput';
import IconPicker from '@/components/icon-picker/IconPicker';
import { useBudgetList } from '@/lib/budget/BudgetListProvider';
import { buildBudget } from '@/lib/budget/budget.utils';
import type { Budget } from '@/lib/budget/budget.model';
import { addBudgetDB, deleteBudgetDB, editBudgetDB } from '@/lib/budget/budget.actions';

export type BudgetFormProps = {
	budget?: Budget;
	isOpen: boolean;
	closeFormAction: () => void;
};

export default function BudgetForm({ budget, isOpen, closeFormAction }: BudgetFormProps) {
	const formRef = useRef<HTMLFormElement>(null);
	const { addItem, editItem, deleteItem } = useBudgetList();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const newBudget = buildBudget(formData);

		if (budget?.id) editBudget(newBudget);
		else addBudget(newBudget);

		formRef.current?.reset();
		closeFormAction();
	};

	const addBudget = (budgetWithoutId: Omit<Budget, 'id'>) => {
		const budget = { ...budgetWithoutId, id: -Date.now() };
		addItem(budget);

		void addBudgetDB(budgetWithoutId);
	};

	const editBudget = (budget: Budget) => {
		editItem(budget);

		void editBudgetDB(budget);
	};

	async function handleDelete() {
		if (budget?.id) {
			deleteItem(budget.id);

			void deleteBudgetDB(budget.id);
		}
	}

	return (
		<Dialog open={isOpen} onClose={closeFormAction}>
			<DialogTitle className="flex items-center justify-between">
				<span>{budget?.id ? 'Edit Budget' : 'Add Budget'}</span>
				<Button onClick={closeFormAction} size="p-1">
					<XIcon />
				</Button>
			</DialogTitle>

			<form className="z-20 mt-4 space-y-4" onSubmit={handleSubmit} ref={formRef}>
				<input type="hidden" name="id" defaultValue={budget?.id} />
				<input type="hidden" name="sortOrder" defaultValue={budget?.sortOrder} />
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
						{budget?.id && (
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
