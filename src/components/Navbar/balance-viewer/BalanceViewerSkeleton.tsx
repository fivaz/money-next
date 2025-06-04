import { Subheading } from '@/components/base/heading';
import { Skeleton } from '@/components/Skeleton';

export default async function BalanceViewerSkeleton() {
	return (
		<div className="flex items-center gap-2">
			<Subheading>
				<Skeleton />
			</Subheading>
			<Subheading>
				<Skeleton />
			</Subheading>
		</div>
	);
}
