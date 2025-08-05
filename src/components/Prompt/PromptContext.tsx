'use client';
import { createContext, useContext } from 'react';

export type PromptOptions = {
	title: string;
	message?: string;
	confirmText?: string;
	cancelText?: string;
};

type PromptContextType = {
	createPrompt: (options: PromptOptions) => Promise<boolean | null>;
	closePrompt: () => void;
};

export const PromptContext = createContext<PromptContextType | undefined>(undefined);

export const usePrompt = () => {
	const context = useContext(PromptContext);
	if (!context) {
		throw new Error('usePrompt must be used within a PromptProvider');
	}
	return context;
};
