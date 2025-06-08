import { searchTransactions } from '@/lib/transaction/transaction.actions';
import { TransactionListProvider } from '@/lib/transaction/TransactionListProvider';
import TransactionSearch from '@/components/transaction/TransactionSearch';
import {
	Pagination,
	PaginationGap,
	PaginationList,
	PaginationNext,
	PaginationPage,
	PaginationPrevious,
} from '@/components/base/pagination';

type TransactionProps = {
	query: string;
	page: number;
};

export default async function TransactionSearchWithData({ query, page }: TransactionProps) {
	const result = await searchTransactions(query, page);
	console.log(result);
	const { content: transactions, totalPages, pageable } = result;

	const getHref = (page: number) => `/?query=${query}&page=${page}`;

	return (
		<>
			<TransactionListProvider initialItems={transactions}>
				<TransactionSearch />
			</TransactionListProvider>
			<Pagination>
				<PaginationPrevious
					href={pageable.pageNumber > 1 ? getHref(pageable.pageNumber - 1) : undefined}
				/>
				<PaginationList>
					{Array.from({ length: totalPages - 1 }, (_, i) => i + 1).map((page) => (
						<PaginationPage key={page} href={getHref(page)} current={pageable.pageNumber === page}>
							{page}
						</PaginationPage>
					))}
				</PaginationList>
				<PaginationNext
					href={pageable.pageNumber < totalPages - 1 ? getHref(pageable.pageNumber + 1) : undefined}
				/>
			</Pagination>
		</>
	);
}
