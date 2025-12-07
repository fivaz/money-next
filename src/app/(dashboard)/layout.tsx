import { ReactNode } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import TimezoneInitializer from '@/components/TimezoneInitializer';

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

			<TimezoneInitializer />
			<main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
		</>
	);
}
