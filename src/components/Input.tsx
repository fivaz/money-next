'use client';

import { format, parseISO, formatISO } from 'date-fns';
import { useEffect, useRef, useMemo } from 'react';

interface InputProps {
	name?: string;
	type?: string;
	placeholder?: string;
	value: string | number;
	onChange: (value: string | number) => void;
	autofocus?: boolean;
}

export default function Input({
	name,
	type = 'text',
	placeholder,
	value,
	onChange,
	autofocus,
}: InputProps) {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const inputType = useMemo(() => type || 'text', [type]);
	const idName = useMemo(() => name || Math.random().toString(), [name]);

	// Handle autofocus
	useEffect(() => {
		if (autofocus && inputRef.current) {
			inputRef.current.focus();
		}
	}, [autofocus]);

	// Format ISO date for datetime-local inputs
	const formattedValue = useMemo(() => {
		if (inputType === 'datetime-local' && typeof value === 'string') {
			try {
				const date = parseISO(value);
				if (!isNaN(date.getTime())) {
					return format(date, "yyyy-MM-dd'T'HH:mm");
				}
			} catch (e) {
				console.error('Invalid date format:', e);
			}
		}
		return value;
	}, [inputType, value]);

	// Handle input updates
	const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		let newValue: string | number = event.target.value;

		if (inputType === 'datetime-local') {
			try {
				const date = new Date(newValue);
				if (!isNaN(date.getTime())) {
					newValue = formatISO(date);
				}
			} catch (e) {
				console.error('Error parsing date:', e);
			}
		}

		onChange(newValue);
	};

	return (
		<div className="flex flex-col gap-2">
			{name && (
				<label
					htmlFor={idName}
					className="block text-sm/6 font-medium text-gray-900 dark:text-white"
				>
					{name}
				</label>
			)}
			<div>
				<input
					ref={inputRef}
					id={idName}
					type={inputType}
					name={idName}
					autoComplete="off"
					value={formattedValue}
					placeholder={placeholder}
					onChange={handleInput}
					className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 scheme-light outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:scheme-dark dark:outline-white/10 dark:placeholder:text-gray-500"
				/>
			</div>
		</div>
	);
}
