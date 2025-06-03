import Logo from '@/components/Logo';
import Tooltip from '@/components/Navbar/Tooltip';
import DarkMode from '@/components/Navbar/DarkMode';
import ProfileDropdown from '@/components/Navbar/ProfileDropdown/ProfileDropdown';
import NavLinksDesktop from '@/components/navbar2/navbar-desktop/NavLinksDesktop';
import { Suspense } from 'react';
import BalanceViewerSkeleton from '@/components/navbar2/navbar-desktop/BalanceViewerSkeleton';
import BalanceViewer from '@/components/navbar2/navbar-desktop/BalanceViewer';
import clsx from 'clsx';

type NavbarMobileProps = { className: string };

export default function NavbarMobile({ className }: NavbarMobileProps) {
	const commitHash = `current commit: ${process.env.NEXT_PUBLIC_COMMIT_HASH || 'unknown'}`;

	return (
		<nav className={clsx(className, 'bg-white shadow-xs dark:bg-gray-800')}>
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					<div className="flex h-full gap-4">
						<Tooltip message={commitHash}>
							<Logo className="size-10 self-center" />
						</Tooltip>
						<NavLinksDesktop />
					</div>
					<div className="flex gap-2">
						<Suspense fallback={<BalanceViewerSkeleton />}>
							<BalanceViewer />
						</Suspense>
						<DarkMode />
						<ProfileDropdown />
					</div>
				</div>
			</div>
		</nav>
	);
}
