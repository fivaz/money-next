import { Source } from '@/lib/source/source.model';

export const buildSource = (formData: FormData): Source => {
	return {
		id: Number(formData.get('id')),
		name: formData.get('name') as string,
		icon: formData.get('icon') as string,
		sortOrder: Infinity,
		balance: parseInt(formData.get('balance') as string),
	};
};

export const sortSources = (sources: Source[]): Source[] =>
	sources.toSorted((a, b) => a.sortOrder - b.sortOrder);
