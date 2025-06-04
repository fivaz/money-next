'use client';

import { createOptimisticListProvider } from '@/lib/shared/optimistic-context';
import { Source } from '@/lib/source/source.model';

export const {
	OptimisticListProvider: SourceListProvider,
	useOptimisticListContext: useSourceList,
} = createOptimisticListProvider<Source>();
