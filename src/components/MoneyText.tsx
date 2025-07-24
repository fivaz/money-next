import { PropsWithChildren } from 'react';
import clsx from 'clsx';
import { formatMoney } from '@/lib/shared/utils';

type MoneyTextProps = PropsWithChildren<{
	className?: string;
	addColor?: boolean;
	addSign?: boolean;
}>;

export default function MoneyText({
	children,
	className,
	addColor = true,
	addSign = true,
}: MoneyTextProps) {
	const moneyInCents = Number(children);
	const isNegative = moneyInCents < 0;
	const sign = isNegative ? '-' : '+';
	const colorClass = isNegative ? 'text-red-500' : 'text-green-500';

	return (
		<span className={clsx({ [colorClass]: addColor && moneyInCents !== 0 }, className)}>
			<>
				${addSign && moneyInCents !== 0 && ` ${sign}`}
				{formatMoney(moneyInCents)}
			</>
		</span>
	);
}
