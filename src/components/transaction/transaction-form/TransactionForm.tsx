import { type PropsWithChildren, useState } from 'react';
import Button from '@/components/Button';
import { PlusIcon } from 'lucide-react';
import MDialog from '@/components/MDialog';
import { Transaction } from '@/lib/transaction/transaction.model';
import MText from '@/components/MText';
import OperationSelector from '@/components/transaction/transaction-form/OperationSelector';

type TransactionFormProps = PropsWithChildren<{
	transaction?: Transaction;
}>;

export default function TransactionForm({ children, transaction }: TransactionFormProps) {
	const [open, setOpen] = useState(false);

	const closeDialog = () => setOpen(false);
	const openDialog = () => setOpen(true);

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

			<MDialog isOpen={open} onClose={setOpen}>
				<MText size="lg" className="font-semibold">
					{transaction?.id ? 'Edit Transaction' : 'Add Transaction'}
				</MText>
				<OperationSelector value={transaction?.amount ? 'income' : 'expense'} />
			</MDialog>
		</>
	);
}
