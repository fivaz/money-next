import React, { useRef, useMemo, InputHTMLAttributes } from 'react';
import { SearchIcon, XIcon } from 'lucide-react';
import { Input } from '@/components/base/input';

type SearchInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> & {
	placeholder?: string;
	value: string;
	onChange: (value: string) => void;
};

export default function SearchInput({ placeholder, value, onChange }: SearchInputProps) {
	// Ref for input element
	const inputRef = useRef<HTMLInputElement>(null);

	// Check if input has text
	const hasText = useMemo(() => !!value.length, [value]);

	// Clear input and focus
	const clearInput = () => {
		onChange('');
		inputRef.current?.focus();
	};

	return (
		<div className="relative flex items-center">
			<Input
				ref={inputRef}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder={placeholder}
				className="block w-full rounded-md bg-white px-3 py-1.5 pr-10 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500"
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
