'use client';
import { type PropsWithChildren, useState } from 'react';
import Button, { type ButtonProps } from '@/components/Button';
import { HandCoinsIcon } from 'lucide-react';
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
	const openDialog = () => {
		if (transaction?.id) console.log(transaction.id);
		setIsOpen(true);
	};

	return (
		<>
			<Button onClick={openDialog} {...props}>
				{children || (
					<>
						<HandCoinsIcon />
						Add Transaction
					</>
				)}
			</Button>

			<TransactionForm transaction={transaction} isOpen={isOpen} closeFormAction={closeDialog} />
		</>
	);
}
