'use server';
import { BACKEND_URL } from '@/lib/const';
import { fetchWithAuth } from '@/lib/shared/api-server.utils';

export async function getActualBalance(): Promise<number> {
	return await fetchWithAuth(`${BACKEND_URL}/calculate-balance`);
}
