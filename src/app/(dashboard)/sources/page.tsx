import { getSources } from '@/lib/source/source.actions';
import SourceList from '@/components/source/SourceList';
import { Heading } from '@/components/base/heading';
import { SourceListProvider } from '@/lib/source/SourceListProvider';

export default async function SourcesPage() {
	const sources = await getSources();

	console.log(sources);

	return (
		<main className="flex flex-col gap-5">
			<Heading>Sources</Heading>

			<SourceListProvider initialItems={sources}>
				<SourceList />
			</SourceListProvider>
		</main>
	);
}
