'use client';

import { RadioGroup, Radio } from '@headlessui/react';
import { ArrowLeftFromLine, ArrowLeftRight, ArrowRightToLine } from 'lucide-react';
import { JSX, ReactNode } from 'react';
import ExpenseIcon from '@/components/icons/ExpenseIcon';
import IncomeIcon from '@/components/icons/IncomeIcon';
import clsx from 'clsx';

interface Operation {
	icon: (props: { className: string }) => ReactNode;
	value: string;
	className: string;
}

const operations: Operation[] = [
	{ icon: ExpenseIcon, value: 'expense', className: 'text-red-500 dark:text-red-600' },
	{ icon: IncomeIcon, value: 'income', className: 'text-green-500 dark:text-green-600' },
];

interface RadioGroupProps {
	value: string;
	onChangeAction: (value: 'income' | 'expense') => void;
}

export default function OperationSelector({ value, onChangeAction }: RadioGroupProps) {
	return (
		<RadioGroup
			className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs leading-5 font-semibold ring-1 ring-gray-200 ring-inset"
			value={value}
			onChange={onChangeAction}
		>
			{operations.map((operation) => (
				<Radio
					key={operation.value}
					value={operation.value}
					className={({ checked }) =>
						`${
							checked
								? 'bg-yellow-500 text-white dark:bg-yellow-600 dark:text-yellow-50'
								: 'text-gray-600 dark:text-gray-300'
						} flex cursor-pointer items-center justify-center gap-1 rounded-full px-2.5 py-1`
					}
				>
					{({ checked }) => (
						<>
							<operation.icon className={clsx('size-5')} />
							<span>{operation.value}</span>
						</>
					)}
				</Radio>
			))}
		</RadioGroup>
	);
}
