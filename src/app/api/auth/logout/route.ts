// app/api/auth/logout/route.ts
import { cookies } from 'next/headers';
import { COOKIE_AUTH_KEY } from '@/lib/auth/auth.utils';

export async function POST() {
	(await cookies()).delete(COOKIE_AUTH_KEY);
	return Response.json({ ok: true });
}
