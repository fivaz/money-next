import { z } from 'zod';

export const BudgetSchema = z.object({
	name: z.string(),
	amount: z.number(),
	icon: z.string(),
	sortOrder: z.number(),
	// optional
	id: z.number().int().optional(),
	userId: z.string().optional(),
	createdAt: z.string().optional(),
	parent: z.string().optional(),
	isDeleted: z.boolean().optional(),
});

export type Budget = z.infer<typeof BudgetSchema>;

// Function to validate budgets and filter out invalid ones
export function validateBudgets(data: unknown): Budget[] {
	// Ensure data is an array
	if (!Array.isArray(data)) {
		console.warn('Expected an array of budgets, received:', data);
		return [];
	}

	// Validate each budget individually
	const validBudgets: Budget[] = [];
	data.forEach((item, index) => {
		const result = BudgetSchema.safeParse(item);
		if (result.success) {
			validBudgets.push(result.data);
		} else {
			console.warn(`Invalid budget at index ${index}:`, {
				item,
				errors: result.error.format(),
			});
		}
	});

	return validBudgets;
}
