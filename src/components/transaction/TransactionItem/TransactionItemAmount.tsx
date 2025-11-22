import { PropsWithChildren } from 'react';
import clsx from 'clsx';
import { formatMoney } from '@/lib/shared/utils';
import { getAmount } from '@/lib/transaction/transaction.utils';
import { Transaction } from '@/lib/transaction/transaction.model';
import { parseISODate, useYearMonth } from '@/lib/shared/date.utils';
import { startOfDay } from 'date-fns';

type MoneyTextProps = PropsWithChildren<{
	transaction: Transaction;
	accountId: number;
}>;

export default function TransactionItemAmount({ transaction, accountId }: MoneyTextProps) {
	const amount = getAmount(transaction, accountId);
	const isNegative = amount < 0;
	const sign = isNegative ? '-' : '+';
	const [, , asOf] = useYearMonth();

	// Compare the transaction date to the 'asOf' date string (yyyy-MM-dd)
	const isFuture = startOfDay(new Date(transaction.date)) > parseISODate(asOf);

	// Color Logic
	let colorClass = '';

	// 1. If unpaid, no color class is applied (inherits default text color)
	if (transaction.isPaid) {
		if (isNegative) {
			// 2. If in the future (relative to asOf), use lighter red (300), else normal red (500)
			colorClass = isFuture ? 'text-red-300' : 'text-red-500';
		} else {
			// 3. If in the future (relative to asOf), use lighter green (300), else normal green (500)
			colorClass = isFuture ? 'text-green-300' : 'text-green-500';
		}
	}

	return (
		<span className={clsx({ [colorClass]: amount !== 0 })}>
			<>
				${amount !== 0 && ` ${sign}`}
				{formatMoney(amount)}
			</>
		</span>
	);
}
