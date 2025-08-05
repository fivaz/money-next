import { Transaction } from '@/lib/transaction/transaction.model';
import { Account } from '@/lib/account/account.model';

export type OperationType = 'income' | 'expense' | 'transfer';

export type TransactionIn = Transaction & {
	operation: OperationType;
};

const getOperation = (transaction: Partial<Transaction | undefined>): OperationType => {
	if (transaction?.destination) {
		return 'transfer';
	}

	return transaction?.amount && transaction?.amount > 0 ? 'income' : 'expense';
};

export const getEmptyTransactionIn = (
	transaction: Partial<Transaction> | undefined,
	accounts: Account[],
): TransactionIn => {
	return {
		id: transaction?.id || 0,
		description: transaction?.description || '',
		amount: transaction?.amount || 0,
		date: transaction?.date || '',
		budget: transaction?.budget || null,
		account: transaction?.account || accounts[0],
		destination: transaction?.destination || null,
		isPaid: transaction?.isPaid ?? true,
		referenceDate: transaction?.referenceDate || '',
		spreadStart: transaction?.spreadStart || '',
		spreadEnd: transaction?.spreadEnd || '',
		operation: getOperation(transaction),
	};
};

export const getTransactionFromIn = (transactionIn: TransactionIn): Transaction => {
	const { operation, ...rest } = transactionIn;

	const isTransfer = operation === 'transfer';

	return {
		...rest,
		destination: isTransfer ? rest.destination : null,
		amount: operation === 'income' ? Math.abs(rest.amount) : -Math.abs(rest.amount), // expense or transfer → negative
	};
};
