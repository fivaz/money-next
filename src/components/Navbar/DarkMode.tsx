'use client';

import { Moon, Sun } from 'lucide-react';
import { Switch } from '@headlessui/react';
import { useState, useEffect } from 'react';
import clsx from 'clsx';

export default function DarkMode({ className }: { className?: string }) {
	const [isDark, setIsDark] = useState(false);

	function getDarkMode() {
		return (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		);
	}

	useEffect(() => {
		const darkMode = getDarkMode();
		setIsDark(darkMode);
		document.documentElement.classList.toggle('dark', darkMode);
	}, []);

	useEffect(() => {
		localStorage.theme = isDark ? 'dark' : 'light';
		document.documentElement.classList.toggle('dark', isDark);
	}, [isDark]);

	return (
		<Switch
			checked={isDark}
			onChange={setIsDark}
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
