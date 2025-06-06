import { SVGProps } from 'react';

export default function PieChartIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16">
			<path
				fill="currentColor"
				d="M8 1.5a.5.5 0 0 1 .5-.5A6.5 6.5 0 0 1 15 7.5a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1-.5-.5zM7 3.522a.5.5 0 0 0-.545-.498a6 6 0 1 0 6.52 6.52a.5.5 0 0 0-.497-.544H7z"
			></path>
		</svg>
	);
}
