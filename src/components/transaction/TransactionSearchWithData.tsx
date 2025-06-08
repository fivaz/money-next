import { searchTransactions } from '@/lib/transaction/transaction.actions';
import { TransactionListProvider } from '@/lib/transaction/TransactionListProvider';
import TransactionSearch from '@/components/transaction/TransactionSearch';
import Pagination from '@/components/transaction/Pagination';

type TransactionProps = {
	query: string;
	page: number;
};

export default async function TransactionSearchWithData({ query, page }: TransactionProps) {
	const { content: transactions, totalPages, pageable } = await searchTransactions(query, page);
	return (
		<>
			<TransactionListProvider initialItems={transactions}>
				<TransactionSearch />
			</TransactionListProvider>
			<Pagination totalPages={totalPages} currentPage={pageable.pageNumber} />
		</>
	);
}
