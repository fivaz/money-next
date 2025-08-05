import { Heading } from '@/components/base/heading';
import AccountListWithData from '@/components/accounts/AccountListWithData';

export default async function AccountPage() {
	return (
		<main className="flex flex-col gap-5">
			<div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
				<Heading>Transactions</Heading>
			</div>
			<AccountListWithData />
		</main>
	);
}
