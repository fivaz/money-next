import { Dispatch, SetStateAction } from 'react';
import { Field, Label } from '@/components/base/fieldset';
import { Text } from '@/components/base/text';
import { Listbox, ListboxOption } from '@/components/base/listbox';
import { LoaderCircleIcon } from 'lucide-react';
import IconView from '@/components/icon-picker/IconView';
import { Switch } from '@/components/base/switch';
import { TransactionIn } from '@/components/transaction/transaction-form/transaction-form.utils';
import { useBudgets } from '@/lib/budget/budget.utils-api';
import { Budget } from '@/lib/budget/budget.model';

type BudgetAndPaidSectionProps = {
	transactionIn: TransactionIn;
	setTransactionIn: Dispatch<SetStateAction<TransactionIn>>;
};

export default function BudgetAndPaidSection({
	transactionIn,
	setTransactionIn,
}: BudgetAndPaidSectionProps) {
	const { budgets, isLoading: isBudgetLoading } = useBudgets();

	const handleBudget = (value: any) => {
		setTransactionIn((transaction) => ({
			...transaction,
			budget: value,
		}));
	};

	const handleSwitch = (value: boolean) => {
		setTransactionIn((transaction) => ({
			...transaction,
			isPaid: value,
		}));
	};

	return (
		<div className="flex items-center gap-4">
			<Field className="flex-1">
				<Label>Budget</Label>
				{isBudgetLoading ? (
					<Text>
						Loading budgets <LoaderCircleIcon className="size-5 animate-spin" />
					</Text>
				) : (
					<Listbox
						name="budget"
						value={transactionIn.budget}
						onChange={handleBudget}
						placeholder="Select budget&hellip;"
					>
						<ListboxOption value={null} className="flex gap-2">
							<IconView name={''} className="size-4" />
							No budget
						</ListboxOption>

						{transactionIn.budget?.id &&
							!budgets.some((budget) => budget.id === transactionIn.budget?.id) && (
								<ListboxOption value={transactionIn.budget} className="flex gap-2">
									<IconView name={transactionIn.budget?.icon} className="size-4 shrink-0" />
									<span className="truncate">{transactionIn.budget?.name} [deleted]</span>
								</ListboxOption>
							)}

						{budgets.map((budget) => (
							<ListboxOption key={budget.id} value={budget} className="flex gap-2 truncate">
								<IconView name={budget.icon} className="size-4 shrink-0" />
								<span className="truncate">{budget.name}</span>
							</ListboxOption>
						))}
					</Listbox>
				)}
			</Field>

			<Field className="flex h-[73px] flex-col items-center justify-between">
				<Label>Is paid</Label>
				<Switch
					className="mb-2"
					name="isPaid"
					color="amber"
					onChange={handleSwitch}
					checked={transactionIn?.isPaid}
				/>
			</Field>
		</div>
	);
}
