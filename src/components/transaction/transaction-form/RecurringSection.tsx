import { Field, Fieldset, Label } from '@/components/base/fieldset';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import Tooltip from '@/components/Tooltip';
import { InfoIcon } from 'lucide-react';
import { Input } from '@/components/base/input';
import { ChangeEvent } from 'react';
import { Transaction } from '@/lib/transaction/transaction.model';

type RecurringSectionProps = {
	transaction: Transaction;
	handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export function RecurringSection({ transaction, handleChange }: RecurringSectionProps) {
	return (
		<Disclosure
			defaultOpen
			as={Fieldset}
			className="rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700"
		>
			<div className="flex items-center gap-2">
				<DisclosureButton className="grow text-left text-base sm:text-sm">
					Spread transaction
				</DisclosureButton>
				<Tooltip message="Divides a single amount across months to represent multiple recurring transactions.">
					<InfoIcon className="size-5" />
				</Tooltip>
			</div>
			<DisclosurePanel unmount={false}>
				<div className="mt-2 grid grid-cols-2 gap-4 pb-1">
					<Field className="col-span-2 md:col-span-1">
						<Label className="text-sm">Start at</Label>
						<Input
							name="spreadStart"
							onChange={handleChange}
							type="date"
							value={transaction.spreadStart}
						/>
					</Field>

					<Field className="col-span-2 md:col-span-1">
						<Label className="text-sm">End at</Label>
						<Input
							onChange={handleChange}
							name="spreadEnd"
							type="date"
							value={transaction.spreadEnd}
						/>
					</Field>
				</div>
			</DisclosurePanel>
		</Disclosure>
	);
}
