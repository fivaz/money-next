import { z } from 'zod';
import { validateSchema } from '@/lib/shared/shared.model';
import { BudgetSchema } from '@/lib/budget/budget.model';
import { API, BACKEND_URL } from '@/lib/const';
import { formatForInput } from '@/lib/shared/date.utils';

export const TransactionSchema = z.object({
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
	referenceDate: z.string().date().optional(),
	isPaid: z.boolean().optional(),
});

export type Transaction = z.infer<typeof TransactionSchema>;

// Function to validate transactions and filter out invalid ones
export const validateTransactions = (data: unknown) =>
	validateSchema(data, TransactionSchema, 'transaction');

export const TRANSACTIONS_URL = `${BACKEND_URL}/${API.TRANSACTIONS}`;

export type TransactionIn = Omit<Transaction, 'amount'> & { amount: string };

export const emptyTransaction = (): Transaction => ({
	id: 0,
	description: '',
	isPaid: true,
	date: formatForInput(),
	amount: 0,
	budget: null,
	referenceDate: undefined,
});
