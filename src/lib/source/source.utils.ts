import { Source } from '@/lib/source/source.model';

export const buildSource = (formData: FormData): Source => {
	return {
		id: Number(formData.get('id')),
		name: formData.get('name') as string,
		icon: formData.get('icon') as string,
		sortOrder: Number(formData.get('sortOrder')) ?? 10000,
		balance: parseInt(formData.get('balance') as string),
	};
};

export const sortSources = (a: Source, b: Source) => a.sortOrder - b.sortOrder;
