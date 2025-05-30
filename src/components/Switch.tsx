'use client';

import { Switch, Field, Label } from '@headlessui/react';
import clsx from 'clsx';
import MText from './MText'; // Assuming Text.tsx is in the same directory

interface SwitchProps {
	value: boolean;
	name: string;
	onChange: (value: boolean) => void;
	negative?: 'normal' | 'error';
}

export default function MSwitch({ value, name, onChange, negative = 'normal' }: SwitchProps) {
	const negativeClass = negative === 'error' ? 'bg-red-500' : 'bg-gray-400';

	return (
		<Field className="flex flex-col items-center">
			<Label as="span" className="mb-2">
				<MText size="sm" className="font-medium">
					{name}
				</MText>
			</Label>
			<Switch
				checked={value}
				onChange={onChange}
				className={clsx(
					value ? 'bg-yellow-600' : negativeClass,
					'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2 focus:outline-hidden',
				)}
			>
				<span className="sr-only">Use setting</span>
				<span
					className={clsx(
						value ? 'translate-x-5' : 'translate-x-0',
						'pointer-events-none relative inline-block size-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out',
					)}
				>
					<span
						className={clsx(
							value ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in',
							'absolute inset-0 flex size-full items-center justify-center transition-opacity',
						)}
						aria-hidden="true"
					>
						<svg className="size-3 text-gray-400" fill="none" viewBox="0 0 12 12">
							<path
								d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</span>
					<span
						className={clsx(
							value ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out',
							'absolute inset-0 flex size-full items-center justify-center transition-opacity',
						)}
						aria-hidden="true"
					>
						<svg className="size-3 text-yellow-600" fill="currentColor" viewBox="0 0 12 12">
							<path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
						</svg>
					</span>
				</span>
			</Switch>
		</Field>
	);
}
