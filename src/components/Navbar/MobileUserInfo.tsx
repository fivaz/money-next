'use client';

import { DisclosureButton } from '@headlessui/react';
import { CircleUser } from 'lucide-react';
import Link from 'next/link';
import DarkMode from './DarkMode';
import clsx from 'clsx';
import { ROUTES } from '@/lib/const';
import { useAuth } from '@/lib/user/AuthContext';
import Button from '@/components/Button';
import { logOut } from '@/lib/user/auth.utils.client';
import { useRouter } from 'next/navigation';
import SignOutButton from '@/components/Navbar/ProfileDropdown/SignOutButton';

type MobileUserInfoProps = {};

export default function MobileUserInfo({}: MobileUserInfoProps) {
	const { user } = useAuth();
	const router = useRouter();

	const handleLogout = async () => {
		await logOut();
		router.push(ROUTES.LOGIN.path);
	};

	return (
		<div className="border-t border-gray-200 pt-4 pb-3 dark:border-gray-700">
			<div className="flex items-center px-4">
				<div className="shrink-0">
					{user?.photoURL ? (
						<img className="size-10 rounded-full" src={user.photoURL} alt="" />
					) : (
						<CircleUser className="size-8 text-yellow-500" />
					)}
				</div>
				<div className="ml-3">
					<div className="text-base font-medium text-gray-800 dark:text-gray-200">
						{user?.displayName}
					</div>
					<div className="text-sm font-medium text-gray-500 dark:text-gray-400">{user?.email}</div>
				</div>
				<DarkMode className="ml-auto shrink-0" />
			</div>
			<div className="mt-3 space-y-1">
				<DisclosureButton
					as={Link}
					href={ROUTES.PROFILE.path}
					className={clsx(
						'block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200',
					)}
				>
					{ROUTES.PROFILE.name}
				</DisclosureButton>
				<SignOutButton
					className={clsx(
						'block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200',
					)}
				/>
			</div>
		</div>
	);
}
