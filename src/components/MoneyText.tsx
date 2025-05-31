import { PropsWithChildren } from 'react';

type MoneyTextProps = PropsWithChildren;

export default function MoneyText({ children }: MoneyTextProps) {
	const moneyInCents = Number(children);
	const isNegative = moneyInCents < 0;
	const formattedMoney = (Math.abs(moneyInCents) / 100).toFixed(2);
	const sign = isNegative ? '-' : '+';
	const colorClass = isNegative ? 'text-red-500' : 'text-green-500';

	return (
		<span className={colorClass}>
			{sign} {formattedMoney} $
		</span>
	);
}
