'use client';

import { Disclosure } from '@headlessui/react';
import { CircleUser } from 'lucide-react';
import Link from 'next/link';
import DarkMode from './DarkMode';

interface NavigationItem {
	name: string;
	href?: string;
	onClick?: () => void;
}

interface MobileUserInfoProps {
	user: { name: string; email: string; imageUrl: string | null };
	userNavigation: NavigationItem[];
}

export default function MobileUserInfo({ user, userNavigation }: MobileUserInfoProps) {
	const navigationItems = userNavigation.map((item) => ({
		...item,
		isLink: !!item.href,
		isButton: !!item.onClick,
	}));

	function handleItemClick(item: NavigationItem) {
		if (item.onClick) {
			item.onClick();
		}
	}

	return (
		<div className="border-t border-gray-200 pt-4 pb-3 dark:border-gray-700">
			<div className="flex items-center px-4">
				<div className="shrink-0">
					{user.imageUrl ? (
						<img className="size-10 rounded-full" src={user.imageUrl} alt="" />
					) : (
						<CircleUser className="size-8 text-yellow-500" />
					)}
				</div>
				<div className="ml-3">
					<div className="text-base font-medium text-gray-800 dark:text-gray-200">{user.name}</div>
					<div className="text-sm font-medium text-gray-500 dark:text-gray-400">{user.email}</div>
				</div>
				<DarkMode className="ml-auto shrink-0" />
			</div>
			<div className="mt-3 space-y-1">
				{navigationItems.map((item) => (
					<Disclosure.Button
						key={item.name}
						as={item.isLink ? Link : 'button'}
						href={item.isLink ? item.href : undefined}
						onClick={item.isButton ? () => handleItemClick(item) : undefined}
						className={[
							'block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200',
							item.isButton ? 'w-full text-left' : '',
						].join(' ')}
					>
						{item.name}
					</Disclosure.Button>
				))}
			</div>
		</div>
	);
}
