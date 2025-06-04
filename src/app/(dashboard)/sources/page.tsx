import { getSources } from '@/lib/source/source.actions';
import SourceList from '@/components/source/SourceList';
import { Heading } from '@/components/base/heading';
import { SourceListProvider } from '@/lib/source/SourceListProvider';
import { sortSources } from '@/lib/source/source.utils';

export default async function SourcesPage() {
	const sources = await getSources();

	return (
		<main className="flex flex-col gap-5">
			<Heading>Sources</Heading>

			<SourceListProvider initialItems={sources} sortFn={sortSources}>
				<SourceList />
			</SourceListProvider>
		</main>
	);
}
