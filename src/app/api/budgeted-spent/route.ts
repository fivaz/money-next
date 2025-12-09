import { NextRequest, NextResponse } from 'next/server';
import { fetchAPIWithQuery } from '@/lib/shared/api.utils.actions';

export async function GET(request: NextRequest) {
	const data = await fetchAPIWithQuery(request, `calculate-budgeted-spent`);

	return NextResponse.json(data, {
		status: 200,
	});
}
