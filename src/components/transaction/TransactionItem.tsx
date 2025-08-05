'use client';
import { Strong, Text } from '@/components/base/text';
import { Transaction } from '@/lib/transaction/transaction.model';
import { ArrowLeftRightIcon, CalendarIcon, ClockIcon, CogIcon, CompassIcon } from 'lucide-react';
import TransactionFormButton from '@/components/transaction/transaction-form/TransactionFormButton';
import { format, parse } from 'date-fns';
import { useMemo } from 'react';
import MoneyText from '@/components/MoneyText';
import { DATE_FORMAT, formatFRDate } from '@/lib/shared/date.utils';
import IconView from '@/components/icon-picker/IconView';
import PieChartIcon from '@/components/icons/PieChartIcon';
import Tooltip from '../Tooltip';
import { getAmount } from '@/lib/transaction/transaction.utils';

type TransactionItemProps = {
	accountId?: number;
	transaction: Transaction;
	isEditable?: boolean;
};

export default function TransactionItem({
	transaction,
	accountId = transaction.account.id,
	isEditable = true,
}: TransactionItemProps) {
	const date = useMemo(() => {
		const date = parse(transaction.date, DATE_FORMAT, new Date());
		return {
			short: format(date, 'dd.MM'),
			long: format(date, 'dd.MMM'),
			time: format(date, 'hh:mm'),
		};
	}, [transaction.date]);

	return (
		<li className="flex items-center justify-between bg-white px-3 py-2 dark:bg-gray-700">
			<div className="flex min-w-0 items-center gap-2 sm:gap-4">
				<div className="flex min-w-0 items-center gap-1">
					<Text className="flex shrink-0 items-center gap-2">
						<CalendarIcon className="hidden size-4 shrink-0 md:block" />
						<span className="block w-12 md:hidden">{date.short}</span>
						<span className="hidden w-14 md:block">{date.long}</span>
					</Text>
					<Text className="hidden shrink-0 items-center gap-2 md:flex">
						<ClockIcon className="size-4 shrink-0" />
						<span className="w-10">{date.time}</span>
					</Text>
				</div>

				<div className="flex items-center gap-2 truncate">
					<Strong>
						<IconView className="size-4 shrink-0 text-yellow-500" name={transaction.budget?.icon} />
					</Strong>
					<Strong className="min-w-0 flex-1 truncate">
						{transaction.description.trim() || transaction.budget?.name}
					</Strong>
				</div>
			</div>

			<div className="flex shrink-0 items-center gap-2">
				{transaction.spreadStart && transaction.spreadEnd && (
					<Tooltip message={`transaction spreads`}>
						<PieChartIcon className="size-5 text-yellow-500" />
					</Tooltip>
				)}

				{transaction.referenceDate && (
					<Tooltip message={`reference date: ${formatFRDate(transaction.referenceDate)}`}>
						<CompassIcon className="size-5 text-yellow-500" />
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

				{isEditable && (
					<TransactionFormButton transaction={transaction} size="p-2">
						<CogIcon className="size-4 shrink-0" />
					</TransactionFormButton>
				)}
			</div>
		</li>
	);
}
