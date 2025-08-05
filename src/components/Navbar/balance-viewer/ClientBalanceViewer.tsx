'use client';

import MoneyText from '@/components/MoneyText';
import clsx from 'clsx';
import { Text } from '@/components/base/text';
import { fetchActualBalance } from '@/lib/source/source.utils-api';

export default function ClientBalanceViewer({ expectedBalance }: { expectedBalance: number }) {
	const actualBalance = fetchActualBalance();

	const balanceDifference = expectedBalance - actualBalance;

	return (
		<div className="flex shrink-0 items-center gap-2 text-sm">
			<div className="flex items-center gap-2">
				<Text className="hidden md:block">balance:</Text>
				<MoneyText addColor={false} className={clsx('font-semibold text-gray-800 dark:text-white')}>
					{actualBalance}
				</MoneyText>
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
