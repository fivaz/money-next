import clsx from 'clsx';
import { Link } from './link';

export function Text({
	className,
	size = 'text-base/6 sm:text-sm/6',
	color = 'text-gray-700 dark:text-gray-300',
	...props
}: React.ComponentPropsWithoutRef<'p'> & { size?: string; color?: string }) {
	return <p data-slot="text" {...props} className={clsx(className, size, color)} />;
}

export function TextLink({ className, ...props }: React.ComponentPropsWithoutRef<typeof Link>) {
	return (
		<Link
			{...props}
			className={clsx(
				className,
				'text-zinc-950 underline decoration-zinc-950/50 data-hover:decoration-zinc-950 dark:text-white dark:decoration-white/50 dark:data-hover:decoration-white',
			)}
		/>
	);
}

export function Strong({ className, ...props }: React.ComponentPropsWithoutRef<'strong'>) {
	return (
		<strong {...props} className={clsx(className, 'font-medium text-zinc-950 dark:text-white')} />
	);
}

export function Code({ className, ...props }: React.ComponentPropsWithoutRef<'code'>) {
	return (
		<code
			{...props}
			className={clsx(
				className,
				'rounded-sm border border-zinc-950/10 bg-zinc-950/2.5 px-0.5 text-sm font-medium text-zinc-950 sm:text-[0.8125rem] dark:border-white/20 dark:bg-white/5 dark:text-white',
			)}
		/>
	);
}
