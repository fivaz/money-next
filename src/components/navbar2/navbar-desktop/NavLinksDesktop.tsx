'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navLinks } from '@/lib/const';
import clsx from 'clsx';

interface NavLinksProps {}

export default function NavLinksDesktop({}: NavLinksProps) {
	const pathname = usePathname();

	function isCurrent(itemHref: string): boolean {
		return pathname === itemHref || (itemHref === '/' && pathname === '');
	}

	return (
		<div className="flex h-full gap-2">
			{navLinks.map((navLink) => (
				<Link
					key={navLink.name}
					href={navLink.path}
					aria-current={isCurrent(navLink.path) ? 'page' : undefined}
					className={clsx(
						'hover-group inline-flex h-full items-center border-b-2 px-1 pt-1 text-sm font-medium',
						isCurrent(navLink.path)
							? 'border-yellow-500 text-gray-900 dark:border-yellow-400 dark:text-white'
							: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-200',
					)}
				>
					<span className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-900">
						{navLink.name}
					</span>
				</Link>
			))}
		</div>
	);
}
