'use client';

import clsx from 'clsx';
import { ReactNode } from 'react';

type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

interface TextProps {
	size?: TextSize;
	className?: string;
	children: ReactNode;
}

const getSizeClass = (size: TextSize | undefined): string => {
	const sizeClasses: Record<TextSize, string> = {
		xs: 'text-xs',
		sm: 'text-sm',
		base: 'text-base',
		lg: 'text-lg',
		xl: 'text-xl',
		'2xl': 'text-2xl',
		'3xl': 'text-3xl',
		'4xl': 'text-4xl',
	};
	return sizeClasses[size || 'base'] || 'text-base';
};

export default function MText({ size, className, children }: TextProps) {
	return (
		<span className={clsx(getSizeClass(size), 'text-gray-700 dark:text-gray-300', className)}>
			{children}
		</span>
	);
}
