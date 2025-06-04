'use client';
import { FormEvent, useRef } from 'react';
import { type Source } from '@/lib/source/source.model';
import { Field, Label } from '@/components/base/fieldset';
import { Input } from '@/components/base/input';
import { Dialog, DialogActions, DialogTitle } from '@/components/base/dialog';
import Button from '@/components/Button';
import { deleteSource, saveSource } from '@/lib/source/source.actions';
import { XIcon } from 'lucide-react';
import { buildSource } from '@/lib/source/source.utils';
import MoneyInput from '@/components/MoneyInput';
import IconPicker from '@/components/icon-picker/IconPicker';

export type SourceFormProps = {
	source?: Source;
	isOpen: boolean;
	closeFormAction: () => void;
	onAddOrUpdateAction: (source: Source) => number;
	onConfirmSaveAction: (tempId: number, realSource: Source) => void;
	onDeleteAction?: (source: Source) => void;
};

export default function SourceForm({
	source,
	isOpen,
	closeFormAction,
	onAddOrUpdateAction,
	onConfirmSaveAction,
	onDeleteAction,
}: SourceFormProps) {
	const formRef = useRef<HTMLFormElement>(null); // Add ref to access form element

	const isEditing = !!source?.id;

	const resetForm = () => formRef.current?.reset();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const newSource = buildSource(formData);

		const tempId = onAddOrUpdateAction(newSource);
		resetForm();
		closeFormAction();

		try {
			const saved = await saveSource(newSource);
			onConfirmSaveAction(tempId, saved);
		} catch (err) {
			console.error('Failed to save source:', err);
		}
	};

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
				<Button onClick={closeFormAction} size="p-1">
					<XIcon />
				</Button>
			</DialogTitle>

			<form className="z-20 mt-4 space-y-4" onSubmit={handleSubmit} ref={formRef}>
				<input type="hidden" name="id" defaultValue={source?.id} />
				<div className="grid grid-cols-3 gap-4">
					<Field className="col-span-2">
						<Label>Name</Label>
						<Input name="name" required defaultValue={source?.name} />
					</Field>
					<Field className="col-span-1">
						<Label>Balance</Label>
						<MoneyInput required name="balance" defaultValue={source?.balance.toString()} />
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
					<Button type="submit">Save</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
}
