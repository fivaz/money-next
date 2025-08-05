import { Account } from '@/lib/account/account.model';
import type { Transaction } from '@/lib/transaction2/transaction2.model';
import { API } from '@/lib/const';
import useSWR from 'swr';
import { fetcher } from '@/lib/shared/api-client.utils';
import type { Budget } from '@/lib/budget/budget.model';
import { differenceInMonths } from 'date-fns';
import {
	OperationType,
	TransactionIn,
} from '@/components/transaction/transaction-form2/transaction-form.utils';

export const buildTransaction = (
	formData: FormData,
	budgets: Budget[],
	accounts: Account[],
): Transaction => {
	const operation = formData.get('operation') as string;

	const amountValue = parseInt(formData.get('amount') as string);

	const amount = Math.abs(amountValue) * (operation === 'income' ? 1 : -1);

	const budget =
		budgets.find((budget) => budget.id === Number(formData.get('budget'))) ||
		null;

	let account = accounts.find(
		(account) => account.id === Number(formData.get('account')),
	);

	let destination =
		accounts.find(
			(account) => account.id === Number(formData.get('destination')),
		) || null;

	if (!account) {
		console.error('Account not found');
		account = accounts[0];
	}

	return {
		id: Number(formData.get('id')),
		description: formData.get('description') as string,
		amount,
		date: formData.get('date') as string,
		budget,
		account,
		destination,
		isPaid: formData.get('isPaid') === 'on',
		referenceDate: formData.get('referenceDate') as string,
		spreadStart: formData.get('spreadStart') as string,
		spreadEnd: formData.get('spreadEnd') as string,
	};
};

export const sortTransactions = (a: Transaction, b: Transaction) =>
	new Date(b.date).getTime() - new Date(a.date).getTime();

// export const sumTransactions = (transactions: Transaction[]): number =>
// 	transactions
// 		.filter((t) => t.isPaid)
// 		.reduce((sum, t) => sum + getAmount(t), 0);

export const getAmount = (
	transaction: Transaction,
	accountId: number,
): number => {
	let baseAmount = transaction.amount;

	// Handle spread
	if (transaction.spreadStart && transaction.spreadEnd) {
		try {
			const spreadMonths =
				differenceInMonths(
					new Date(transaction.spreadEnd),
					new Date(transaction.spreadStart),
				) + 1;
			baseAmount = baseAmount / spreadMonths;
		} catch (error) {
			console.error(error);
			// fallback to full amount if error in spread calc
		}
	}

	// Make amount positive if this account is the destination
	if (transaction.destination?.id === accountId) {
		return Math.abs(baseAmount);
	}

	return baseAmount;
};

export const fetchAccountTransactions = (
	accountId: number,
	year: number,
	month: number,
) => {
	const url = `/api/${API.ACCOUNTS}/${accountId}/${API.TRANSACTIONS}?year=${year}&month=${month}`;

	const { data: initialTransactionsData } = useSWR<Transaction[]>(url, fetcher);

	return initialTransactionsData || [];
};
