'use client';
import { useEffect } from 'react';

import Button from '@/components/Button';
import { Dialog, DialogActions, DialogBody, DialogTitle } from '@/components/base/dialog';
import { TriangleAlertIcon } from 'lucide-react';

type PromptProps = {
	isOpen: boolean;
	title: string;
	message?: string;
	confirmText?: string;
	cancelText?: string;
	resolve?: (value: boolean | null) => void;
	closePrompt: () => void;
};

export function Prompt({
	isOpen,
	title,
	message,
	confirmText = 'Confirm',
	cancelText = 'Cancel',
	resolve,
	closePrompt,
}: PromptProps) {
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (isOpen && e.key === 'Enter') {
				resolve?.(true);
				closePrompt();
			}
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [isOpen, resolve, closePrompt]);

	if (!isOpen) return null;

	return (
		<>
			<Dialog open={isOpen} onClose={() => resolve?.(false) || closePrompt()}>
				<DialogTitle>{title}</DialogTitle>
				<DialogBody>
					<div className="flex items-center gap-4">
						<div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
							<TriangleAlertIcon className="size-6 text-red-600" />
						</div>
						<div>
							<h3 className="text-lg font-semibold">{}</h3>
							{message && <p className="text-sm text-gray-500">{message}</p>}
						</div>
					</div>
				</DialogBody>
				<DialogActions>
					<Button onClick={() => resolve?.(false) || closePrompt()}>{cancelText}</Button>
					<Button color="red" onClick={() => resolve?.(true) || closePrompt()}>
						{confirmText}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
