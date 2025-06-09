'use client';
import { ReactNode, useState } from 'react';
import { PromptContext, PromptOptions } from './PromptContext';
import { Prompt } from '@/components/Prompt/Prompt';

type PromptState = PromptOptions & {
	isOpen: boolean;
	resolve?: (value: boolean | null) => void;
};

export default function PromptProvider({ children }: { children: ReactNode }) {
	const [prompt, setPrompt] = useState<PromptState>({
		isOpen: false,
		title: '',
		message: '',
		confirmText: 'Confirm',
		cancelText: 'Cancel',
	});

	const createPrompt = (options: PromptOptions): Promise<boolean | null> => {
		return new Promise((resolve) => {
			setPrompt({
				...options,
				isOpen: true,
				confirmText: options.confirmText || 'Confirm',
				cancelText: options.cancelText || 'Cancel',
				resolve,
			});
		});
	};

	const closePrompt = () => {
		setPrompt((prev) => ({ ...prev, isOpen: false }));
	};

	return (
		<PromptContext.Provider value={{ createPrompt, closePrompt }}>
			{children}
			<Prompt {...prompt} closePrompt={closePrompt} />
		</PromptContext.Provider>
	);
}
