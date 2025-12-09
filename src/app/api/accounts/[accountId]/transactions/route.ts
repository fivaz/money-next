import { NextRequest, NextResponse } from 'next/server';
import { validateTransactions } from '@/lib/transaction/transaction.model';
import { API } from '@/lib/const';
import { fetchAPIWithQuery } from '@/lib/shared/api.utils.actions';

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ accountId: string }> },
) {
	const { accountId } = await params;

	const backendUrl = `${API.ACCOUNTS}/${accountId}/${API.TRANSACTIONS}`;

	const data = await fetchAPIWithQuery(request, backendUrl);

	const transactions = validateTransactions(data);

	return NextResponse.json(transactions, {
		status: 200,
	});
}
