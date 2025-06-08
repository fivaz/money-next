import React, { useRef, InputHTMLAttributes, ChangeEvent } from 'react';
import { SearchIcon, XIcon } from 'lucide-react';
import { Input } from '@/components/base/input';
import clsx from 'clsx';

type SearchInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> & {
	value: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	onClear?: () => void;
	className?: string;
};

export default function SearchInput({
	value,
	className,
	onChange,
	onClear,
	...props
}: SearchInputProps) {
	const inputRef = useRef<HTMLInputElement>(null);
	const hasText = value.length > 0;

	const clearInput = () => {
		onClear?.();
		inputRef.current?.focus();
	};

	return (
		<div className="relative flex items-center">
			<Input
				ref={inputRef}
				value={value}
				onChange={onChange}
				{...props}
				className={clsx(className)}
			/>
			<button
				type="button"
				className={`absolute right-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 ${
					hasText ? 'cursor-pointer' : 'pointer-events-none'
				}`}
				onClick={clearInput}
			>
				{hasText ? <XIcon className="size-5" /> : <SearchIcon className="size-5" />}
			</button>
		</div>
	);
}
