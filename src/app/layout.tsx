import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import { AuthProvider } from '@/lib/user/AuthProvider';
import { getUser } from '@/lib/user/auth.utils.server';
import PromptProvider from '@/components/Prompt/PromptProvider';

const APP_NAME = 'Money';
const APP_DEFAULT_TITLE = 'Money';
const APP_TITLE_TEMPLATE = '%s - Money';
const APP_DESCRIPTION = 'An app to manage your finance';

export const metadata: Metadata = {
	applicationName: APP_NAME,
	title: {
		default: APP_DEFAULT_TITLE,
		template: APP_TITLE_TEMPLATE,
	},
	description: APP_DESCRIPTION,
	generator: 'Next.js',
	manifest: '/manifest.json',
	keywords: ['nextjs', 'next14', 'pwa', 'next-pwa'],
	icons: [
		{ rel: 'icon', url: '/pwa-64x64.png', sizes: '64x64' },
		{ rel: 'icon', url: '/pwa-192x192.png', sizes: '192x192' },
		{ rel: 'icon', url: '/pwa-512x512.png', sizes: '512x512' },
		{ rel: 'apple-touch-icon', url: '/pwa-192x192.png' },
	],
	appleWebApp: {
		capable: true,
		statusBarStyle: 'default',
		title: APP_DEFAULT_TITLE,
	},
	formatDetection: {
		telephone: false,
	},
	openGraph: {
		type: 'website',
		siteName: APP_NAME,
		title: {
			default: APP_DEFAULT_TITLE,
			template: APP_TITLE_TEMPLATE,
		},
		description: APP_DESCRIPTION,
	},
	twitter: {
		card: 'summary',
		title: {
			default: APP_DEFAULT_TITLE,
			template: APP_TITLE_TEMPLATE,
		},
		description: APP_DESCRIPTION,
	},
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
		<html lang="en" dir="ltr" suppressHydrationWarning>
			<head />
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
