export default function IncomeIcon({ className }: { className?: string }) {
	return (
		<svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<g
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
			>
				<path d="M9.5 3h5A1.5 1.5 0 0 1 16 4.5A3.5 3.5 0 0 1 12.5 8h-1A3.5 3.5 0 0 1 8 4.5A1.5 1.5 0 0 1 9.5 3"></path>
				<path d="M12.5 21H8a4 4 0 0 1-4-4v-1a8 8 0 0 1 14.935-3.991M16 19h6m-3-3v6"></path>
			</g>
		</svg>
	);
}
