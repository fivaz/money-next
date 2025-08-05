import { getAccounts } from '@/lib/account/account.actions';
import AccountList from '@/components/accounts/AccountList';
import { AccountListProvider } from '@/lib/account/AccountListProvider';

export default async function AccountListWithData() {
	const accounts = await getAccounts();

	return (
		<AccountListProvider initialAccounts={accounts}>
			<AccountList />
		</AccountListProvider>
	);
}
