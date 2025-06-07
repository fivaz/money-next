import React, { InputHTMLAttributes, useMemo, useState } from 'react';
import { getIcon, iconComponents } from './service';
import SearchInput from '@/components/SearchInput';

type IconPickerProps = Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'value' | 'onChange' | 'defaultValue'
> & {
	value?: string | null; // value now optional
	defaultValue?: string | null; // added for uncontrolled mode
	onChange?: (value: string | null) => void; // optional
};

export default function IconPicker({
	value,
	defaultValue = null,
	onChange,
	name,
	...props
}: IconPickerProps) {
	const isControlled = value !== undefined;

	// Internal state for uncontrolled usage
	const [internalValue, setInternalValue] = useState<string | null>(defaultValue);
	const [searchQuery, setSearchQuery] = useState<string>('');

	const selectedValue = isControlled ? value : internalValue;

	const filteredIcons = useMemo(() => {
		const query = searchQuery.toLowerCase().trim();
		if (!query) return Object.keys(iconComponents);
		return Object.keys(iconComponents).filter((name) => name.toLowerCase().includes(query));
	}, [searchQuery]);

	const selectIcon = (name: string) => {
		if (isControlled) {
			onChange?.(name);
		} else {
			setInternalValue(name);
			onChange?.(name); // still notify parent if they care
		}
		setSearchQuery('');
	};

	return (
		<>
			<div className="flex flex-col gap-2">
				<SearchInput
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					{...props}
					placeholder="Search icons..."
				/>

				<div className="grid h-[136px] grid-cols-[repeat(auto-fill,minmax(2rem,1fr))] gap-2.5 overflow-auto rounded-md border border-gray-300 p-2 dark:border-gray-600">
					{filteredIcons.map((iconName) => {
						const IconComponent = getIcon(iconName);
						return (
							<div
								key={iconName}
								className={[
									'flex size-8 cursor-pointer flex-col items-center rounded-md border p-1',
									selectedValue === iconName
										? 'border-yellow-600 text-yellow-500'
										: 'border-gray-300 text-gray-600 dark:border-gray-300 dark:text-gray-300',
								].join(' ')}
								onClick={() => selectIcon(iconName)}
							>
								<span className="flex flex-col items-center gap-2">
									<IconComponent />
								</span>
							</div>
						);
					})}
				</div>
			</div>
			<input type="hidden" name={name} value={selectedValue ?? ''} />
		</>
	);
}
