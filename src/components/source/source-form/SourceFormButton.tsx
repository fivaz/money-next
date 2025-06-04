'use client';
import { type PropsWithChildren, useState } from 'react';
import Button from '@/components/Button';
import { LandmarkIcon } from 'lucide-react';
import SourceForm from '@/components/source/source-form/SourceForm';
import { Source } from '@/lib/source/source.model';

type SourceFormButtonProps = PropsWithChildren<{
	source?: Source;
}>;

export default function SourceFormButton({ children, source }: SourceFormButtonProps) {
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

			<SourceForm source={source} isOpen={isOpen} closeFormAction={closeDialog} />
		</>
	);
}
