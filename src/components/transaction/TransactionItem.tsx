'use client';
import { Strong, Text } from '@/components/base/text';
import { Transaction } from '@/lib/transaction/transaction.model';
import {
	ArrowLeftRightIcon,
	CalendarFoldIcon,
	CalendarIcon,
	ClockIcon,
	CogIcon,
	CompassIcon,
} from 'lucide-react';
import TransactionFormButton from '@/components/transaction/transaction-form/TransactionFormButton';
import { format, parseISO } from 'date-fns';
import { useMemo } from 'react';
import MoneyText from '@/components/MoneyText';
import { formatFRDate } from '@/lib/shared/date.utils';
import IconView from '@/components/icon-picker/IconView';
import Tooltip from '../Tooltip';
import { getAmount } from '@/lib/transaction/transaction.utils';

type TransactionItemProps = {
	accountId?: number;
	transaction: Transaction;
};

export default function TransactionItem({
	transaction,
	accountId = transaction.account.id,
}: TransactionItemProps) {
	const date = useMemo(() => {
		const date = parseISO(transaction.date);
		return {
			short: format(date, 'dd.MM'),
			long: format(date, 'dd.MMM'),
			time: format(date, 'HH:mm'),
		};
	}, [transaction.date]);

	return (
		<li className="flex items-center justify-between bg-white px-3 py-2 dark:bg-gray-700">
			<div className="flex items-center gap-2 truncate">
				<Text className="block w-10 md:hidden">{date.short}</Text>

				<div className="hidden items-center gap-2 md:flex">
					<Text className="flex shrink-0 items-center gap-2">
						<CalendarIcon className="hidden size-4 shrink-0 md:block" />
						<span className="hidden w-12 md:block">{date.long}</span>
					</Text>

					<Text className="hidden shrink-0 items-center gap-2 md:flex">
						<ClockIcon className="size-4 shrink-0" />
						<span className="w-10">{date.time}</span>
					</Text>
				</div>

				<Strong>
					<IconView className="size-4 shrink-0 text-yellow-500" name={transaction.budget?.icon} />
				</Strong>

				<Strong className="flex-1 truncate">
					{transaction.description.trim() || transaction.budget?.name}
				</Strong>
			</div>

			<div className="flex shrink-0 items-center gap-2">
				{transaction.spreadStart && transaction.spreadEnd && (
					<Tooltip message={`transaction spreads`}>
						<CalendarFoldIcon className="size-4 text-yellow-500" />
					</Tooltip>
				)}

				{transaction.referenceDate && (
					<Tooltip message={`reference date: ${formatFRDate(transaction.referenceDate)}`}>
						<CompassIcon className="size-4 text-yellow-500" />
					</Tooltip>
				)}

				{transaction.destination && (
					<Tooltip message={`transfer between accounts`}>
						<ArrowLeftRightIcon className="size-4 text-yellow-500" />
					</Tooltip>
				)}

				<Text>
					<MoneyText addColor={transaction.isPaid}>{getAmount(transaction, accountId)}</MoneyText>
				</Text>

				<TransactionFormButton transaction={transaction} size="p-2">
					<CogIcon className="size-4 shrink-0" />
				</TransactionFormButton>
			</div>
		</li>
	);
}
