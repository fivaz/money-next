export const formatMoney = (moneyInCents: number, showSign = false): string => {
	const amount = moneyInCents / 100;
	const sign = showSign && amount > 0 ? '+' : showSign && amount < 0 ? '-' : '';

	return `${sign}${Math.abs(amount).toFixed(2)}`;
};
