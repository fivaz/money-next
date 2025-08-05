import clsx from 'clsx';
import { LoaderCircle } from 'lucide-react';
import type { ButtonColor, ButtonProps } from './Button/utils';

const disabledClasses = 'opacity-50 cursor-not-allowed';

const baseClasses =
	'flex items-center gap-2 cursor-pointer rounded-md text-sm font-semibold shadow-xs transition-colors';

const colorClasses: Record<ButtonColor, string> = {
	default:
		'border border-gray-200 dark:border-gray-400 bg-white text-amber-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-white/10 dark:text-yellow-500 dark:ring-0 dark:hover:bg-white/20',
	primary:
		'border border-gray-200 dark:border-gray-400 bg-yellow-500 text-white hover:bg-yellow-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500',
	secondary:
		'border border-gray-200 dark:border-gray-400 bg-yellow-50 text-yellow-600 hover:bg-yellow-100',
	red: 'bg-red-500 text-white hover:bg-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500',
};

export default function Button({
	color = 'default',
	disabled,
	loading,
	size = 'px-2.5 py-1.5',
	className = '',
	type = 'button',
	children,
	...rest
}: ButtonProps) {
	return (
		<button
			type={type}
			disabled={disabled || loading}
			className={clsx(
				baseClasses,
				colorClasses[color],
				{ [disabledClasses]: disabled || loading },
				size,
				className,
			)}
			{...rest}
		>
			{loading && <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />}
			{children}
		</button>
	);
}
