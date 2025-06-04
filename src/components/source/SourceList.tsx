'use client';
import SourceItem from '@/components/source/SourceItem';
import SourceFormButton from '@/components/source/source-form/SourceFormButton';
import { type Source } from '@/lib/source/source.model';
import { DragDropProvider } from '@dnd-kit/react';
import { move } from '@dnd-kit/helpers';
import { reorderSources } from '@/lib/source/source.actions';
import { useOptimisticList } from '@/lib/shared/optmistic.hook';
import { sortSources } from '@/lib/source/source.utils';
import { SourceListProvider, useSourceList } from '@/lib/source/SourceListProvider';

type SourceProps = {};
export default function SourceList({}: SourceProps) {
	const { items: sources, updateList } = useSourceList();

	const handleDragEnd = (event: Parameters<typeof move>[1]) => {
		const newSources = move(sources, event);
		updateList(newSources);
		void reorderSources(newSources);
	};

	return (
		<div className="flex flex-col gap-4">
			<div className="-mt-14 flex justify-end">
				<SourceFormButton />
			</div>
			<ul className="mt-4 space-y-2">
				<DragDropProvider onDragEnd={handleDragEnd}>
					{sources.map((source, index) => (
						<SourceItem index={index} key={source.id} source={source} />
					))}
				</DragDropProvider>
			</ul>
		</div>
	);
}
