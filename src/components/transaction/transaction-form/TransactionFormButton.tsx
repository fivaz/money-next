'use client';
import { type PropsWithChildren, useState } from 'react';
import Button from '@/components/Button';
import { PlusIcon, XIcon } from 'lucide-react';
import MDialog from '@/components/MDialog';
import MText from '@/components/MText';
import OperationSelector from '@/components/transaction/transaction-form/OperationSelector';
import { Transaction } from '@/lib/transaction/transaction.model';
import TransactionForm, {
	type TransactionFormProps,
} from '@/components/transaction/transaction-form/TransactionForm';
import { Dialog } from '@/components/base/dialog';

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
