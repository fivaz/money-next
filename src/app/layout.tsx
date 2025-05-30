import type { Metadata } from 'next';
import type { Viewport } from 'next';
import './globals.css';
import { ReactNode } from 'react';
import Navbar from '@/components/Navbar/Navbar';

export const metadata: Metadata = {
	title: 'Money',
	description: '',
};

export const viewport: Viewport = {
	themeColor: 'width=device-width, initial-scale=1.0',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<div className="min-h-screen bg-gray-100 dark:bg-gray-900">
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
						<main>
							<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
								{/*<BalancePanel />*/}
								{children}
							</div>
						</main>
					</div>
				</div>
			</body>
		</html>
	);
}
