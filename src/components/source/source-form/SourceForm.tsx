'use client';
import { useRef, useState, useTransition } from 'react';
import { type Source } from '@/lib/source/source.model';
import { Field, Label } from '@/components/base/fieldset';
import { Input } from '@/components/base/input';
import { Dialog, DialogActions, DialogTitle } from '@/components/base/dialog';
import { Button } from '@/components/base/button';
import { deleteSource, saveSource } from '@/lib/source/source.actions';
import { XIcon } from 'lucide-react';
import { buildSource } from '@/lib/source/source.utils';
import MoneyInput from '@/components/MoneyInput';
import IconPicker from '@/components/icon-picker/IconPicker';

export type SourceFormProps = {
	source?: Source;
	isOpen: boolean;
	closeFormAction: () => void;
	onAddOptimisticAction: (source: Source) => void;
	onConfirmSaveAction: (tempId: number, realSource: Source) => void;
	onDeleteAction?: (source: Source) => void;
};

export default function SourceForm({
	source,
	isOpen,
	closeFormAction,
	onAddOptimisticAction,
	onConfirmSaveAction,
	onDeleteAction,
}: SourceFormProps) {
	const [isPending, startTransition] = useTransition();
	const [balance, setBalance] = useState<string>(source?.balance.toString() || '');
	const formRef = useRef<HTMLFormElement>(null); // Add ref to access form element

	const isEditing = !!source?.id;

	const resetForm = () => {
		// Reset form and state after successful submission
		formRef.current?.reset(); // Reset form inputs
	};

	async function handleSubmit(formData: FormData) {
		const id = isEditing ? source.id! : -Date.now();
		const newSourceWithoutId = buildSource(formData);
		const newSource = { id, ...newSourceWithoutId, transactions: [] };

		onAddOptimisticAction(newSource);

		startTransition(async () => {
			try {
				const saved = await saveSource(newSource, isEditing);
				onConfirmSaveAction(id, saved);
				resetForm();
				closeFormAction();
			} catch (err) {
				console.error('Failed to save source:', err);
			}
		});
	}

	async function handleDelete() {
		if (source && onDeleteAction) {
			onDeleteAction(source);
			await deleteSource(source.id);
		}
	}

	return (
		<Dialog open={isOpen} onClose={closeFormAction}>
			<DialogTitle className="flex items-center justify-between">
				<span>{isEditing ? 'Edit Source' : 'Add Source'}</span>
				<Button onClick={closeFormAction} outline size="p-1">
					<XIcon />
				</Button>
			</DialogTitle>

			<form className="z-20 mt-4 space-y-4" action={handleSubmit} ref={formRef}>
				<input type="hidden" name="id" defaultValue={source?.id} />
				<div className="grid grid-cols-3 gap-4">
					<Field className="col-span-2">
						<Label>Name</Label>
						<Input name="name" defaultValue={source?.name} />
					</Field>
					<Field className="col-span-1">
						<Label>Balance</Label>
						<MoneyInput name="balance" defaultValue={balance} />
					</Field>
				</div>

				<IconPicker name="icon" defaultValue={source?.icon} />

				<DialogActions>
					<div>
						{isEditing && onDeleteAction && (
							<Button type="button" color="red" onClick={handleDelete}>
								Delete
							</Button>
						)}
					</div>
					<Button type="submit" disabled={isPending}>
						{isPending ? 'Saving...' : 'Save'}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
}
