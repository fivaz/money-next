import { useState, useEffect, useMemo, SetStateAction } from 'react';

export function useOptimisticList<I extends { id: number }>(
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

	function upsertById<I extends { id: number }>(items: I[], newItem: I): [I[], number] {
		// Generate ID if needed (simple timestamp fallback)
		const finalItem = {
			...newItem,
			id: newItem.id ?? -Date.now(),
		};

		const existingIndex = items.findIndex((item) => item.id === finalItem.id);
		const newItems = [...items]; // Clone array

		if (existingIndex !== -1) {
			newItems[existingIndex] = finalItem; // Replace in place
		} else {
			newItems.push(finalItem); // Add to end
		}

		return [newItems, finalItem.id];
	}

	const addOrUpdate = (newItem: I) => {
		const [updatedItems, newId] = upsertById(items, newItem);
		setItems(updatedItems);
		return newId;
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
		addOrUpdate,
		confirmSave,
		deleteOptimistic,
		setItems,
	};
}
