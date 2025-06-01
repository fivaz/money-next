import { ReactNode, Suspense } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import DateSwitcherClient from '@/components/date-switcher/DateSwitcherClient';
import DateSwitcher from '@/components/date-switcher/DateSwitcher';

export default function Layout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<>
			<Navbar />
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
					<Suspense
						fallback={<DateSwitcherClient actualBalance={0} expectedBalance={0} isLoading />}
					>
						<DateSwitcher />
					</Suspense>
					{children}
				</div>
			</main>
		</>
	);
}
