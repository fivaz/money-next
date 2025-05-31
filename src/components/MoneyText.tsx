import { PropsWithChildren } from 'react';
import clsx from 'clsx';

type MoneyTextProps = PropsWithChildren<{ className?: string }>;

export default function MoneyText({ children, className }: MoneyTextProps) {
	const moneyInCents = Number(children);
	const isNegative = moneyInCents < 0;
	const formattedMoney = (Math.abs(moneyInCents) / 100).toFixed(2);
	const sign = isNegative ? '-' : '+';
	const colorClass = isNegative ? 'text-red-500' : 'text-green-500';

	return (
		<span className={clsx(colorClass, className)}>
			{sign} {formattedMoney} $
		</span>
	);
}
