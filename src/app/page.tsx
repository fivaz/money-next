import { getBalance } from './actions/get-balance';
import { cookies } from 'next/headers';

export default async function HomePage() {
	let balance: number;

	// try {
	// 	balance = await getBalance();
	// } catch (error) {
	// 	console.error('Failed to fetch balance:', error);
	// 	balance = NaN; // or you can show a fallback
	// }

	return (
		<main>
			<h1 className="text-2xl font-bold">Welcome to Money Tracker</h1>
			<p className="mt-4 text-lg">
				Your current balance is:
				<span className="ml-2 font-mono text-blue-600">
					{isNaN(balance) ? 'Not available' : `$${balance.toFixed(2)}`}
				</span>
			</p>
		</main>
	);
}
