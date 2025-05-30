import { ReactNode } from 'react';
import Navbar from '@/components/Navbar/Navbar';

export default function Layout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<>
			<Navbar />
			<div className="py-10">
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
					<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</div>
				</main>
			</div>
		</>
	);
}
