'use client';

import { Disclosure, DisclosurePanel } from '@headlessui/react';
import MobileMenuButton from './MobileMenuButton';
import Logo from '../Logo';
import NavLinks from './NavLinks';
import DarkMode from './DarkMode';
import ProfileDropdown from './ProfileDropdown/ProfileDropdown';
import MobileUserInfo from './MobileUserInfo';
import Tooltip from '@/components/Navbar/Tooltip';
export default function Navbar() {
	const commitHash = `current commit: ${process.env.NEXT_PUBLIC_COMMIT_HASH || 'unknown'}`;

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

								<ProfileDropdown />
							</div>
							<div className="-mr-2 flex items-center sm:hidden">
								<MobileMenuButton open={open} />
							</div>
						</div>
					</div>
					<DisclosurePanel className="sm:hidden">
						<NavLinks mobile />
						<MobileUserInfo />
					</DisclosurePanel>
				</>
			)}
		</Disclosure>
	);
}
