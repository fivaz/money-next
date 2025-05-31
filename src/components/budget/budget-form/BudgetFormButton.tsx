'use client';
import { type PropsWithChildren, useState } from 'react';
import Button from '@/components/Button';
import { PlusIcon } from 'lucide-react';
import BudgetForm, { type BudgetFormProps } from '@/components/budget/budget-form/BudgetForm';

type BudgetFormButtonProps = PropsWithChildren &
	Pick<
		BudgetFormProps,
		'budget' | 'onConfirmSaveAction' | 'onAddOptimisticAction' | 'onDeleteAction'
	>;

export default function BudgetFormButton({
	children,
	budget,
	onAddOptimisticAction,
	onConfirmSaveAction,
	onDeleteAction,
}: BudgetFormButtonProps) {
	const [isOpen, setIsOpen] = useState(false);

	const closeDialog = () => setIsOpen(false);
	const openDialog = () => setIsOpen(true);

	return (
		<>
			<Button onClick={openDialog}>
				{children || (
					<>
						<PlusIcon />
						Budget
					</>
				)}
			</Button>

			<BudgetForm
				budget={budget}
				onAddOptimisticAction={onAddOptimisticAction}
				onConfirmSaveAction={onConfirmSaveAction}
				isOpen={isOpen}
				closeFormAction={closeDialog}
				onDeleteAction={onDeleteAction}
			/>
		</>
	);
}
