import DateSwitcherClient from '@/components/date-switcher/DateSwitcherClient';
import { getBalance } from '@/app/actions/get-balance';

export default async function DateSwitcher() {
	const balance = await getBalance();

	return <DateSwitcherClient actualBalance={balance} />;
}
