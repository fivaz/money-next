'use client';

import MoneyText from '@/components/MoneyText';
import clsx from 'clsx';
import { Text } from '@/components/base/text';
import { useActualBalance, useActualUnpaidBalance } from '@/lib/balance/balance.utils';
import Tooltip from '@/components/Tooltip';
import { formatMoney } from '@/lib/shared/utils';
import { useYearMonth } from '@/lib/shared/date.utils';

export default function ClientBalanceViewer({ expectedBalance }: { expectedBalance: number }) {
	const [, , asOf] = useYearMonth();
	const actualBalance = useActualBalance(asOf);
	const actualUnpaidBalance = useActualUnpaidBalance();

	const balanceDifference = expectedBalance - actualBalance;

	return (
		<div className="flex shrink-0 items-center gap-2 text-sm">
			<div className="flex items-center gap-2">
				<Text className="hidden md:block">balance:</Text>
				<Tooltip message={`future balance: ${formatMoney(actualBalance + actualUnpaidBalance)}`}>
					<MoneyText
						addColor={false}
						className={clsx('font-semibold text-gray-800 dark:text-white')}
					>
						{actualBalance}
					</MoneyText>
				</Tooltip>
			</div>
			<Text className="flex items-center">
				{balanceDifference !== 0 && (
					<>
						(<span className="mr-2 hidden md:block">difference:</span>
						<MoneyText>{balanceDifference}</MoneyText>)
					</>
				)}
			</Text>
		</div>
	);
}
