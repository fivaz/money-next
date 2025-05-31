import React, { useRef, useMemo, InputHTMLAttributes } from 'react';
import { SearchIcon, XIcon } from 'lucide-react';
import { Input } from '@/components/base/input';

type SearchInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> & {
	value: string;
	onChange: (value: string) => void;
};

export default function SearchInput({ value, onChange, ...props }: SearchInputProps) {
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
			<Input ref={inputRef} value={value} onChange={(e) => onChange(e.target.value)} {...props} />
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
