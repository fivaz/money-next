import type { Metadata } from 'next';
import type { Viewport } from 'next';
import './globals.css';
import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { AuthProvider } from '@/lib/user/AuthProvider';
import { getUser } from '@/lib/user/auth.utils.server';

export const metadata: Metadata = {
	title: 'Money',
	description: '',
};

export const viewport: Viewport = {
	themeColor: 'width=device-width, initial-scale=1.0',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	const user = await getUser();

	return (
		<html lang="en" suppressHydrationWarning>
			<body>
				<ThemeProvider attribute="class">
					<AuthProvider user={user}>
						<div className="min-h-screen bg-gray-100 dark:bg-gray-900">{children}</div>
					</AuthProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
