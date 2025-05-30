import { getBalance } from '../actions/get-balance';
import { getCurrentMonthTransactions } from '../actions/transaction';
import { cookies } from 'next/headers';
import TransactionForm from '@/components/transaction/transaction-form/TransactionForm';
import MText from '@/components/MText';

export default async function HomePage() {
	let balance: number;

	const transactions = await getCurrentMonthTransactions();

	try {
		balance = await getBalance();
	} catch (error) {
		console.error('Failed to fetch balance:', error);
		balance = NaN; // or you can show a fallback
	}

	return (
		<main>
			<MText size="2xl" className="font-bold">
				Money
			</MText>
			<p className="mt-4 text-lg">
				Your current balance is:
				<span className="ml-2 font-mono text-blue-600">
					{isNaN(balance) ? 'Not available' : `$${balance.toFixed(2)}`}
				</span>
			</p>
			<ul>
				{transactions.map((tx: any) => (
					<li key={tx.id}>
						<strong>{tx.date}</strong>: {tx.description} — ${tx.amount}
					</li>
				))}
			</ul>
			<TransactionForm />
		</main>
	);
}
