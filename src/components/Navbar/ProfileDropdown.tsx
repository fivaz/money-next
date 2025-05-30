'use client';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { CircleUser } from 'lucide-react';
import Link from 'next/link';

interface NavigationItem {
	name: string;
	path?: string;
	onClick?: () => void;
}

interface ProfileDropdownProps {
	user: { name: string; email: string; imageUrl: string | null };
	userNavigation: NavigationItem[];
}

export default function ProfileDropdown({ user, userNavigation }: ProfileDropdownProps) {
	function handleItemClick(item: NavigationItem) {
		if (item.onClick) {
			item.onClick();
		}
	}

	return (
		<Menu as="div" className="relative ml-3">
			<div>
				<MenuButton className="relative flex rounded-full bg-white text-sm focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:outline-none dark:bg-gray-800 dark:focus:ring-offset-gray-800">
					<span className="absolute -inset-1.5" />
					<span className="sr-only">Open user menu</span>
					{user.imageUrl ? (
						<img className="size-8 rounded-full" src={user.imageUrl} alt="" />
					) : (
						<CircleUser className="size-7 text-yellow-500" />
					)}
				</MenuButton>
			</div>
			<MenuItems
				transition
				className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition duration-200 ease-out focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:scale-100 data-[enter]:transform data-[enter]:opacity-100 data-[leave]:transition data-[leave]:duration-75 data-[leave]:ease-in dark:bg-gray-800 dark:ring-white/10"
			>
				{userNavigation.map((item) => (
					<MenuItem key={item.name}>
						{({ active }) =>
							item.path ? (
								<Link
									href={item.path}
									className={[
										active ? 'bg-gray-100 outline-none dark:bg-gray-700' : '',
										'block px-4 py-2 text-sm text-gray-700 dark:text-gray-200',
									].join(' ')}
								>
									{item.name}
								</Link>
							) : (
								<button
									onClick={() => handleItemClick(item)}
									className={[
										active ? 'bg-gray-100 outline-none dark:bg-gray-700' : '',
										'block w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200',
									].join(' ')}
								>
									{item.name}
								</button>
							)
						}
					</MenuItem>
				))}
			</MenuItems>
		</Menu>
	);
}
