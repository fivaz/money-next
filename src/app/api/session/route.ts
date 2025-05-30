import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	const { idToken } = await req.json();

	if (!idToken) {
		return NextResponse.json({ error: 'Missing token' }, { status: 400 });
	}

	const response = NextResponse.json({ message: 'Session created' });
	response.cookies.set('firebase_token', idToken, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		maxAge: 60 * 60, // 1 hour
		path: '/',
	});

	return response;
}
