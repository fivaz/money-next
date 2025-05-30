import { useEffect, useState } from 'react';
import { getRedirectResult, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from '../firebase';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/const';
import { User } from '@/lib/user/user.model';

export const useUser = () => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
			setUser(firebaseUser);
			setLoading(false);
		});
		return () => unsubscribe();
	}, []);

	return { user, loading };
};
