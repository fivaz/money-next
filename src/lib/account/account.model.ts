import { z } from 'zod';
import { validateSchema } from '@/lib/shared/shared.model';
import { API, BACKEND_URL } from '@/lib/const';

export const AccountSchema = z.object({
	id: z.number().int(),
	name: z.string(),
	icon: z.string(),
	sortOrder: z.number(),
});

export type Account = z.infer<typeof AccountSchema>;

export const validateAccounts = (data: unknown) => validateSchema(data, AccountSchema, 'account');

export const ACCOUNTS_URL = `${BACKEND_URL}/${API.ACCOUNTS}`;
