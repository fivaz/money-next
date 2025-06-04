'use client';

import { RadioGroup, Radio } from '@headlessui/react';
import { ReactNode } from 'react';
import ExpenseIcon from '@/components/icons/ExpenseIcon';
import IncomeIcon from '@/components/icons/IncomeIcon';
import clsx from 'clsx';

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
			<Radio
				key="expense"
				value="expense"
				className={({ checked }) =>
					`${
						checked
							? 'bg-red-500 text-white dark:bg-red-600 dark:text-red-50'
							: 'text-gray-600 dark:text-gray-300'
					} flex cursor-pointer items-center justify-center gap-1 rounded-full px-2.5 py-1`
				}
			>
				<>
					<ExpenseIcon className={clsx('size-5')} />
					<span>expense</span>
				</>
			</Radio>
			<Radio
				key="income"
				value="income"
				className={({ checked }) =>
					`${
						checked
							? 'bg-green-500 text-white dark:bg-green-600 dark:text-green-50'
							: 'text-gray-600 dark:text-gray-300'
					} flex cursor-pointer items-center justify-center gap-1 rounded-full px-2.5 py-1`
				}
			>
				<>
					<IncomeIcon className={clsx('size-5')} />
					<span>income</span>
				</>
			</Radio>
		</RadioGroup>
	);
}
