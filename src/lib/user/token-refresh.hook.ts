'use client';
import { useEffect } from 'react';
import { getAuth, onIdTokenChanged } from 'firebase/auth';

export function useAuthTokenRefresher() {
	useEffect(() => {
		const auth = getAuth();

		const unsubscribe = onIdTokenChanged(auth, async (user) => {
			if (user) {
				const token = await user.getIdToken(true); // force refresh
				await fetch('/api/session', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ idToken: token }),
				});
			}
		});

		return () => unsubscribe();
	}, []);
}
