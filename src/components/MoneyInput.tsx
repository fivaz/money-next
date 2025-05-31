'use client';

import { Input } from '@/components/base/input';
import { ChangeEvent, InputHTMLAttributes, useEffect, useState } from 'react';

type MoneyInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> & {
	value?: string; // now optional for uncontrolled use
	defaultValue?: string; // added for uncontrolled mode
	onChange?: (value: string) => void;
};

export default function MoneyInput({
	value: controlledValue,
	defaultValue,
	onChange,
	name,
	...props
}: MoneyInputProps) {
	const isControlled = controlledValue !== undefined;

	const [internalValue, setInternalValue] = useState(defaultValue ?? '0');

	// use the actual value to compute the display value
	const rawValue = isControlled ? controlledValue : internalValue;
	const displayValue = (Math.abs(Number(rawValue)) / 100).toFixed(2);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const input = e.target.value;
		const numericInput = input.replace(/\D/g, '');
		const newValue = numericInput ? parseInt(numericInput).toString() : '0';

		if (isControlled) {
			onChange?.(newValue);
		} else {
			setInternalValue(newValue);
		}
	};

	return (
		<>
			<Input value={displayValue} onChange={handleChange} {...props} />
			<input type="hidden" name={name} value={rawValue} />
		</>
	);
}
