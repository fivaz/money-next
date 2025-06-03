import { ReactNode, Suspense } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import DateSwitcher from '@/components/date-switcher/DateSwitcher';
import DateSwitcherSkeleton from '@/components/date-switcher/DateSwitcherSkeleton';
import NavbarDesktop from '@/components/navbar2/navbar-desktop/NavbarDesktop';
import NavbarMobile from '@/components/navbar2/navbar-desktop/NavbarMobile';

export default function Layout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<>
			<div className="divide-y divide-red-500">
				<Navbar />
				<NavbarDesktop className="hidden md:block" />
				<NavbarMobile className="flex md:hidden" />
			</div>
			<header>
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="flex items-start justify-between">
						<h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
							{/*{{ pageTitle }}*/}
						</h1>
						<div id="header-right" className=""></div>
					</div>
				</div>
			</header>
			{/*<BalancePanel />*/}

			<main>
				<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
					<Suspense fallback={<DateSwitcherSkeleton />}>
						<DateSwitcher />
					</Suspense>
					{children}
				</div>
			</main>
		</>
	);
}
