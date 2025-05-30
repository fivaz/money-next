import Logo from '@/components/Logo';
import Button from '@/components/Button';
import GoogleAuthButton from '@/app/login/GoogleAuthButton';

export default function LoginPage() {
	const handleLogin = () => console.log('handleLogin');
	const handleGoogleLogin = () => console.log('handleGoogleLogin');

	const email = '';
	const password = '';

	const error = '';

	return (
		<div className="flex min-h-screen flex-1 flex-col justify-center bg-gray-100 px-6 py-12 lg:px-8 dark:bg-gray-900">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<Logo className="mx-auto size-10 w-auto" />
				<h2 className="text-brown-500 mt-10 text-center text-2xl/9 font-bold tracking-tight dark:text-white">
					Sign in to your account
				</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<form className="space-y-6">
					<div>
						<label
							htmlFor="email"
							className="block text-sm/6 font-medium text-gray-900 dark:text-white"
						>
							Email address
						</label>
						<div className="mt-2">
							<input
								v-model="email"
								type="email"
								name="email"
								id="email"
								autoComplete="email"
								required
								className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-500 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10"
							/>
						</div>
					</div>

					<div>
						<div className="flex items-center justify-between">
							<label
								htmlFor="password"
								className="block text-sm/6 font-medium text-gray-900 dark:text-white"
							>
								Password
							</label>
							<div className="text-sm">
								<a
									href="#"
									className="font-semibold text-yellow-600 hover:text-yellow-500 dark:text-yellow-400 dark:hover:text-yellow-300"
								>
									Forgot password?
								</a>
							</div>
						</div>
						<div className="mt-2">
							<input
								v-model="password"
								type="password"
								name="password"
								id="password"
								autoComplete="current-password"
								required
								className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-500 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10"
							/>
						</div>
					</div>

					<div>
						<Button
							padding="px-3 py-2"
							type="submit"
							color="primary"
							className="flex w-full justify-center"
							disabled={!email || !password}
						>
							Sign in
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

					<GoogleAuthButton />
				</form>

				<p className="mt-10 text-center text-sm/6 text-gray-500 dark:text-gray-400">
					Not a member?
					<a
						href="/register"
						className="font-semibold text-yellow-600 hover:text-yellow-500 dark:text-yellow-400 dark:hover:text-yellow-300"
					>
						Register
					</a>
				</p>

				<p v-if="error" className="mt-4 text-center text-sm/6 text-red-500 dark:text-red-400">
					{error}
				</p>
			</div>
		</div>
	);
}
