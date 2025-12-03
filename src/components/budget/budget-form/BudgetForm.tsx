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

import ConfirmButton from '@/components/Button/ConfirmButton';
import { Switch } from '@/components/base/switch';
import JarIcon from '@/components/icons/JarIcon';
import Tooltip from '@/components/Tooltip';
import { mutateBudgets } from '@/lib/budget/budget.utils-api';
import { useYearMonth } from '@/lib/shared/date.utils.client';

type BudgetFormProps = {
	budget?: Budget;
	isOpen: boolean;
	closeFormAction: () => void;
};

export default function BudgetForm({ budget, isOpen, closeFormAction }: BudgetFormProps) {
	const formRef = useRef<HTMLFormElement>(null);
	const { addItem, editItem, deleteItem } = useBudgetList();

	const [_y, _m, asOf] = useYearMonth();

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const newBudget = buildBudget(formData);

		if (budget?.id) void editBudget(newBudget);
		else void addBudget(newBudget);

		formRef.current?.reset();
		closeFormAction();
	};

	const addBudget = async (budgetWithoutId: Omit<Budget, 'id'>) => {
		const budget = { ...budgetWithoutId, id: -Date.now() };
		addItem(budget);

		await addBudgetDB(budgetWithoutId);
		mutateBudgets(asOf);
	};

	const editBudget = async (budget: Budget) => {
		editItem(budget);

		await editBudgetDB(budget);
		mutateBudgets(asOf);
	};

	const handleDelete = async () => {
		if (budget?.id) {
			deleteItem(budget.id);

			await deleteBudgetDB(budget.id);
			mutateBudgets(asOf);
		}
	};

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

				<div className="grid grid-cols-5 gap-4 pb-1">
					<Field className="col-span-5 md:col-span-2">
						<Label>Start at</Label>
						<Input name="startAt" type="date" defaultValue={budget?.startAt || ''} />
					</Field>

					<Field className="col-span-5 md:col-span-2">
						<Label>End at</Label>
						<Input name="endAt" type="date" defaultValue={budget?.endAt || ''} />
					</Field>

					<Field className="col-span-5 flex h-[73px] items-center justify-between md:col-span-1 md:flex-col">
						<div className="flex gap-2 truncate">
							<Label className="block truncate md:w-[40px]">
								<span>Accumulative</span>
							</Label>
							<Tooltip
								message={`accumulative budget is a budget that rolls over to the next month`}
							>
								<JarIcon className="size-5 shrink-0" />
							</Tooltip>
						</div>
						<Switch
							className="md:mb-2"
							name="isAccumulative"
							color="amber"
							defaultChecked={budget?.isAccumulative ?? false}
						/>
					</Field>
				</div>

				<IconPicker name="icon" defaultValue={budget?.icon} />

				<DialogActions>
					<div>
						{budget?.id && (
							<ConfirmButton
								className="w-full justify-center sm:w-auto sm:justify-start"
								message="This budget will be permanently deleted. This action cannot be undone."
								size="sm:px-2.5 sm:py-1.5 p-2.5"
								type="button"
								color="red"
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
