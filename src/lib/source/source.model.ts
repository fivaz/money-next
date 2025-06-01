import { z } from 'zod';
import { Transaction, TransactionSchema } from '@/lib/transaction/transaction.model';
import { validateSchema } from '@/lib/shared/shared.model';
import { API, BACKEND_URL } from '@/lib/const';

export const SourceSchema = z.object({
	id: z.number().int(),
	name: z.string(),
	balance: z.number(),
	icon: z.string(),
	sortOrder: z.number(),
});

export type Source = z.infer<typeof SourceSchema>;

export const validateSources = (data: unknown) => validateSchema(data, SourceSchema, 'source');

export const SOURCES_URL = `${BACKEND_URL}/${API.SOURCES}`;
