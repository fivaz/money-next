'use client';
import { type PropsWithChildren, useState } from 'react';
import Button, { type ButtonProps } from '@/components/Button';
import { ReceiptTextIcon } from 'lucide-react';
import TransactionForm, {
	type TransactionFormProps,
} from '@/components/transaction/transaction-form/TransactionForm';

type TransactionFormButtonProps = PropsWithChildren &
	ButtonProps &
	Pick<
		TransactionFormProps,
		'transaction' | 'onConfirmSaveAction' | 'onAddOrUpdateAction' | 'onDeleteAction'
	>;

export default function TransactionFormButton({
	children,
	transaction,
	onAddOrUpdateAction,
	onConfirmSaveAction,
	onDeleteAction,
	...props
}: TransactionFormButtonProps) {
	const [isOpen, setIsOpen] = useState(false);

	const closeDialog = () => setIsOpen(false);
	const openDialog = () => setIsOpen(true);

	return (
		<>
			<Button onClick={openDialog} {...props}>
				{children || (
					<>
						<ReceiptTextIcon />
						Add Transaction
					</>
				)}
			</Button>

			<TransactionForm
				transaction={transaction}
				onAddOrUpdateAction={onAddOrUpdateAction}
				onConfirmSaveAction={onConfirmSaveAction}
				isOpen={isOpen}
				closeFormAction={closeDialog}
				onDeleteAction={onDeleteAction}
			/>
		</>
	);
}
