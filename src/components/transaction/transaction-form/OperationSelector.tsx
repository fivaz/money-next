'use client';

import { RadioGroup, Radio } from '@headlessui/react';
import { ArrowLeftFromLine, ArrowLeftRight, ArrowRightToLine } from 'lucide-react';
import { JSX, ReactNode } from 'react';

interface Operation {
	icon: (props: { className: string }) => ReactNode;
	value: string;
}

const operations: Operation[] = [
	{ icon: ArrowLeftFromLine, value: 'expense' },
	{ icon: ArrowRightToLine, value: 'income' },
];

interface RadioGroupProps {
	value: string;
	onChange?: (value: string) => void;
}

export default function OperationSelector({ value }: RadioGroupProps) {
	return (
		<RadioGroup
			className="grid grid-cols-3 gap-x-1 rounded-full p-1 text-center text-xs leading-5 font-semibold ring-1 ring-gray-200 ring-inset"
			value={value}
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
							<operation.icon className="h-4 w-4" />
							<span>{operation.value}</span>
						</>
					)}
				</Radio>
			))}
		</RadioGroup>
	);
}
