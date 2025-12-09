import { NextRequest, NextResponse } from 'next/server';
import { validateAccounts } from '@/lib/account/account.model';
import { fetchAPIWithQuery } from '@/lib/shared/api.utils.actions';
import { API } from '@/lib/const';

export async function GET(request: NextRequest) {
	const data = await fetchAPIWithQuery(request, API.ACCOUNTS);

	const accounts = validateAccounts(data);

	return NextResponse.json(accounts, {
		status: 200,
	});
}
