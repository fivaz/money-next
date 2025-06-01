import { z } from 'zod';
import { Transaction, TransactionSchema } from '@/lib/transaction/transaction.model';
import { validateSchema } from '@/lib/shared.model';

export const BudgetSchema = z.object({
	name: z.string(),
	amount: z.number(),
	icon: z.string(),
	sortOrder: z.number(),
	parent: z.string().nullable(),
	// optional
	id: z.number().int().optional(),
	userId: z.string().optional(),
	createdAt: z.string().optional(),
	isDeleted: z.boolean().optional(),
});

export const BudgetWithTransactionsSchema = BudgetSchema.extend({
	transactions: z.array(TransactionSchema),
});

export type Budget = z.infer<typeof BudgetSchema>;

export type BudgetWithTransactions = z.infer<typeof BudgetWithTransactionsSchema>;

export const validateBudgets = (data: unknown) => validateSchema(data, BudgetSchema, 'budget');

export const validateBudgetsWithTransactions = (data: unknown) =>
	validateSchema(data, BudgetWithTransactionsSchema, 'budget with transactions');
