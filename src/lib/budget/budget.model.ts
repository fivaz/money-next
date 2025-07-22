import { z } from 'zod';
import { validateSchema } from '@/lib/shared/shared.model';
import { API, BACKEND_URL } from '@/lib/const';

export const BudgetSchema = z.object({
	id: z.number().int(),
	name: z.string(),
	amount: z.number(),
	icon: z.string(),
	sortOrder: z.number(),
	parent: z.string().nullable(),
	startAt: z.string().optional(),
	endAt: z.string().optional(),
});

export type Budget = z.infer<typeof BudgetSchema>;

export const validateBudgets = (data: unknown) => validateSchema(data, BudgetSchema, 'budget');

export const BUDGETS_URL = `${BACKEND_URL}/${API.BUDGETS}`;
