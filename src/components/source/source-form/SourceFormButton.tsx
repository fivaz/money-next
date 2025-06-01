'use client';
import { type PropsWithChildren, useState } from 'react';
import Button from '@/components/Button';
import { LandmarkIcon } from 'lucide-react';
import SourceForm, { type SourceFormProps } from '@/components/source/source-form/SourceForm';

type SourceFormButtonProps = PropsWithChildren &
	Pick<
		SourceFormProps,
		'source' | 'onConfirmSaveAction' | 'onAddOptimisticAction' | 'onDeleteAction'
	>;

export default function SourceFormButton({
	children,
	source,
	onAddOptimisticAction,
	onConfirmSaveAction,
	onDeleteAction,
}: SourceFormButtonProps) {
	const [isOpen, setIsOpen] = useState(false);

	const closeDialog = () => setIsOpen(false);
	const openDialog = () => setIsOpen(true);

	return (
		<>
			<Button onClick={openDialog}>
				{children || (
					<>
						<LandmarkIcon className="size-5" />
						Add Source
					</>
				)}
			</Button>

			<SourceForm
				source={source}
				onAddOptimisticAction={onAddOptimisticAction}
				onConfirmSaveAction={onConfirmSaveAction}
				isOpen={isOpen}
				closeFormAction={closeDialog}
				onDeleteAction={onDeleteAction}
			/>
		</>
	);
}
