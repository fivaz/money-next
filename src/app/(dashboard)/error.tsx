'use client';

import Link from 'next/link';
import { useEffect } from 'react';

interface ErrorProps {
	error: Error & { digest?: string };
	reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
	useEffect(() => {
		// Log error for debugging (optional)
		console.error('Error:', error);
	}, [error]);

	return (
		<div className="flex items-center justify-center bg-gray-100 sm:mt-[100px] dark:bg-gray-900">
			<div className="mx-auto max-w-md p-8 text-center">
				<h1 className="mb-4 text-6xl font-bold text-red-600 dark:text-red-500">Oops!</h1>
				<h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-100">
					Something Went Wrong
				</h2>
				<p className="mb-6 text-gray-600 dark:text-gray-300">
					An unexpected error occurred. Please try again or return to the homepage.
				</p>
				<div className="flex justify-center gap-4">
					<button
						onClick={() => reset()}
						className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
					>
						Try Again
					</button>
					<Link
						href="/"
						className="rounded-lg bg-gray-600 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600"
					>
						Go Back Home
					</Link>
				</div>
			</div>
		</div>
	);
}
