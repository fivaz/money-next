import { NextRequest, NextResponse } from 'next/server';
import { fetchInAPI } from '@/lib/shared/api-server.utils';
import { ACCOUNTS_URL } from '@/lib/account/account.model';

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ accountId: string }> },
) {
	const { accountId } = await params;

	const backendUrl = `${ACCOUNTS_URL}/${accountId}/balance`;

	const data = await fetchInAPI(request, backendUrl);

	return NextResponse.json(data, { status: 200 });
}
