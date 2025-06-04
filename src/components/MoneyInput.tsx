'use client';

import {
	forwardRef,
	useState,
	useRef,
	ChangeEvent,
	InputHTMLAttributes,
	useImperativeHandle,
} from 'react';
import { Input } from '@/components/base/input';

type MoneyInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> & {
	value?: string;
	defaultValue?: string;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

const MoneyInput = forwardRef<HTMLInputElement, MoneyInputProps>(
	({ value: controlledValue, defaultValue, onChange, name, ...props }, ref) => {
		const isControlled = controlledValue !== undefined;
		const [internalValue, setInternalValue] = useState(defaultValue ?? '');
		const inputRef = useRef<HTMLInputElement>(null);

		// Let parent access the internal input
		useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

		const rawValue = isControlled ? controlledValue : internalValue;
		const displayValue = rawValue ? (Math.abs(Number(rawValue)) / 100).toFixed(2) : '';

		const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
			const input = e.target.value;
			const numericInput = input.replace(/\D/g, '');
			const newValue = numericInput ? parseInt(numericInput).toString() : '0';

			if (!isControlled) {
				setInternalValue(newValue);
			}

			if (onChange && inputRef.current) {
				const syntheticEvent = {
					...e,
					target: {
						...inputRef.current,
						value: newValue,
					},
				} as ChangeEvent<HTMLInputElement>;

				onChange(syntheticEvent);
			}
		};

		return (
			<>
				<Input
					ref={inputRef}
					value={displayValue}
					onChange={handleChange}
					inputMode="numeric"
					pattern="[0-9]*"
					{...props}
				/>
				<input type="hidden" name={name} value={rawValue} />
			</>
		);
	},
);

MoneyInput.displayName = 'MoneyInput';
export default MoneyInput;
