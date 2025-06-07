import { SVGProps, ReactNode } from 'react';
import clsx from 'clsx';

interface TotalIconProps extends SVGProps<SVGSVGElement> {
	children?: ReactNode;
}

export default function TotalIcon({ children, className, ...props }: TotalIconProps) {
	if (children) {
		return (
			<div className="relative">
				<InnerTotalIcon
					{...props}
					style={{ transform: 'translate(40%, 40%)' }}
					className={clsx('absolute right-0 bottom-0 z-10 size-3', className)}
				/>
				{children}
			</div>
		);
	}

	return <InnerTotalIcon />;
}

function InnerTotalIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
			<path
				fill="currentColor"
				d="M1792 384h-128V256H475l768 768l-768 768h1189v-128h128v256H256v-91l805-805l-805-805v-91h1536z"
			/>
		</svg>
	);
}
