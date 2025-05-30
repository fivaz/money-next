'use client';

import { DisclosureButton } from '@headlessui/react';
import { MenuIcon, XIcon } from 'lucide-react';

interface MobileMenuButtonProps {
	open: boolean;
}

export default function MobileMenuButton({ open }: MobileMenuButtonProps) {
	return (
		<DisclosureButton className="relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:outline-none dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800">
			<span className="absolute -inset-0.5" />
			<span className="sr-only">Open main menu</span>
			{open ? (
				<XIcon className="block size-6" aria-hidden="true" />
			) : (
				<MenuIcon className="block size-6" aria-hidden="true" />
			)}
		</DisclosureButton>
	);
}
