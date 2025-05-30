'use client';

import { ROUTES } from '@/lib/const';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';

export default function SignOutButton() {
	const handleSignOut = async () => {
		await signOut(auth);

		await fetch('/api/logout', {
			method: 'POST',
		}); // ✅ clear backend session

		window.location.href = ROUTES.LOGIN.path;
	};

	return (
		<button
			onClick={handleSignOut}
			className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:outline-none dark:text-gray-200 hover:dark:bg-gray-700"
		>
			Sign out
		</button>
	);
}
