import AccountFormButton from '@/components/accounts/account-form/AccountFormButton';
import {
	ArrowDown01Icon,
	ChevronDownIcon,
	CogIcon,
	HandCoinsIcon,
	PlusIcon,
	VaultIcon,
} from 'lucide-react';
import { Strong, Text } from '@/components/base/text';
import TotalIcon from '@/components/icons/TotalIcon';
import MoneyText from '@/components/MoneyText';
import Button from '@/components/Button';
import { Skeleton } from '@/components/Skeleton';

export default async function AccountListSkeleton() {
	return (
		<div className="flex flex-col gap-5">
			<div className="flex justify-end gap-5">
				<Button size="p-2">
					<VaultIcon className="size-5" />
					<span className="hidden md:block">Add Account</span>
				</Button>
			</div>
			<ul className="space-y-2">
				{[...Array(100)].map((_, index) => (
					<AccountItemSkeleton key={index} />
				))}
			</ul>
		</div>
	);
}

function AccountItemSkeleton() {
	return (
		<div>
			<li className="rounded-lg border border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800">
				<div className="sticky top-0 z-10 flex flex-col gap-2 border-b border-gray-300 bg-gray-50 p-3 dark:border-gray-600 dark:bg-gray-800">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2 truncate">
							<Skeleton />

							<Strong className="min-w-0 flex-1 truncate">
								<Skeleton />
							</Strong>
						</div>

						<div className="flex shrink-0 items-center gap-2">
							<div className="flex items-center gap-2">
								<TotalIcon className="size-4" />
								<Skeleton />
							</div>

							<Button disabled>
								<ArrowDown01Icon className="size-4" />
							</Button>

							<Button disabled>
								<PlusIcon className="size-4 shrink-0" />
								<HandCoinsIcon className="size-4 shrink-0" />
							</Button>

							<Button disabled>
								<CogIcon className="size-4 shrink-0" />
							</Button>
						</div>
					</div>
				</div>

				<Button className="flex w-full justify-center p-2">
					<Text>
						<ChevronDownIcon className="rotate-180 transform" />
					</Text>
				</Button>
			</li>
		</div>
	);
}
