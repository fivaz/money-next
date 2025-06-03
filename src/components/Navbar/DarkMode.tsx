'use client';

import { Moon, Sun } from 'lucide-react';
import { Switch } from '@headlessui/react';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useTheme } from 'next-themes';
import { Skeleton } from '@/components/Skeleton';

export default function DarkMode({ className }: { className?: string }) {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	const isDark = theme === 'dark';

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return <Skeleton />;
	}

	return (
		<Switch
			checked={isDark}
			onChange={() => setTheme(isDark ? 'light' : 'dark')}
			className={clsx(
				className,
				'relative inline-flex h-8 w-14 items-center rounded-full ring-2 ring-gray-500 transition-colors outline-none dark:focus:ring-white',
			)}
		>
			<span className="sr-only">Toggle Dark Mode</span>
			<span className="absolute left-1 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md transition-all dark:left-7 dark:bg-gray-800">
				{isDark ? (
					<Sun className="size-5 text-yellow-500" aria-hidden="true" />
				) : (
					<Moon className="size-5 text-indigo-500" aria-hidden="true" />
				)}
			</span>
		</Switch>
	);
}
