import { NextRequest, NextResponse } from 'next/server';
import { BACKEND_URL } from '@/lib/const';
import { fetchAPIWithQuery } from '@/lib/shared/api.utils.actions';

export async function GET(request: NextRequest) {
	const data = await fetchAPIWithQuery(request, `${BACKEND_URL}/calculate-budgeted-spent`);

	return NextResponse.json(data, {
		status: 200,
	});
}
