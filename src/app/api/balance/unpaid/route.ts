import { NextRequest, NextResponse } from 'next/server';
import { fetchInAPI } from '@/lib/shared/api-server.utils';
import { BACKEND_URL } from '@/lib/const';
import { fetchAPI, fetchAPIWithQuery } from '@/lib/shared/api.utils.actions';

export async function GET(request: NextRequest) {
	const data = await fetchAPIWithQuery(request, `calculate-unpaid-balance`);

	return NextResponse.json(data, {
		status: 200,
	});
}
