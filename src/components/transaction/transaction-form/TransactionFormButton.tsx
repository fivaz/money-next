'use client';
import { type PropsWithChildren, useState } from 'react';
import { Button, ButtonProps } from '@/components/base/button';
import { ReceiptTextIcon } from 'lucide-react';
import TransactionForm, {
	type TransactionFormProps,
} from '@/components/transaction/transaction-form/TransactionForm';

type TransactionFormButtonProps = PropsWithChildren &
	ButtonProps &
	Pick<
		TransactionFormProps,
		'transaction' | 'onConfirmSaveAction' | 'onAddOptimisticAction' | 'onDeleteAction'
	>;

export default function TransactionFormButton({
	children,
	transaction,
	onAddOptimisticAction,
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
				onAddOptimisticAction={onAddOptimisticAction}
				onConfirmSaveAction={onConfirmSaveAction}
				isOpen={isOpen}
				closeFormAction={closeDialog}
				onDeleteAction={onDeleteAction}
			/>
		</>
	);
}
