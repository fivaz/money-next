'use client';
import { FormEvent, useRef } from 'react';
import { type Source } from '@/lib/source/source.model';
import { Field, Label } from '@/components/base/fieldset';
import { Input } from '@/components/base/input';
import { Dialog, DialogActions, DialogTitle } from '@/components/base/dialog';
import Button from '@/components/Button';
import { addSourceDB, deleteSourceDB, editSourceDB } from '@/lib/source/source.actions';
import { XIcon } from 'lucide-react';
import { buildSource } from '@/lib/source/source.utils';
import MoneyInput from '@/components/MoneyInput';
import IconPicker from '@/components/icon-picker/IconPicker';
import { useSourceList } from '@/lib/source/SourceListProvider';
import ConfirmButton from '@/components/Button/ConfirmButton';

type SourceFormProps = {
	source?: Source;
	isOpen: boolean;
	closeFormAction: () => void;
};

export default function SourceForm({ source, isOpen, closeFormAction }: SourceFormProps) {
	const formRef = useRef<HTMLFormElement>(null);
	const { addItem, editItem, deleteItem } = useSourceList();

	const resetForm = () => formRef.current?.reset();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const newSource = buildSource(formData);

		if (source?.id) editSource(newSource);
		else addSource(newSource);

		resetForm();
		closeFormAction();
	};

	const addSource = (sourceWithoutId: Omit<Source, 'id'>) => {
		const source = { ...sourceWithoutId, id: -Date.now() };
		addItem(source);

		void addSourceDB(sourceWithoutId);
	};

	const editSource = (source: Source) => {
		editItem(source);

		void editSourceDB(source);
	};

	async function handleDelete() {
		if (source?.id) {
			deleteItem(source.id);

			void deleteSourceDB(source.id);
		}
	}

	return (
		<Dialog open={isOpen} onClose={closeFormAction}>
			<DialogTitle className="flex items-center justify-between">
				<span>{source?.id ? 'Edit Source' : 'Add Source'}</span>
				<Button onClick={closeFormAction} size="p-1">
					<XIcon />
				</Button>
			</DialogTitle>

			<form className="z-20 mt-4 space-y-4" onSubmit={handleSubmit} ref={formRef}>
				<input type="hidden" name="id" defaultValue={source?.id} />
				<input type="hidden" name="sortOrder" defaultValue={source?.sortOrder} />
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
						{source?.id && (
							<ConfirmButton
								message="This source will be permanently deleted. This action cannot be undone."
								className="w-full justify-center sm:w-auto sm:justify-start"
								type="button"
								color="red"
								size="sm:px-2.5 sm:py-1.5 p-2.5"
								onClick={handleDelete}
							>
								Delete
							</ConfirmButton>
						)}
					</div>

					<Button
						size="sm:px-2.5 sm:py-1.5 p-2.5"
						className="w-full justify-center sm:w-auto sm:justify-start"
						type="submit"
					>
						Save
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
}
