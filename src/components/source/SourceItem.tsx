'use client';
import { Strong, Text } from '@/components/base/text';
import { type Source } from '@/lib/source/source.model';
import { ChevronDownIcon, CogIcon } from 'lucide-react';
import { type SourceFormProps } from '@/components/source/source-form/SourceForm';
import SourceFormButton from '@/components/source/source-form/SourceFormButton';
import MoneyText from '@/components/MoneyText';
import IconView from '@/components/icon-picker/IconView';
import { API } from '@/lib/const';
import { Disclosure, DisclosureButton } from '@headlessui/react';
import clsx from 'clsx';
import { useSortable } from '@dnd-kit/react/sortable';
import { useSearchParams } from 'next/navigation';
import { PropsWithChildren } from 'react';

type SourceItemProps = {
	source: Source;
	index: number;
} & Pick<SourceFormProps, 'onConfirmSaveAction' | 'onAddOptimisticAction' | 'onDeleteAction'>;

export default function SourceItem({
	source,
	onAddOptimisticAction,
	onConfirmSaveAction,
	onDeleteAction,
	index,
}: SourceItemProps) {
	const searchParams = useSearchParams();

	const currentYear = Number(searchParams.get('year')) || new Date().getFullYear();
	const currentMonth = Number(searchParams.get('month')) || new Date().getMonth() + 1;

	const { ref } = useSortable({ id: source.id, index });

	const url = `/api/${API.SOURCES}/${source.id}/${API.TRANSACTIONS}?year=${currentYear}&month=${currentMonth}`;

	return (
		<li className="rounded-lg border border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-800">
			<div className="rounded-x-lg flex flex-col gap-2 rounded-t-lg border-gray-300 p-3 dark:border-gray-600">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Text>
							<IconView className="size-5" name={source.icon} />
						</Text>

						<Strong className="min-w-0 flex-1 truncate">{source.name}</Strong>
					</div>
					<div className="flex shrink-0 items-center gap-2">
						<SimpleMoneyText>{source.balance}</SimpleMoneyText>

						<SourceFormButton
							source={source}
							onAddOptimisticAction={onAddOptimisticAction}
							onConfirmSaveAction={onConfirmSaveAction}
							onDeleteAction={onDeleteAction}
						>
							<CogIcon className="size-4 shrink-0" />
						</SourceFormButton>
					</div>
				</div>
			</div>
		</li>
	);
}

type SimpleMoneyTextProps = PropsWithChildren<{ className?: string }>;

function SimpleMoneyText({ children, className }: SimpleMoneyTextProps) {
	const moneyInCents = Number(children);
	const formattedMoney = (Math.abs(moneyInCents) / 100).toFixed(2);

	return <Text className={clsx(className)}>{formattedMoney} $</Text>;
}
