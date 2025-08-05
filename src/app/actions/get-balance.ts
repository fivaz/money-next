'use server';
import { BACKEND_URL } from '@/lib/const';
import { fetchInAction } from '@/lib/shared/api-server.utils';

export async function getBudgetedSpent({
	year,
	month,
}: {
	year: number;
	month: number;
}): Promise<number> {
	return fetchInAction(`${BACKEND_URL}/calculate-budgeted-spent?year=${year}&month=${month}`);
}
