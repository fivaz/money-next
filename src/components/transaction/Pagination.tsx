'use client';

import {
	PaginationList,
	PaginationNext,
	PaginationPage,
	PaginationPrevious,
	BasePagination,
} from '@/components/base/basePagination';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Pagination({
	totalPages,
	currentPage,
}: {
	totalPages: number;
	currentPage: number;
}) {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const createPageURL = (pageNumber: number | string) => {
		const params = new URLSearchParams(searchParams);
		params.set('page', pageNumber.toString());
		return `${pathname}?${params.toString()}`;
	};

	return (
		<BasePagination>
			<PaginationPrevious href={currentPage > 1 ? createPageURL(currentPage - 1) : undefined} />
			<PaginationList>
				{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
					<PaginationPage key={page} href={createPageURL(page)} current={currentPage === page}>
						{page}
					</PaginationPage>
				))}
			</PaginationList>
			<PaginationNext
				href={currentPage < totalPages ? createPageURL(currentPage + 1) : undefined}
			/>
		</BasePagination>
	);
}
