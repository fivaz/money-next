'use client';
import { type PropsWithChildren, Suspense, useState } from 'react';
import Button from '@/components/Button';
import { type ButtonProps } from '@/components/Button/utils';
import { HandCoinsIcon } from 'lucide-react';
import TransactionForm from '@/components/transaction/transaction-form/TransactionForm';
import { Transaction } from '@/lib/transaction/transaction.model';
import { useAccounts } from '@/lib/account/account.utils-api';
import {
	getEmptyTransactionIn,
	TransactionIn,
} from '@/components/transaction/transaction-form/transaction-form.utils';

type TransactionFormButtonProps = PropsWithChildren<{
	transaction?: Partial<Transaction>;
}> &
	ButtonProps;

export default function TransactionFormButton({
	children,
	transaction,
	...props
}: TransactionFormButtonProps) {
	const [isOpen, setIsOpen] = useState(false);

	const { accounts } = useAccounts();

	const [transactionIn, setTransactionIn] = useState<TransactionIn>(
		getEmptyTransactionIn(transaction, accounts),
	);

	const closeDialog = () => {
		setIsOpen(false);
	};

	const openDialog = () => {
		setIsOpen(true);
		if (transaction?.id) console.log(transaction.id);
		setTransactionIn(getEmptyTransactionIn(transaction, accounts));
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

			<Suspense>
				<TransactionForm
					transactionIn={transactionIn}
					setTransactionIn={setTransactionIn}
					isOpen={isOpen}
					closeFormAction={closeDialog}
				/>
			</Suspense>
		</>
	);
}
