import { RadioGroup, Radio } from '@headlessui/react';
import { ArrowRightLeft, TrendingDownIcon, TrendingUpIcon } from 'lucide-react';
import clsx from 'clsx';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import {
	OperationType,
	TransactionIn,
} from '@/components/transaction/transaction-form/transaction-form.utils';

interface RadioGroupProps {
	transaction: TransactionIn;
	setTransaction: Dispatch<SetStateAction<TransactionIn>>;
}

const operations: {
	value: OperationType;
	label: string;
	Icon: ReactNode;
	activeClass: string;
}[] = [
	{
		value: 'expense',
		label: 'Expense',
		Icon: <TrendingDownIcon className="size-5" />,
		activeClass: 'bg-red-500 text-white dark:bg-red-600 dark:text-red-50',
	},
	{
		value: 'transfer',
		label: 'Transfer',
		Icon: <ArrowRightLeft className="size-5" />,
		activeClass: 'bg-blue-500 text-white dark:bg-blue-600 dark:text-blue-50',
	},
	{
		value: 'income',
		label: 'Income',
		Icon: <TrendingUpIcon className="size-5" />,
		activeClass: 'bg-green-500 text-white dark:bg-green-600 dark:text-green-50',
	},
];

export default function OperationSelector({ transaction, setTransaction }: RadioGroupProps) {
	return (
		<RadioGroup
			className="grid grid-cols-3 gap-x-1 rounded-full p-1 text-center text-xs leading-5 font-semibold ring-1 ring-gray-200 ring-inset"
			value={transaction.operation}
			name="operation"
			onChange={(operation) => {
				setTransaction((transaction) => ({
					...transaction,
					operation,
				}));
			}}
		>
			{operations.map((op) => (
				<Radio
					key={op.value}
					value={op.value}
					className={({ checked }) =>
						clsx(
							'flex cursor-pointer items-center justify-center gap-1 rounded-full px-2.5 py-1',
							checked ? op.activeClass : 'text-gray-600 dark:text-gray-300',
						)
					}
				>
					<>
						{op.Icon}
						<span>{op.label}</span>
					</>
				</Radio>
			))}
		</RadioGroup>
	);
}
