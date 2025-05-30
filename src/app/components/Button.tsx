import { LoaderCircle } from 'lucide-react';
import { FC, ButtonHTMLAttributes } from 'react';

type ButtonColor = 'default' | 'primary' | 'secondary' | 'error';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	color?: ButtonColor;
	loading?: boolean;
	padding?: string;
}

const getButtonClasses = (
	color: ButtonColor | undefined,
	disabled: boolean | undefined,
	loading: boolean | undefined,
	padding: string | undefined,
): string => {
	const paddingClasses = padding || 'px-2.5 py-1.5';
	const baseClasses = 'cursor-pointer rounded-md text-sm font-semibold shadow-xs transition-colors';
	const disabledClasses = 'opacity-50 cursor-not-allowed';

	const colorClasses: Record<ButtonColor, string> = {
		default:
			'border border-gray-200 dark:border-gray-400 bg-white text-amber-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-white/10 dark:text-yellow-500 dark:ring-0 dark:hover:bg-white/20',
		primary:
			'border border-gray-200 dark:border-gray-400 bg-yellow-500 text-white hover:bg-yellow-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500',
		secondary:
			'border border-gray-200 dark:border-gray-400 bg-yellow-50 text-yellow-600 hover:bg-yellow-100',
		error:
			'bg-red-500 text-white hover:bg-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500',
	};

	const isDisabled = disabled || loading;
	const variantClass = colorClasses[color || 'default'] || colorClasses.default;

	return `${baseClasses} ${variantClass} ${isDisabled ? disabledClasses : ''} ${paddingClasses}`;
};

export default function Button({
	color,
	disabled,
	loading,
	padding,
	className = '',
	type = 'button',
	children,
	...rest
}: ButtonProps) {
	return (
		<button
			type={type}
			disabled={disabled || loading}
			className={`${getButtonClasses(color, disabled, loading, padding)} ${className}`}
			{...rest}
		>
			<span className="flex items-center gap-2">
				{loading && <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />}
				{children}
			</span>
		</button>
	);
}
