// app/api/auth/set-token/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { COOKIE_AUTH_KEY } from '@/lib/auth/auth.utils';

export async function POST(request: NextRequest) {
	try {
		const { token } = await request.json();

		if (!token) {
			return NextResponse.json({ error: 'No token provided' }, { status: 400 });
		}

		(await cookies()).set(COOKIE_AUTH_KEY, token, {
			httpOnly: true,
			secure: true,
			path: '/',
			maxAge: 60 * 60 * 24 * 7,
		});

		return Response.json({ success: true });
	} catch (error) {
		return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
	}
}
