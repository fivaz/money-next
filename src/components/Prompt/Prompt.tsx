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
	closePromptAction: () => void;
};

export function Prompt({
	isOpen,
	title,
	message,
	confirmText = 'Confirm',
	cancelText = 'Cancel',
	resolve,
	closePromptAction,
}: PromptProps) {
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (isOpen && e.key === 'Enter') {
				resolve?.(true);
				closePromptAction();
			}
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [isOpen, resolve, closePromptAction]);

	if (!isOpen) return null;

	return (
		<>
			<Dialog open={isOpen} onClose={() => resolve?.(false) || closePromptAction()}>
				<DialogTitle>{title}</DialogTitle>
				<DialogBody>
					<div className="flex items-center gap-4">
						<div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100">
							<TriangleAlertIcon className="size-6 text-red-600" />
						</div>
						<div>
							<h3 className="text-lg font-semibold">{}</h3>
							{message && <p className="text-sm text-gray-500">{message}</p>}
						</div>
					</div>
				</DialogBody>
				<DialogActions>
					<Button
						className="w-full justify-center sm:w-auto sm:justify-start"
						size="sm:px-2.5 sm:py-1.5 p-2.5"
						onClick={() => resolve?.(false) || closePromptAction()}
					>
						{cancelText}
					</Button>
					<Button
						className="w-full justify-center sm:w-auto sm:justify-start"
						size="sm:px-2.5 sm:py-1.5 p-2.5"
						color="red"
						onClick={() => resolve?.(true) || closePromptAction()}
					>
						{confirmText}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
