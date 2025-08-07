import type { Metadata } from 'next';
import type { Viewport } from 'next';
import './globals.css';
import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { AuthProvider } from '@/lib/user/AuthProvider';
import { getUser } from '@/lib/user/auth.utils.server';
import PromptProvider from '@/components/Prompt/PromptProvider';

export const metadata: Metadata = {
	title: 'Money',
	description: 'An app to manage your finance',
	generator: 'Next.js',
	manifest: '/manifest.json',
	keywords: ['nextjs', 'next14', 'pwa', 'next-pwa'],
	icons: [
		{ rel: 'icon', url: '/pwa-64x64.png', sizes: '64x64' },
		{ rel: 'icon', url: '/pwa-192x192.png', sizes: '192x192' },
		{ rel: 'icon', url: '/pwa-512x512.png', sizes: '512x512' },
		{ rel: 'apple-touch-icon', url: '/pwa-192x192.png' },
	],
};

export const viewport: Viewport = {
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: 'oklch(85.2% 0.199 91.936)' },
		{ media: '(prefers-color-scheme: dark)', color: 'oklch(82.8% 0.189 84.429)' },
	],
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
						<PromptProvider>
							<div className="min-h-screen bg-gray-100 dark:bg-gray-900">{children}</div>
						</PromptProvider>
					</AuthProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
