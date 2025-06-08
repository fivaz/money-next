import { z } from 'zod';
import { validateSchema } from '@/lib/shared/shared.model';
import { BudgetSchema } from '@/lib/budget/budget.model';
import { API, BACKEND_URL } from '@/lib/const';

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
	referenceDate: z.string().date().optional(),
	isPaid: z.boolean().optional(),
	spreadStart: z.string().date().optional(),
	spreadEnd: z.string().date().optional(),
});

const PaginatedTransactionSchema = z.object({
	content: z.array(TransactionSchema),
	pageable: z.object({
		pageNumber: z.number(),
		pageSize: z.number(),
	}),
	totalPages: z.number(),
});

export type Transaction = z.infer<typeof TransactionSchema>;

export type PaginatedTransactions = z.infer<typeof PaginatedTransactionSchema>;

// Function to validate transactions and filter out invalid ones
export const validateTransactions = (data: unknown) =>
	validateSchema(data, TransactionSchema, 'transaction');

export const validatePaginatedTransactions = (data: unknown): PaginatedTransactions => {
	const result = PaginatedTransactionSchema.safeParse(data);
	if (result.success) {
		return result.data;
	} else {
		console.warn(`Invalid type`, {
			item: result.data,
			errors: result.error.format(),
		});
		return result.data as unknown as PaginatedTransactions;
	}
};

export const TRANSACTIONS_URL = `${BACKEND_URL}/${API.TRANSACTIONS}`;
