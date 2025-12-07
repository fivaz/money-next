'use client';

import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { ROUTES } from '@/lib/const';

export default function SignOutButton({
	className = 'block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:outline-none dark:text-gray-200 hover:dark:bg-gray-700',
}: {
	className?: string;
}) {
	const handleSignOut = async () => {
		await signOut(auth);

		await fetch('/api/auth/logout', { method: 'POST' });

		window.location.href = ROUTES.LOGIN.path;
	};

	return (
		<button onClick={handleSignOut} className={className}>
			Sign out
		</button>
	);
}
