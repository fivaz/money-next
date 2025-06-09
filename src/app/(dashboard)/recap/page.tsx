import { Heading } from '@/components/base/heading';
import { getTransactionsByDateDataset } from '@/lib/transaction/transaction.actions';
import MonthlySummaryChart from '@/components/transaction/MonthlySummaryChart/MonthlySummaryChart';
import { getBudgets } from '@/lib/budget/budget.actions';
import BudgetDistributionChart from '@/components/budget/BudgetChart/BudgetDistribution';

type RecapsPageProps = {};

export default async function RecapsPage({}: RecapsPageProps) {
	const monthlySummary = await getTransactionsByDateDataset();

	const budgets = await getBudgets();

	return (
		<main className="flex flex-col gap-5">
			<Heading>Recap</Heading>
			<MonthlySummaryChart monthlySummary={monthlySummary} />
			<BudgetDistributionChart budgets={budgets} />
		</main>
	);
}
