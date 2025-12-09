'use client';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { CircleUser } from 'lucide-react';
import SignOutButton from './SignOutButton';
import { User } from '@/lib/auth2/user.model';
import useSWR from 'swr';
import { fetcher } from '@/lib/shared/api-client.utils';

interface ProfileDropdownProps {}

export default function ProfileDropdown({}: ProfileDropdownProps) {
	const { data } = useSWR('/api/user', fetcher, {
		refreshInterval: 0,
		revalidateOnFocus: false,
	});

	const user: User | null = data?.user ?? null;

	return (
		<Menu as="div" className="relative ml-3">
			<div>
				<MenuButton className="relative flex rounded-full bg-white text-sm focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:outline-none dark:bg-gray-800 dark:focus:ring-offset-gray-800">
					<span className="absolute -inset-1.5" />
					<span className="sr-only">Open user menu</span>
					{user?.picture ? (
						<img className="size-8 rounded-full" src={user.picture} alt="avatar" />
					) : (
						<CircleUser className="size-7 text-yellow-500" />
					)}
				</MenuButton>
			</div>
			<MenuItems
				transition
				className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition duration-200 ease-out focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:scale-100 data-[enter]:transform data-[enter]:opacity-100 data-[leave]:transition data-[leave]:duration-75 data-[leave]:ease-in dark:bg-gray-800 dark:ring-white/10"
			>
				{/*<MenuItem>*/}
				{/*	<Link*/}
				{/*		href={ROUTES.PROFILE.path}*/}
				{/*		className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:outline-none dark:text-gray-200 hover:dark:bg-gray-700"*/}
				{/*	>*/}
				{/*		{ROUTES.PROFILE.name}*/}
				{/*	</Link>*/}
				{/*</MenuItem>*/}
				<MenuItem>
					<SignOutButton />
				</MenuItem>
			</MenuItems>
		</Menu>
	);
}
