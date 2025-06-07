'use client';

import { DisclosureButton } from '@headlessui/react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { navLinks } from '@/lib/const';

interface NavLinksProps {
	mobile?: boolean;
}

export default function NavLinks({ mobile = false }: NavLinksProps) {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const params = new URLSearchParams(searchParams.toString());

	function isCurrent(itemHref: string): boolean {
		return pathname === itemHref || (itemHref === '/' && pathname === '');
	}

	return (
		<div
			className={mobile ? 'space-y-1 pt-2 pb-3' : 'hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8'}
		>
			{navLinks.map((navLink) => (
				<DisclosureButton
					key={navLink.name}
					as={Link}
					href={`${navLink.path}?${params.toString()}`}
					aria-current={isCurrent(navLink.path) ? 'page' : undefined}
					className={[
						isCurrent(navLink.path)
							? 'border-yellow-500 text-gray-900 dark:border-yellow-400 dark:text-white'
							: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-200',
						mobile
							? 'block border-l-4 bg-white py-2 pr-4 pl-3 text-base font-medium dark:bg-gray-800'
							: 'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium',
					].join(' ')}
				>
					{navLink.name}
				</DisclosureButton>
			))}
		</div>
	);
}
