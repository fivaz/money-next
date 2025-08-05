import { z } from 'zod';
import { validateSchema } from '@/lib/shared/shared.model';
import { API, BACKEND_URL } from '@/lib/const';
import { BudgetSchema } from '@/lib/budget/budget.model';
import { AccountSchema } from '@/lib/account/account.model';

const TransactionSchema = z.object({
	id: z.number().int(),
	description: z.string(),
	amount: z.number(),
	date: z
		.string()
		.regex(
			/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/,
			'Date must be in YYYY-MM-DDTHH:mm format (e.g., 2025-05-30T23:53)',
		), // Validate local datetime format
	// optional
	budget: BudgetSchema.nullable(),
	account: AccountSchema,
	destination: AccountSchema.nullable(),
	isPaid: z.boolean(),
	// ✅ Accept either YYYY-MM-DD or empty string
	referenceDate: z.union([
		z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be in YYYY-MM-DD format'),
		z.literal(''),
	]),
	spreadStart: z.union([
		z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be in YYYY-MM-DD format'),
		z.literal(''),
	]),
	spreadEnd: z.union([
		z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be in YYYY-MM-DD format'),
		z.literal(''),
	]),
});
export type Transaction = z.infer<typeof TransactionSchema>;

export const validateTransactions = (data: unknown) =>
	validateSchema(data, TransactionSchema, 'transaction');

export const TRANSACTIONS_URL = `${BACKEND_URL}/${API.TRANSACTIONS}`;
