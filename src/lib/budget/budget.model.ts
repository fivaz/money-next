import { z } from 'zod';
import { validateSchema } from '@/lib/shared/shared.model';

export const BudgetSchema = z.object({
	id: z.number().int(),
	name: z.string(),
	amount: z.number(),
	accumulativeAmount: z.number().optional(),
	isAccumulative: z.boolean(),
	icon: z.string(),
	sortOrder: z.number(),
	parent: z.string().nullable(),
	startAt: z.string().nullable(),
	endAt: z.string().nullable(),
});

export type Budget = z.infer<typeof BudgetSchema>;

export const validateBudgets = (data: unknown) => validateSchema(data, BudgetSchema, 'budget');
