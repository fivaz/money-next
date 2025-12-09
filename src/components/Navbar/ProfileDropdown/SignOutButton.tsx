'use client';

import { ROUTES } from '@/lib/const';
import { logoutAction } from '@/lib/auth2/utils.actions';

export default function SignOutButton({
	className = 'block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:outline-none dark:text-gray-200 hover:dark:bg-gray-700',
}: {
	className?: string;
}) {
	const handleSignOut = async () => {
		await logoutAction();

		window.location.href = ROUTES.LOGIN.path;
	};

	return (
		<button onClick={handleSignOut} className={className}>
			Sign out
		</button>
	);
}
