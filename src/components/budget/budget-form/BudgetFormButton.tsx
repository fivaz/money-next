'use client';
import { type PropsWithChildren, useState } from 'react';
import Button from '@/components/Button';
import { PiggyBankIcon } from 'lucide-react';
import BudgetForm, { type BudgetFormProps } from '@/components/budget/budget-form/BudgetForm';

type BudgetFormButtonProps = PropsWithChildren &
	Pick<
		BudgetFormProps,
		'budget' | 'onConfirmSaveAction' | 'onAddOrUpdateAction' | 'onDeleteAction'
	>;

export default function BudgetFormButton({
	children,
	budget,
	onAddOrUpdateAction,
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
						<PiggyBankIcon className="size-5" />
						Add Budget
					</>
				)}
			</Button>

			<BudgetForm
				budget={budget}
				onAddOrUpdateAction={onAddOrUpdateAction}
				onConfirmSaveAction={onConfirmSaveAction}
				isOpen={isOpen}
				closeFormAction={closeDialog}
				onDeleteAction={onDeleteAction}
			/>
		</>
	);
}
