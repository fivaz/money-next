import { Disclosure, DisclosurePanel } from '@headlessui/react';
import Tooltip from '@/components/Navbar/Tooltip';
import NavbarDisclosure from '@/components/Navbar/NavbarDisclosure';
import Logo from '@/components/Logo';
import BalanceViewer from '@/components/Navbar/balance-viewer/BalanceViewer';
import BalanceViewerSkeleton from '@/components/Navbar/balance-viewer/BalanceViewerSkeleton';
import { Suspense } from 'react';
import NavLinks from '@/components/Navbar/NavLinks';
import MobileUserInfo from '@/components/Navbar/MobileUserInfo';
import DarkMode from '@/components/Navbar/DarkMode';
import ProfileDropdown from '@/components/Navbar/ProfileDropdown/ProfileDropdown';
export default function Navbar() {
	const commitHash = `current commit: ${process.env.NEXT_PUBLIC_COMMIT_HASH || 'unknown'}`;

	return (
		<nav className="bg-white shadow-xs dark:bg-gray-800">
			<NavbarDisclosure>
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="mr-12 flex h-16 justify-between sm:mr-0">
						<div className="flex">
							<Tooltip message={commitHash}>
								<Logo className="size-10 self-center" />
							</Tooltip>
						</div>
						<div className="flex">
							<Suspense fallback={<BalanceViewerSkeleton />}>
								<BalanceViewer />
							</Suspense>

							<div className="hidden sm:ml-6 sm:flex sm:items-center">
								<DarkMode />
								<ProfileDropdown />
							</div>
						</div>
					</div>
				</div>
			</NavbarDisclosure>
		</nav>
	);
}
