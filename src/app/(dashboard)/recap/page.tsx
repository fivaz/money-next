import { Heading } from '@/components/base/heading';
import { getTransactionsByDateDataset } from '@/lib/transaction/transaction.actions';
import MonthlySummaryChart from '@/components/transaction/MonthlySummaryChart/MonthlySummaryChart';

type RecapsPageProps = {};

export default async function RecapsPage({}: RecapsPageProps) {
	const monthlySummary = await getTransactionsByDateDataset();

	return (
		<main className="flex flex-col gap-5">
			<Heading>Recap</Heading>
			<MonthlySummaryChart monthlySummary={monthlySummary} />
		</main>
	);
}
