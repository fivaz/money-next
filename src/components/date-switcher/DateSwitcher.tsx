import DateSwitcherClient from '@/components/date-switcher/DateSwitcherClient';
import { getActualBalance } from '@/app/actions/get-balance';
import { getExpectedBalance } from '@/lib/source/source.actions';

export default async function DateSwitcher() {
	const actualBalance = await getActualBalance();
	const expectedBalance = await getExpectedBalance();

	return <DateSwitcherClient actualBalance={actualBalance} expectedBalance={expectedBalance} />;
}
