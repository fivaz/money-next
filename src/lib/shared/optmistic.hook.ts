'use client';

import { useOptimistic, useCallback, startTransition } from 'react';

type Action<I> =
	| { type: 'add'; item: I }
	| { type: 'delete'; id: number }
	| { type: 'edit'; item: I }
	| { type: 'replace'; newList: I[] };

export function useOptimisticList<I extends { id: number }>({
	initialItems,
	sortFn,
	mutate,
}: {
	initialItems: I[];
	sortFn?: (a: I, b: I) => number;
	mutate?: () => void;
}) {
	const [optimisticItems, applyOptimistic] = useOptimistic<I[], Action<I>>(
		initialItems,
		(state, action) => {
			let updated: I[];

			switch (action.type) {
				case 'add':
					updated = [action.item, ...state];
					break;
				case 'delete':
					updated = state.filter((item) => item.id !== action.id);
					break;
				case 'edit':
					updated = state.map((item) => (item.id === action.item.id ? action.item : item));
					break;
				case 'replace':
					updated = action.newList;
					break;
				default:
					updated = state;
			}

			return sortFn ? updated.toSorted(sortFn) : updated;
		},
	);

	const addItem = useCallback(
		(item: I) => {
			startTransition(() => {
				applyOptimistic({ type: 'add', item });
			});
		},
		[applyOptimistic],
	);

	const deleteItem = useCallback(
		(id: number) => {
			startTransition(() => {
				applyOptimistic({ type: 'delete', id });
			});
		},
		[applyOptimistic],
	);

	const editItem = useCallback(
		(item: I) => {
			startTransition(() => {
				applyOptimistic({ type: 'edit', item });
			});
		},
		[applyOptimistic],
	);

	const updateList = useCallback(
		(newList: I[]) => {
			startTransition(() => {
				applyOptimistic({ type: 'replace', newList });
			});
		},
		[applyOptimistic],
	);

	return {
		items: optimisticItems,
		addItem,
		deleteItem,
		editItem,
		updateList,
		mutate,
	};
}
