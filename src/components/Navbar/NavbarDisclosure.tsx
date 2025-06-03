'use client';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { MenuIcon, XIcon } from 'lucide-react';
import { PropsWithChildren } from 'react';
import NavLinks from '@/components/Navbar/NavLinks';
import MobileUserInfo from '@/components/Navbar/MobileUserInfo';

export default function NavbarDisclosure({ children }: PropsWithChildren) {
	return (
		<Disclosure as="div">
			{({ open }) => (
				<>
					<div className="relative">
						{children}
						<div className="sm:hidden">
							<MobileMenuButton open={open} />
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

function MobileMenuButton({ open }: { open: boolean }) {
	return (
		<DisclosureButton className="absolute top-1/2 right-0 mr-2 inline-flex -translate-y-1/2 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:outline-none dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800">
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
