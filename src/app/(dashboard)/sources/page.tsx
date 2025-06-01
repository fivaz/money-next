import DateSwitcher from '@/components/date-switcher/DateSwitcher';
import { Suspense } from 'react';
import DateSwitcherClient from '@/components/date-switcher/DateSwitcherClient';
import { getSources } from '@/lib/source/source.actions';
import SourceList from '@/components/source/SourceList';

export default async function SourcesPage() {
	const sources = await getSources();

	return (
		<main>
			<Suspense fallback={<DateSwitcherClient actualBalance={0} isLoading />}>
				<DateSwitcher />
			</Suspense>
			<SourceList initialSources={sources} />
		</main>
	);
}
