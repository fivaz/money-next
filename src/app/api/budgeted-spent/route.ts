import { NextRequest, NextResponse } from 'next/server';
import { fetchInAPI } from '@/lib/shared/api-server.utils';
import { BACKEND_URL } from '@/lib/const';

export async function GET(request: NextRequest) {
	const data = await fetchInAPI(request, `${BACKEND_URL}/calculate-budgeted-spent`);

	return NextResponse.json(data, {
		status: 200,
	});
}
