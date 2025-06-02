import { useState, useEffect, useMemo, SetStateAction } from 'react';

export function useOptimisticList<I extends { id: number | string }>(
	initialItems: I[],
	sortFunc: (items: I[]) => I[],
) {
	const [items, setItemsState] = useState<I[]>(initialItems);
	const [hasOptimisticUpdates, setHasOptimisticUpdates] = useState(false);

	useEffect(() => {
		if (!hasOptimisticUpdates) {
			setItemsState(initialItems);
		}
	}, [initialItems, hasOptimisticUpdates]);

	const setItems = (updater: SetStateAction<I[]>) => {
		setHasOptimisticUpdates(true);
		setItemsState(updater);
	};

	const addOrUpdateOptimistic = (newItem: I) => {
		setItems((prev) => {
			const filtered = prev.filter((b) => b.id !== newItem.id);
			return [...filtered, newItem]; // no sorting here
		});
	};

	const confirmSave = (tempId: I['id'], savedItem: I) => {
		setItems((prev) => {
			const filtered = prev.filter((b) => b.id !== tempId);
			return [...filtered, savedItem]; // no sorting here
		});
	};

	const deleteOptimistic = (itemToDelete: I) => {
		setItems((prev) => prev.filter((b) => b.id !== itemToDelete.id));
	};

	// Only sort when exposing the items
	const sortedItems = useMemo(() => sortFunc(items), [items, sortFunc]);

	return {
		items: sortedItems,
		addOrUpdateOptimistic,
		confirmSave,
		deleteOptimistic,
		setItems,
	};
}
