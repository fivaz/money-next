'use client';
import { type PropsWithChildren, Suspense, useState } from 'react';
import Button from '@/components/Button';
import { type ButtonProps } from '@/components/Button/utils';
import { HandCoinsIcon } from 'lucide-react';
import TransactionForm2 from '@/components/transaction/transaction-form2/TransactionForm2';
import { Transaction } from '@/lib/transaction2/transaction2.model';
import { getEmptyTransaction } from '@/lib/transaction2/transaction2.utils';
import { fetchAccounts } from '@/lib/account/account.utils';

type TransactionFormButtonProps = PropsWithChildren<{
	transaction?: Partial<Transaction>;
}> &
	ButtonProps;

export default function TransactionFormButton2({
	children,
	transaction,
	...props
}: TransactionFormButtonProps) {
	const [isOpen, setIsOpen] = useState(false);

	const { accounts } = fetchAccounts();

	const [transactionIn, setTransactionIn] = useState<Transaction>(
		getEmptyTransaction(transaction, accounts),
	);

	const closeDialog = () => {
		setIsOpen(false);
		setTransactionIn(getEmptyTransaction(undefined, accounts));
	};
	const openDialog = () => {
		setIsOpen(true);
		setTransactionIn(getEmptyTransaction(transaction, accounts));
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
				<TransactionForm2
					transaction={transactionIn}
					setTransaction={setTransactionIn}
					isOpen={isOpen}
					closeFormAction={closeDialog}
				/>
			</Suspense>
		</>
	);
}
