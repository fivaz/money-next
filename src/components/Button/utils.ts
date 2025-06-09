import { ButtonHTMLAttributes } from 'react';

export type ButtonColor = 'default' | 'primary' | 'secondary' | 'red';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	color?: ButtonColor;
	loading?: boolean;
	size?: string;
};
