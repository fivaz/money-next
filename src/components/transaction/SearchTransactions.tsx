'use client';

import { useDebouncedCallback } from 'use-debounce';
import SearchInput from '@/components/SearchInput';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SearchTransactions() {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const initialQuery = searchParams.get('query')?.toString() || '';
	const [query, setQuery] = useState(initialQuery);

	useEffect(() => {
		setQuery(initialQuery);
	}, [initialQuery]);

	const handleSearch = useDebouncedCallback((term: string) => {
		const params = new URLSearchParams(searchParams);
		if (term) {
			params.set('query', term);
		} else {
			params.delete('query');
		}
		replace(`${pathname}?${params.toString()}`);
	}, 300);

	return (
		<SearchInput
			value={query}
			onChange={(e) => {
				const term = e.target.value;
				setQuery(term);
				handleSearch(term);
			}}
			onClear={() => {
				setQuery('');
				handleSearch('');
			}}
			placeholder="search transaction..."
		/>
	);
}
