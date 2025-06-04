'use client';
import { type PropsWithChildren, useState } from 'react';
import Button, { type ButtonProps } from '@/components/Button';
import { ReceiptTextIcon } from 'lucide-react';
import TransactionForm from '@/components/transaction/transaction-form/TransactionForm';
import { getTransactionIn, Transaction, TransactionIn } from '@/lib/transaction/transaction.model';
import { useSearchParams } from 'next/navigation';
import { buildDate, getParamsDate } from '@/lib/shared/date.utils';
import { set } from 'date-fns';

type TransactionFormButtonProps = PropsWithChildren<{ transaction?: Transaction }> & ButtonProps;

export default function TransactionFormButton({
	children,
	transaction,
	...props
}: TransactionFormButtonProps) {
	const [isOpen, setIsOpen] = useState(false);
	const searchParams = useSearchParams();
	const [year, month] = getParamsDate(searchParams);
	const date = buildDate(year, month);
	const [transactionIn, setTransactionIn] = useState<TransactionIn>(
		getTransactionIn(date, transaction),
	);

	const closeDialog = () => setIsOpen(false);
	const openDialog = () => {
		setTransactionIn(getTransactionIn(date, transaction));
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
