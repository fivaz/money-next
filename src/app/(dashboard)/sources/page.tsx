import { getSources } from '@/lib/source/source.actions';
import SourceList from '@/components/source/SourceList';
import { Heading } from '@/components/base/heading';

export default async function SourcesPage() {
	const sources = await getSources();

	return (
		<main className="flex flex-col gap-5">
			<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<Heading>Sources</Heading>
			</div>
			<SourceList initialSources={sources} />
		</main>
	);
}
