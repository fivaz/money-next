import { z } from 'zod';

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
export function validateTransactions(data: unknown): Transaction[] {
	// Ensure data is an array
	if (!Array.isArray(data)) {
		console.warn('Expected an array of transactions, received:', data);
		return [];
	}

	// Validate each transaction individually
	const validTransactions: Transaction[] = [];
	data.forEach((item, index) => {
		const result = TransactionSchema.safeParse(item);
		if (result.success) {
			validTransactions.push(result.data);
		} else {
			console.warn(`Invalid transaction at index ${index}:`, {
				item,
				errors: result.error.format(),
			});
		}
	});

	return validTransactions;
}
