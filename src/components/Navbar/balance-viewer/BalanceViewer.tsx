import { getExpectedBalance } from '@/lib/source/source.actions';
import ClientBalanceViewer from '@/components/Navbar/balance-viewer/ClientBalanceViewer';

export default async function BalanceViewer() {
	const expectedBalance = await getExpectedBalance();

	return <ClientBalanceViewer expectedBalance={expectedBalance} />;
}
