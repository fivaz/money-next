import { NextRequest, NextResponse } from 'next/server';
import { fetchInAPI } from '@/lib/shared/api-server.utils';
import { ACCOUNTS_URL, validateAccounts } from '@/lib/account/account.model';

export async function GET(request: NextRequest) {
	const data = await fetchInAPI(request.cookies, ACCOUNTS_URL);

	const accounts = validateAccounts(data);

	return NextResponse.json(accounts, {
		status: 200,
	});
}
