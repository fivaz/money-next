import type { Metadata } from 'next';
import type { Viewport } from 'next';
import './globals.css';
import { ReactNode } from 'react';
import ClientWrapper from '@/app/TokenRefresher';
import { ThemeProvider } from 'next-themes';

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
		<html lang="en" suppressHydrationWarning>
			<body>
				<ThemeProvider attribute="class">
					<ClientWrapper>
						<div className="min-h-screen bg-gray-100 dark:bg-gray-900">{children}</div>
					</ClientWrapper>
				</ThemeProvider>
			</body>
		</html>
	);
}
