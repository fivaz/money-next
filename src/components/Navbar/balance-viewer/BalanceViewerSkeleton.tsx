import { Subheading } from '@/components/base/heading';
import { Skeleton } from '@/components/Skeleton';

export default async function BalanceViewerSkeleton() {
	return (
		<div className="flex items-center gap-2">
			<Subheading>
				<Skeleton className="w-14 sm:w-32" />
			</Subheading>
			<div className="flex items-center">
				(<Skeleton className="w-14 sm:w-32" />)
			</div>
		</div>
	);
}
