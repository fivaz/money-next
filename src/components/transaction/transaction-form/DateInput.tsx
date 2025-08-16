'use client';

import { InputHTMLAttributes, ChangeEvent, forwardRef, useRef } from 'react';
import { formatISO } from 'date-fns';
import { isoToInputFormat } from '@/lib/shared/date.utils';
import { Input } from '@/components/base/input';

type DateInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'onChange'> & {
	value?: string; // ISO string
	onChange?: (event: ChangeEvent<HTMLInputElement>, isoValue: string) => void;
};

const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
	({ value, onChange, name, ...props }, ref) => {
		const inputRef = useRef<HTMLInputElement>(null);

		// Convert ISO -> datetime-local value
		const localValue = value ? isoToInputFormat(value) : '';

		function handleChange(e: ChangeEvent<HTMLInputElement>) {
			if (!inputRef.current) return;

			const val = e.target.value;
			const isoVal = val ? formatISO(new Date(val)) : '';

			// Synthetic event to forward ISO as target.value if needed
			const syntheticEvent = {
				...e,
				target: {
					...inputRef.current,
					value: isoVal,
					name: e.target.name,
				},
			} as ChangeEvent<HTMLInputElement>;

			onChange?.(syntheticEvent, isoVal);
		}

		return (
			<Input
				{...props}
				ref={inputRef}
				type="datetime-local"
				value={localValue}
				onChange={handleChange}
				name={name}
			/>
		);
	},
);

DateInput.displayName = 'DateInput';
export default DateInput;
