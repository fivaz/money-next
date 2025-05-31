'use client';
import { type PropsWithChildren, useState } from 'react';
import Button from '@/components/Button';
import { PlusIcon } from 'lucide-react';
import TransactionForm, {
	type TransactionFormProps,
} from '@/components/transaction/transaction-form/TransactionForm';

type TransactionFormButtonProps = PropsWithChildren &
	Pick<TransactionFormProps, 'transaction' | 'onConfirmSaveAction' | 'onAddOptimisticAction'>;

export default function TransactionFormButton({
	children,
	transaction,
	onAddOptimisticAction,
	onConfirmSaveAction,
}: TransactionFormButtonProps) {
	const [isOpen, setIsOpen] = useState(false);

	const closeDialog = () => setIsOpen(false);
	const openDialog = () => setIsOpen(true);

	return (
		<>
			<Button onClick={openDialog}>
				{children || (
					<>
						<PlusIcon />
						Transaction
					</>
				)}
			</Button>

			<TransactionForm
				transaction={transaction}
				onAddOptimisticAction={onAddOptimisticAction}
				onConfirmSaveAction={onConfirmSaveAction}
				isOpen={isOpen}
				closeFormAction={closeDialog}
			/>
		</>
	);
}
