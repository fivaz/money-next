import { SVGProps } from 'react';

export default function TotalIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
			<path
				fill="currentColor"
				d="M1792 384h-128V256H475l768 768l-768 768h1189v-128h128v256H256v-91l805-805l-805-805v-91h1536z"
			></path>
		</svg>
	);
}
