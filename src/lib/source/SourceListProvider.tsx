'use client';

import { createOptimisticListProvider } from '@/lib/shared/optimistic-context';
import { Source } from '@/lib/source/source.model';
import { sortSources } from '@/lib/source/source.utils';

export const {
	OptimisticListProvider: SourceListProvider,
	useOptimisticListContext: useSourceList,
} = createOptimisticListProvider<Source>(sortSources);
