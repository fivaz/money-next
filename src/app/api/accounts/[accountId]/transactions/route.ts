import { NextRequest, NextResponse } from 'next/server';
import { validateTransactions } from '@/lib/transaction/transaction.model';
import { API } from '@/lib/const';
import { fetchInAPI } from '@/lib/shared/api-server.utils';
import { ACCOUNTS_URL } from '@/lib/account/account.model';

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ accountId: string }> },
) {
	const { accountId } = await params;

	const backendUrl = `${ACCOUNTS_URL}/${accountId}/${API.TRANSACTIONS}`;

	const data = await fetchInAPI(request, backendUrl);

	const transactions = validateTransactions(data);

	return NextResponse.json(transactions, {
		status: 200,
	});
}
