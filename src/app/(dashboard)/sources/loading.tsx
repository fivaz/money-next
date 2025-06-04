import { Heading } from '@/components/base/heading';
import { CogIcon, LandmarkIcon, LoaderIcon } from 'lucide-react';
import Button from '@/components/Button';
import { Skeleton } from '@/components/Skeleton';

export default function SourcesPage() {
	return (
		<main className="flex flex-col gap-5">
			<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<Heading>Sources</Heading>
			</div>
			<SourceListSkeleton />
		</main>
	);
}

function SourceListSkeleton() {
	return (
		<div className="flex flex-col gap-4">
			<div className="-mt-14 flex justify-end">
				<Button loading>
					<LandmarkIcon className="size-5" />
					Add Source
				</Button>
			</div>
			<ul className="mt-4 space-y-2">
				{[...Array(100)].map((_, index) => (
					<SourceItemSkeleton key={index} />
				))}
			</ul>
		</div>
	);
}

function SourceItemSkeleton() {
	return (
		<li className="rounded-lg border border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800">
			<div className="rounded-x-lg flex flex-col gap-2 rounded-t-lg border-gray-300 p-3 dark:border-gray-600">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Skeleton />

						<Skeleton className="min-w-0 flex-1 truncate" />
					</div>
					<div className="flex shrink-0 items-center gap-2">
						<Skeleton />
						<Button loading>
							<CogIcon className="size-4 shrink-0" />
						</Button>
					</div>
				</div>
			</div>
		</li>
	);
}
