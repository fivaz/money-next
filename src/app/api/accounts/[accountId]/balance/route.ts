import { NextRequest, NextResponse } from 'next/server';
import { API } from '@/lib/const';
import { fetchAPIWithQuery } from '@/lib/shared/api.utils.actions';

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ accountId: string }> },
) {
	const { accountId } = await params;

	const backendUrl = `${API.ACCOUNTS}/${accountId}/balance`;

	const data = await fetchAPIWithQuery(request, backendUrl);

	return NextResponse.json(data, { status: 200 });
}
