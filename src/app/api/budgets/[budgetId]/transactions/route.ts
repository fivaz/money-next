import { NextRequest, NextResponse } from 'next/server';
import { validateTransactions } from '@/lib/transaction/transaction.model';
import { fetchAPIWithQuery } from '@/lib/shared/api.utils.actions';
import { API } from '@/lib/const';

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ budgetId: string }> },
) {
	const { budgetId } = await params;

	const data = await fetchAPIWithQuery(request, `${API.BUDGETS}/${budgetId}/${API.TRANSACTIONS}`);

	const transactions = validateTransactions(data);

	return NextResponse.json(transactions, {
		status: 200,
	});
}
