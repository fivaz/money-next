import { Text } from '@/components/base/text';
import { Transaction } from '@/lib/transaction/transaction.model';
import { CogIcon, CombineIcon } from 'lucide-react';
import TransactionForm from '@/components/transaction/transaction-form/TransactionForm';

type TransactionItemProps = {
	transaction: Transaction;
};

export default function TransactionItem({ transaction }: TransactionItemProps) {
	return (
		<li className="flex items-center justify-between bg-white px-3 py-2 dark:bg-gray-700">
			<div className="flex items-center gap-4 truncate">
				<Text>{transaction.date}</Text>
				<div className="flex items-center gap-2 truncate">
					<Text className="truncate font-medium" v-if="transaction.description">
						{transaction.description}
					</Text>
				</div>
			</div>
			<div className="flex items-center gap-2">
				<Text>{transaction.amount}</Text>

				{/*<TransactionForm transaction={transaction}>*/}
				{/*	<CogIcon className="size-4 shrink-0" />*/}
				{/*</TransactionForm>*/}
			</div>
		</li>
	);
}
