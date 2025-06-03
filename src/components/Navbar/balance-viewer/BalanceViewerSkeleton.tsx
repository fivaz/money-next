import DateSwitcher from '@/components/DateSwitcher';
import { getActualBalance } from '@/app/actions/get-balance';
import { getExpectedBalance } from '@/lib/source/source.actions';
import { Subheading } from '@/components/base/heading';
import { Skeleton } from '@/components/Skeleton';
import MoneyText from '@/components/MoneyText';
import clsx from 'clsx';

export default async function BalanceViewerSkeleton() {
	return (
		<div className="flex items-center gap-2">
			<Subheading>
				<Skeleton />
			</Subheading>
			<Subheading>
				<Skeleton />
			</Subheading>
		</div>
	);
}
