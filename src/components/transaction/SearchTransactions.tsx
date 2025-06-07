'use client';

import { useDebouncedCallback } from 'use-debounce';
import SearchInput from '@/components/SearchInput';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function SearchTransactions() {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const handleSearch = useDebouncedCallback((term) => {
		console.log(`Searching... ${term}`);

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
			defaultValue={searchParams.get('query')?.toString()}
			placeholder="search transaction..."
			onChange={(e) => {
				handleSearch(e.target.value);
			}}
		/>
	);
}
