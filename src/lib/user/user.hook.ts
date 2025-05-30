import { useEffect, useState } from 'react';
import { getRedirectResult, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from '../firebase';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/const';
import { User } from '@/lib/user/user.model';

export const useUser = () => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	const router = useRouter();

	useEffect(() => {
		setLoading(true);
		getRedirectResult(auth).then((result) => {
			if (result) {
				void router.push(ROUTES.ROOT.path);
			}
		});

		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user);
			setLoading(false);
		});

		return () => unsubscribe();
	}, [router, setLoading, setUser]);

	return { user, loading };
};
