'use client';
import { Strong, Text } from '@/components/base/text';
import { Transaction } from '@/lib/transaction/transaction.model';
import { CalendarIcon, ClockIcon, CogIcon } from 'lucide-react';
import { type TransactionFormProps } from '@/components/transaction/transaction-form/TransactionForm';
import TransactionFormButton from '@/components/transaction/transaction-form/TransactionFormButton';
import { format, parse } from 'date-fns';
import { useMemo } from 'react';
import MoneyText from '@/components/MoneyText';
import { DATE_FORMAT } from '@/lib/shared/shared.model';
import IconView from '@/components/icon-picker/IconView';

type TransactionItemProps = {
	transaction: Transaction;
} & Pick<TransactionFormProps, 'onConfirmSaveAction' | 'onAddOptimisticAction' | 'onDeleteAction'>;

export default function TransactionItem({
	transaction,
	onAddOptimisticAction,
	onConfirmSaveAction,
	onDeleteAction,
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
			<div className="flex min-w-0 items-center gap-4">
				<div className="flex min-w-0 items-center gap-2">
					<Text className="flex shrink-0 items-center gap-2">
						<CalendarIcon className="hidden size-4 shrink-0 md:block" />
						<span className="block md:hidden">{date.short}</span>
						<span className="hidden md:block">{date.long}</span>
					</Text>
					<Text className="hidden shrink-0 items-center gap-2 md:flex">
						<ClockIcon className="size-4 shrink-0" />
						<span className="">{date.time}</span>
					</Text>
				</div>

				<div className="flex items-center gap-2 truncate">
					<Strong>
						<IconView className="size-4 shrink-0 text-yellow-500" name={transaction.budget?.icon} />
					</Strong>
					<Strong className="min-w-0 flex-1 truncate">
						{transaction.description || transaction.budget?.name}
					</Strong>
				</div>
			</div>

			<div className="flex shrink-0 items-center gap-2">
				<MoneyText>{transaction.amount}</MoneyText>

				<TransactionFormButton
					transaction={transaction}
					onAddOptimisticAction={onAddOptimisticAction}
					onConfirmSaveAction={onConfirmSaveAction}
					onDeleteAction={onDeleteAction}
				>
					<CogIcon className="size-4 shrink-0" />
				</TransactionFormButton>
			</div>
		</li>
	);
}
