'use client';
import { type PropsWithChildren, useState } from 'react';
import Button, { type ButtonProps } from '@/components/Button';
import { ReceiptTextIcon } from 'lucide-react';
import TransactionForm from '@/components/transaction/transaction-form/TransactionForm';
import { emptyTransaction, Transaction } from '@/lib/transaction/transaction.model';

type TransactionFormButtonProps = PropsWithChildren<{ transaction?: Transaction }> & ButtonProps;

export default function TransactionFormButton({
	children,
	transaction,
	...props
}: TransactionFormButtonProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [transactionIn, setTransactionIn] = useState<Transaction>(
		transaction || emptyTransaction(),
	);

	const closeDialog = () => setIsOpen(false);
	const openDialog = () => {
		setTransactionIn(transaction || emptyTransaction());
		setIsOpen(true);
	};

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
				setTransaction={setTransactionIn}
				transaction={transactionIn}
				isOpen={isOpen}
				closeFormAction={closeDialog}
			/>
		</>
	);
}
