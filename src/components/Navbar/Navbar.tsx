'use client';

import { Disclosure, DisclosurePanel } from '@headlessui/react';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import MobileMenuButton from './MobileMenuButton';
import Logo from '../Logo';
import NavLinks from './NavLinks';
import DarkMode from './DarkMode';
import ProfileDropdown from './ProfileDropdown';
import MobileUserInfo from './MobileUserInfo';
import { ROUTES } from '@/lib/const';
import { useState } from 'react';
import Tooltip from '@/components/Navbar/Tooltip';

export default function Navbar() {
	const router = useRouter();

	const commitHash = `current commit: ${process.env.NEXT_PUBLIC_COMMIT_HASH || 'unknown'}`;

	const user = {
		displayName: '',
		email: '',
		photoURL: '',
	};

	// Define user navigation
	const userNavigation = [
		ROUTES.PROFILE,
		{
			name: 'Sign out',
			onClick: handleSignOut,
		},
	];

	function handleSignOut() {}

	const [open1, setOpen1] = useState(true);

	return (
		<Disclosure as="nav" className="bg-white shadow-xs dark:bg-gray-800">
			{({ open }) => (
				<>
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="flex h-16 justify-between">
							<div className="flex">
								<Tooltip message={commitHash}>
									<Logo className="size-10 self-center" />
								</Tooltip>
								<NavLinks />
							</div>
							<div className="hidden sm:ml-6 sm:flex sm:items-center">
								<DarkMode />

								{user && (
									<ProfileDropdown
										user={{
											name: user.displayName || 'User',
											email: user.email || 'No email',
											imageUrl: user.photoURL || undefined,
										}}
										userNavigation={userNavigation}
									/>
								)}
							</div>
							<div className="-mr-2 flex items-center sm:hidden">
								<MobileMenuButton open={open} />
							</div>
						</div>
					</div>
					<DisclosurePanel className="sm:hidden">
						<NavLinks mobile />
						{user && (
							<MobileUserInfo
								user={{
									name: user.displayName || 'User',
									email: user.email || 'No email',
									imageUrl: user.photoURL || undefined,
								}}
								userNavigation={userNavigation}
							/>
						)}
					</DisclosurePanel>
				</>
			)}
		</Disclosure>
	);
}
