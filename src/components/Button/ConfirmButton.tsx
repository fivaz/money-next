import Button from '@/components/Button';
import { ButtonProps } from './utils';
import { usePrompt } from '../Prompt/PromptContext';
import { type MouseEvent } from 'react';

type ConfirmButtonProps = ButtonProps & {
	title?: string;
	message?: string;
};

export default function ConfirmButton({
	children,
	title = 'Are you sure?',
	message,
	onClick,
	...props
}: ConfirmButtonProps) {
	const { createPrompt } = usePrompt();

	const handleOnClick = async (event: MouseEvent<HTMLButtonElement>) => {
		const confirmed = await createPrompt({
			title,
			message,
		});

		if (confirmed) {
			onClick?.(event);
		}
	};

	return (
		<Button {...props} onClick={handleOnClick}>
			{children}
		</Button>
	);
}
