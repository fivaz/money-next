import { NextRequest, NextResponse } from 'next/server';
import { fetchInAPI } from '@/lib/shared/api-server.utils';
import { BACKEND_URL } from '@/lib/const';

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const month = searchParams.get('month');
	const year = searchParams.get('year');

	const backendUrl = new URL(`${BACKEND_URL}/calculate-budgeted-spent`);

	if (month) backendUrl.searchParams.append('month', month);
	if (year) backendUrl.searchParams.append('year', year);

	const data = await fetchInAPI(request.cookies, backendUrl.toString());

	return NextResponse.json(data, {
		status: 200,
	});
}
