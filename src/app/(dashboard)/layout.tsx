import { ReactNode, Suspense } from 'react';
import DateSwitcher from '@/components/date-switcher/DateSwitcher';
import DateSwitcherSkeleton from '@/components/date-switcher/DateSwitcherSkeleton';
import Navbar2 from '@/components/Navbar/Navbar';
import Navbar from '@/components/Navbar/Navbar';

export default function Layout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<>
			<header>
				<Navbar />
			</header>

			<main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
				<Suspense fallback={<DateSwitcherSkeleton />}>
					<DateSwitcher />
				</Suspense>
				{children}
			</main>
		</>
	);
}
