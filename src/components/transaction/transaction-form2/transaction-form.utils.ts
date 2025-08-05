import { Transaction } from '@/lib/transaction2/transaction2.model';

export type OperationType = 'income' | 'expense' | 'transfer';

export type TransactionIn = Transaction & {
	operation: OperationType;
};
