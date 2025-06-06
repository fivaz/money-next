'use client';
import { type PropsWithChildren, useState } from 'react';
import Button, { type ButtonProps } from '@/components/Button';
import { ReceiptTextIcon } from 'lucide-react';
import TransactionForm from '@/components/transaction/transaction-form/TransactionForm';
import { Transaction } from '@/lib/transaction/transaction.model';

type TransactionFormButtonProps = PropsWithChildren<{ transaction?: Transaction }> & ButtonProps;

export default function TransactionFormButton({
	children,
	transaction,
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

			<TransactionForm transaction={transaction} isOpen={isOpen} closeFormAction={closeDialog} />
		</>
	);
}
