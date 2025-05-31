import { Input } from '@/components/base/input';
import { ChangeEvent, InputHTMLAttributes, useMemo } from 'react';
import * as Headless from '@headlessui/react';

type MoneyInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> & {
	value: string;
	onChange: (value: string) => void;
};

export default function MoneyInput({ value, onChange, name, ...props }: MoneyInputProps) {
	const displayValue = (Math.abs(Number(value)) / 100).toFixed(2);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const input = (e.target as HTMLInputElement)?.value;

		// Remove non-numeric characters except decimal point
		let numericInput = input.replace(/\D/g, '');

		// Ensure only one decimal point
		const value = numericInput ? parseInt(numericInput) : 0;

		// Trigger onChange with cents value
		onChange(value.toString());
	};

	return (
		<>
			<Input value={displayValue} onChange={handleChange} {...props} />;
			{/*so the formData.get('name') will get the true value, instead of the value the user sees*/}
			<input type="hidden" name={name} value={value} />
		</>
	);
}
