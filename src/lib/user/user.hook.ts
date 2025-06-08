import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { User } from '@/lib/user/user.model';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/const';

export const useUser = () => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
			setUser(firebaseUser);
			setLoading(false);
			if (firebaseUser) {
				router.push(ROUTES.ROOT.path);
			}
		});
		return () => unsubscribe();
	}, [router]);

	return { user, loading };
};
