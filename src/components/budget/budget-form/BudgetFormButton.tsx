'use client';
import { type PropsWithChildren, useState } from 'react';
import Button from '@/components/Button';
import { PiggyBankIcon } from 'lucide-react';
import BudgetForm from '@/components/budget/budget-form/BudgetForm';
import { Budget } from '@/lib/budget/budget.model';

type BudgetFormButtonProps = PropsWithChildren<{ budget?: Budget }>;

export default function BudgetFormButton({ children, budget }: BudgetFormButtonProps) {
	const [isOpen, setIsOpen] = useState(false);

	const closeDialog = () => setIsOpen(false);
	const openDialog = () => {
		if (budget?.id) console.log(budget.id);
		setIsOpen(true);
	};

	return (
		<>
			<Button onClick={openDialog}>
				{children || (
					<>
						<PiggyBankIcon className="size-5" />
						Add Budget
					</>
				)}
			</Button>

			<BudgetForm budget={budget} isOpen={isOpen} closeFormAction={closeDialog} />
		</>
	);
}
