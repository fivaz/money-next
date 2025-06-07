'use client';
import { PropsWithChildren, useRef, useState } from 'react';
import {
	useFloating,
	autoUpdate,
	offset,
	flip,
	shift,
	useFocus,
	useDismiss,
	useRole,
	useInteractions,
	FloatingPortal,
	useClick,
} from '@floating-ui/react';
import clsx from 'clsx';
import { FloatingArrow, arrow } from '@floating-ui/react';

type ToolTipProps = PropsWithChildren<{
	message: string;
}>;

export default function Tooltip({ children, message }: ToolTipProps) {
	const [isOpen, setIsOpen] = useState(false);

	const arrowRef = useRef(null);

	const { refs, floatingStyles, context } = useFloating({
		open: isOpen,
		onOpenChange: setIsOpen,
		placement: 'top',
		// Make sure the tooltip stays on the screen
		whileElementsMounted: autoUpdate,
		middleware: [
			offset(5),
			flip({
				fallbackAxisSideDirection: 'start',
			}),
			shift(),
			arrow({
				element: arrowRef,
			}),
		],
	});

	const tailwindColor = {
		green: {
			floating: 'text-green-500 bg-green-50 dark:bg-green-600 dark:text-green-50',
			arrow: 'fill-green-50 dark:fill-green-600',
		},
		red: {
			floating: 'text-red-500 bg-red-50 dark:bg-red-600 dark:text-red-50',
			arrow: 'fill-red-50 dark:fill-red-600',
		},
		indigo: {
			floating: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-600 dark:text-indigo-50',
			arrow: 'fill-indigo-50 dark:fill-indigo-600',
		},
		yellow: {
			floating: 'text-yellow-500 bg-yellow-50 dark:bg-yellow-600 dark:text-yellow-50',
			arrow: 'fill-yellow-50 dark:fill-yellow-600',
		},
	} as const;

	// Event listeners to change the open state
	const hover = useClick(context);
	const focus = useFocus(context);
	const dismiss = useDismiss(context);
	// Role props for screen readers
	const role = useRole(context, { role: 'tooltip' });

	// Merge all the interactions into prop getters
	const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss, role]);

	return (
		<>
			<button type="button" ref={refs.setReference} {...getReferenceProps()}>
				{children}
			</button>
			<FloatingPortal>
				{isOpen && (
					<div
						className={clsx(
							'z-30 box-border w-max max-w-[calc(100vw-10px)] rounded bg-gray-800 p-1 px-2 text-sm text-white',
							tailwindColor['yellow'].floating,
						)}
						ref={refs.setFloating}
						style={floatingStyles}
						{...getFloatingProps()}
					>
						<FloatingArrow
							ref={arrowRef}
							context={context}
							className={tailwindColor['yellow'].arrow}
						/>
						{message}
					</div>
				)}
			</FloatingPortal>
		</>
	);
}
