import { z } from 'zod';
import { TransactionSchema } from '@/lib/transaction/transaction.model';
import { BudgetSchema } from '@/lib/budget/budget.model';
import { validateSchema } from '@/lib/shared.model';

export const BudgetWithTransactionsSchema = BudgetSchema.extend({
	transactions: z.array(TransactionSchema),
});

export type BudgetWithTransactions = z.infer<typeof BudgetWithTransactionsSchema>;

export const validateBudgetsWithTransactions = (data: unknown) =>
	validateSchema(data, BudgetWithTransactionsSchema, 'budget with transactions');
