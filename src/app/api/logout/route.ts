import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	const res = NextResponse.json({ message: 'Logged out' });
	res.cookies.set('firebase_token', '', {
		maxAge: 0,
		path: '/',
	});
	return res;
}
