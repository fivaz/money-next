import { z } from 'zod';
import { validateSchema } from '@/lib/shared.model';
import { BudgetSchema } from '@/lib/budget/budget.model';

export const TransactionSchema = z.object({
	description: z.string(),
	amount: z.number(),
	date: z
		.string()
		.regex(
			/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/,
			'Date must be in YYYY-MM-DDTHH:mm format (e.g., 2025-05-30T23:53)',
		), // Validate local datetime format
	// optional
	id: z.number().int().optional(),
	userId: z.string().optional(),
	createdAt: z.string().optional(),
	referenceDate: z.string().date().optional(),
	isPaid: z.boolean().optional(),
	isDeleted: z.boolean().optional(),
});

export type Transaction = z.infer<typeof TransactionSchema>;

// Function to validate transactions and filter out invalid ones
export const validateTransactions = (data: unknown) =>
	validateSchema(data, TransactionSchema, 'transaction');
