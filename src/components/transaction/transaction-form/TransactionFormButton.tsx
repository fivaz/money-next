'use client';
import { type PropsWithChildren, useState } from 'react';
import Button from '@/components/Button';
import { PlusIcon, XIcon } from 'lucide-react';
import MDialog from '@/components/MDialog';
import MText from '@/components/MText';
import OperationSelector from '@/components/transaction/transaction-form/OperationSelector';
import { Transaction } from '@/lib/transaction/transaction.model';
import TransactionForm from '@/components/transaction/transaction-form/TransactionForm';
import { Dialog } from '@/components/base/dialog';

type TransactionFormProps = PropsWithChildren<{}>;

export default function TransactionFormButton({ children }: TransactionFormProps) {
	const [open, setOpen] = useState(false);

	const closeDialog = () => setOpen(false);
	const openDialog = () => setOpen(true);

	return (
		<>
			<Button onClick={openDialog}>
				<PlusIcon />
				Transaction
			</Button>

			<Dialog open={open} onClose={setOpen}>
				<CloseButton close={closeDialog} />
				{children}
			</Dialog>
		</>
	);
}

type CloseButtonProps = {
	close: () => void;
};

function CloseButton({ close }: CloseButtonProps) {
	return (
		<div className="absolute top-0 right-0 pt-5 pr-5">
			<Button onClick={close}>
				<XIcon />
			</Button>
		</div>
	);
}
