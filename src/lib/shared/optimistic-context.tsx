'use client';

import { createContext, useContext, ReactNode, useMemo } from 'react';
import { useOptimisticList } from './optmistic.hook'; // assuming you saved the hook in its own file

type OptimisticListContextType<T extends { id: number }> =
	| ReturnType<typeof useOptimisticList<T>>
	| undefined;

const OptimisticListContext = createContext<OptimisticListContextType<any>>(undefined);

type OptimisticListProviderProps<T extends { id: number }> = {
	initialItems: T[];
	mutate?: () => void;
	children: ReactNode;
};

export function createOptimisticListProvider<T extends { id: number }>(
	sortFn?: (a: T, b: T) => number,
) {
	const Provider = ({ initialItems, mutate, children }: OptimisticListProviderProps<T>) => {
		const value = useOptimisticList<T>({ initialItems, sortFn, mutate });

		// Prevent unnecessary re-renders
		const memoizedValue = useMemo(() => value, [value]);

		return (
			<OptimisticListContext.Provider value={memoizedValue}>
				{children}
			</OptimisticListContext.Provider>
		);
	};

	const useOptimisticListContext = (): ReturnType<typeof useOptimisticList<T>> => {
		const context = useContext(OptimisticListContext);
		if (!context) {
			throw new Error('useOptimisticListContext must be used within a OptimisticListProvider');
		}
		return context;
	};

	return {
		OptimisticListProvider: Provider,
		useOptimisticListContext,
	};
}
