import React, { useState, useMemo } from 'react';
import { getIcon, iconComponents } from './service';
import SearchInput from '@/components/SearchInput';

// Define props interface
interface IconPickerProps {
	value: string | null;
	onChange: (value: string | null) => void;
}

export default function IconPicker({ value, onChange }: IconPickerProps) {
	// Search query state
	const [searchQuery, setSearchQuery] = useState<string>('');

	// Filtered icons based on search
	const filteredIcons = useMemo(() => {
		const query = searchQuery.toLowerCase().trim();
		if (!query) return Object.keys(iconComponents);
		return Object.keys(iconComponents).filter((name) => name.toLowerCase().includes(query));
	}, [searchQuery]);

	// Handle icon selection
	const selectIcon = (name: string) => {
		onChange(name);
		setSearchQuery('');
	};

	return (
		<div className="flex flex-col gap-2">
			{/* Search Bar */}
			<SearchInput
				value={searchQuery}
				onChange={setSearchQuery}
				name="Search icons"
				placeholder="Search icons..."
			/>

			{/* Icon List */}
			<div className="grid h-[136px] grid-cols-[repeat(auto-fill,minmax(2rem,1fr))] gap-2.5 overflow-auto rounded-md border border-gray-300 p-2 dark:border-gray-600">
				{filteredIcons.map((iconName) => {
					const IconComponent = getIcon(iconName);
					return (
						<div
							key={iconName}
							className={[
								'flex size-8 cursor-pointer flex-col items-center rounded-md border p-1',
								value === iconName
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
	);
}
