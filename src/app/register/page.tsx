'use client';

import Logo from '@/components/Logo';
import Button from '@/components/Button';
import { ROUTES } from '@/lib/const';
import { Input } from '@/components/base/input';
import { Field, Label } from '@/components/base/fieldset';
import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
} from 'firebase/auth';
import { FormEvent, useState } from 'react';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { Link } from '@/components/base/link';
import GoogleAuthButton from '@/app/login/GoogleAuthButton';
import { parseError } from '@/lib/user/auth.utils.client';
import { TriangleAlertIcon } from 'lucide-react';

export default function LoginPage() {
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsLoading(true);
		setError('');
		const formData = new FormData(event.currentTarget);

		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const confirmPassword = formData.get('confirm-password') as string;

		if (password !== confirmPassword) {
			setError('Passwords do not match');
			setIsLoading(false);
			return;
		}

		try {
			const credential = await createUserWithEmailAndPassword(auth, email, password);
			const idToken = await credential.user.getIdToken();

			await fetch('/api/login', {
				headers: {
					Authorization: `Bearer ${idToken}`,
				},
			});

			router.push(ROUTES.ROOT.path);
		} catch (error) {
			setError(parseError(error));
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex min-h-screen flex-1 flex-col justify-center gap-5 bg-gray-100 px-6 py-12 lg:px-8 dark:bg-gray-900">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<Logo className="mx-auto size-10 w-auto" />
				<h2 className="text-brown-500 mt-10 text-center text-2xl/9 font-bold tracking-tight dark:text-white">
					Create your account
				</h2>
			</div>

			{error && (
				<div className="flex items-center gap-3 rounded-md bg-red-50 p-4">
					<div className="shrink-0">
						<TriangleAlertIcon aria-hidden="true" className="size-5 text-red-400" />
					</div>
					<p className="text-center text-sm/6 text-red-500 dark:text-red-400">{error}</p>
				</div>
			)}

			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<form className="space-y-6" onSubmit={handleSubmit}>
					<Field>
						<Label htmlFor="email">Email address</Label>
						<Input type="email" name="email" id="email" required />
					</Field>

					<Field>
						<Label htmlFor="password">Password</Label>
						<Input type="password" name="password" id="password" required />
					</Field>

					<Field>
						<Label htmlFor="confirm-password">Confirm password</Label>
						<Input type="password" name="confirm-password" id="confirm-password" required />
					</Field>

					<div>
						<Button
							size="px-3 py-2"
							type="submit"
							color="primary"
							className="flex w-full justify-center"
							loading={isLoading}
						>
							Register
						</Button>
					</div>

					<div className="relative">
						<div className="absolute inset-0 flex items-center" aria-hidden="true">
							<div className="w-full border-t border-gray-200 dark:border-gray-700" />
						</div>
						<div className="relative flex justify-center text-sm/6 font-medium">
							<span className="bg-gray-100 px-6 text-gray-900 dark:bg-gray-900 dark:text-white">
								Or continue with
							</span>
						</div>
					</div>

					<GoogleAuthButton setErrorAction={setError} />
				</form>

				<p className="mt-10 text-center text-sm/6 text-gray-500 dark:text-gray-400">
					Already have an account?{' '}
					<Link
						href={ROUTES.LOGIN.path}
						className="font-semibold text-yellow-600 hover:text-yellow-500 dark:text-yellow-400 dark:hover:text-yellow-300"
					>
						Sign in
					</Link>
				</p>
			</div>
		</div>
	);
}
