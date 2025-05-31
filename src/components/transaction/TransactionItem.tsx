'use client';
import { Text } from '@/components/base/text';
import { DATE_FORMAT, Transaction } from '@/lib/transaction/transaction.model';
import { CalendarIcon, ClockIcon, CogIcon, CombineIcon } from 'lucide-react';
import TransactionForm, {
	type TransactionFormProps,
} from '@/components/transaction/transaction-form/TransactionForm';
import TransactionFormButton from '@/components/transaction/transaction-form/TransactionFormButton';
import { format, parse } from 'date-fns';
import { useMemo } from 'react';
import MoneyText from '@/components/MoneyText';

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
			<div className="flex items-center gap-4 truncate">
				<div className="flex gap-2">
					<Text className="flex items-center gap-2">
						<CalendarIcon className="hidden size-4 shrink-0 md:block" />
						<span className="block md:hidden">{date.short}</span>
						<span className="hidden md:block">{date.long}</span>
					</Text>
					<Text className="hidden items-center gap-2 md:flex">
						<ClockIcon className="size-4 shrink-0" />
						<span className="w-8">{date.time}</span>
					</Text>
				</div>

				<div className="flex items-center gap-2 truncate">
					<Text className="truncate font-medium" v-if="transaction.description">
						{transaction.description}
					</Text>
				</div>
			</div>
			<div className="flex items-center gap-2">
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
