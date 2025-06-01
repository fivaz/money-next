import { getSources } from '@/lib/source/source.actions';
import SourceList from '@/components/source/SourceList';

export default async function SourcesPage() {
	const sources = await getSources();

	return <SourceList initialSources={sources} />;
}
