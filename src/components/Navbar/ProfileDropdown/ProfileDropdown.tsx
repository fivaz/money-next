'use client';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { CircleUser } from 'lucide-react';
import Link from 'next/link';
import SignOutButton from './SignOutButton';
import { profileLinks } from '@/lib/const';
import { useAuth } from '@/lib/user/AuthContext';

interface ProfileDropdownProps {}

export default function ProfileDropdown({}: ProfileDropdownProps) {
	const { user } = useAuth();

	return (
		<Menu as="div" className="relative ml-3">
			<div>
				<MenuButton className="relative flex rounded-full bg-white text-sm focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:outline-none dark:bg-gray-800 dark:focus:ring-offset-gray-800">
					<span className="absolute -inset-1.5" />
					<span className="sr-only">Open user menu</span>
					{user?.photoURL ? (
						<img className="size-8 rounded-full" src={user.photoURL} alt="avatar" />
					) : (
						<CircleUser className="size-7 text-yellow-500" />
					)}
				</MenuButton>
			</div>
			<MenuItems
				transition
				className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition duration-200 ease-out focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:scale-100 data-[enter]:transform data-[enter]:opacity-100 data-[leave]:transition data-[leave]:duration-75 data-[leave]:ease-in dark:bg-gray-800 dark:ring-white/10"
			>
				{profileLinks.map((route) => (
					<MenuItem key={route.name}>
						<Link
							href={route.path}
							className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:outline-none dark:text-gray-200 hover:dark:bg-gray-700"
						>
							{route.name}
						</Link>
					</MenuItem>
				))}
				<MenuItem>
					<SignOutButton />
				</MenuItem>
			</MenuItems>
		</Menu>
	);
}
