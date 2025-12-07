import { cookies } from 'next/headers';
import { COOKIE_AUTH_KEY } from '@/lib/auth/auth.utils';

export async function getToken() {
	return (await cookies()).get(COOKIE_AUTH_KEY)?.value;
}
