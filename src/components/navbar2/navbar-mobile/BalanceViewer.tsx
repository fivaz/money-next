import { getActualBalance } from '@/app/actions/get-balance';
import { getExpectedBalance } from '@/lib/source/source.actions';
import { Subheading } from '@/components/base/heading';
import MoneyText from '@/components/MoneyText';
import clsx from 'clsx';

export default async function BalanceViewer() {
	const actualBalance = await getActualBalance();
	const expectedBalance = await getExpectedBalance();

	const balanceDifference = expectedBalance - actualBalance;

	return (
		<div className="flex items-center gap-2">
			<Subheading>
				<span className="hidden md:block">balance:</span>
				<MoneyText
					addColor={false}
					className={clsx(
						balanceDifference >= 0 ? 'text-gray-800 dark:text-white' : 'text-red-500',
					)}
				>
					{actualBalance}
				</MoneyText>
			</Subheading>
			<Subheading>
				{balanceDifference !== 0 && (
					<>
						(<span className="hidden md:block">difference:</span>
						<MoneyText>{balanceDifference}</MoneyText>)
					</>
				)}
			</Subheading>
		</div>
	);
}
