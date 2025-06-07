import React, { useRef, useMemo, InputHTMLAttributes, ChangeEvent } from 'react';
import { SearchIcon, XIcon } from 'lucide-react';
import { Input } from '@/components/base/input';

type SearchInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> & {
	value?: string;
	defaultValue?: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function SearchInput({ defaultValue, value, onChange, ...props }: SearchInputProps) {
	// Ref for input element
	const inputRef = useRef<HTMLInputElement>(null);

	// Check if input has text
	const hasText = !!defaultValue?.length || !!value?.length;

	// Clear input and focus
	const clearInput = () => {
		inputRef.current?.focus();
	};

	return (
		<div className="relative flex items-center">
			<Input
				ref={inputRef}
				value={value}
				defaultValue={defaultValue}
				onChange={onChange}
				{...props}
			/>
			<button
				type="button"
				className={`absolute right-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 ${hasText ? 'cursor-pointer' : ''}`}
				onClick={hasText ? clearInput : undefined}
			>
				{hasText ? <XIcon className="size-5" /> : <SearchIcon className="size-5" />}
			</button>
		</div>
	);
}
