import MoneyText from '@/components/MoneyText';
import { Field, Fieldset, Label } from '@/components/base/fieldset';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import Tooltip from '@/components/Navbar/Tooltip';
import { InfoIcon } from 'lucide-react';
import { Text } from '@/components/base/text';
import { Input } from '@/components/base/input';
import { useMemo, useState } from 'react';
import { differenceInMonths } from 'date-fns';
import { Transaction } from '@/lib/transaction/transaction.model';

type SpreadFormProps = {
	transaction?: Transaction;
	amount: string;
};

export function SpreadForm({ transaction, amount }: SpreadFormProps) {
	const [spreadStart, setSpreadStart] = useState<string>(transaction?.spreadStart || '2025-06-12');
	const [spreadEnd, setSpreadEnd] = useState<string>(transaction?.spreadEnd || '2025-05-14');

	const getMessage = () => {
		if (!spreadEnd || !spreadStart) {
			return 'enter start and end date';
		}

		const spreadStartDate = new Date(spreadStart);
		const spreadEndDate = new Date(spreadEnd);

		if (spreadStartDate > spreadEndDate) {
			return 'End date should be after start';
		}

		const numberOfMonths = differenceInMonths(spreadEndDate, spreadStartDate) + 1;

		const parsedAmount = Number(amount) / 100;

		const monthlyAmount = (parsedAmount / numberOfMonths).toFixed(2);

		return `Divides into ${monthlyAmount} monthly for ${numberOfMonths} months`;
	};

	return (
		<Disclosure
			as={Fieldset}
			className="rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700"
		>
			<div className="flex items-center gap-2">
				<DisclosureButton className="grow text-left">Spread transaction</DisclosureButton>
				<Tooltip message="Divides a single amount across months to represent multiple recurring transactions.">
					<InfoIcon className="size-5" />
				</Tooltip>
			</div>
			<DisclosurePanel>
				<Text size="text-sm" color="text-yellow-500">
					{getMessage()}
				</Text>
				<div className="mt-2 grid grid-cols-2 gap-4 pb-1">
					<Field className="col-span-2 md:col-span-1">
						<Label>Start at</Label>
						<Input
							name="spreadStart"
							onChange={(e) => setSpreadStart(e.target.value)}
							type="date"
							value={spreadStart}
						/>
					</Field>

					<Field className="col-span-2 md:col-span-1">
						<Label>End at</Label>
						<Input
							onChange={(e) => setSpreadEnd(e.target.value)}
							name="spreadEnd"
							type="date"
							value={spreadEnd}
						/>
					</Field>
				</div>
			</DisclosurePanel>
		</Disclosure>
	);
}
