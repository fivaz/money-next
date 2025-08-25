'use server';

import { ROUTES } from '@/lib/const';
import { type Source, SOURCES_URL, validateSources } from '@/lib/source/source.model';
import { revalidatePath } from 'next/cache';
import { fetchInAction } from '@/lib/shared/api-server.utils';

export async function getExpectedBalance(): Promise<number> {
	return await fetchInAction(`${SOURCES_URL}/expected-balance`);
}

export async function getSources(): Promise<Source[]> {
	const data = await fetchInAction(SOURCES_URL);
	return validateSources(data);
}

export async function addSourceDB(source: Omit<Source, 'id'>) {
	const saved = fetchInAction(SOURCES_URL, {
		method: 'POST',
		body: JSON.stringify(source),
	});

	revalidatePath(ROUTES.SOURCES.path);

	return saved;
}

export async function editSourceDB(source: Source) {
	const saved = fetchInAction(`${SOURCES_URL}/${source.id}`, {
		method: 'PUT',
		body: JSON.stringify(source),
	});

	revalidatePath(ROUTES.SOURCES.path);

	return saved;
}

export async function deleteSourceDB(id: number): Promise<void> {
	await fetchInAction(
		`${SOURCES_URL}/${id}`,
		{
			method: 'DELETE',
		},
		false,
	); // false = we don't expect JSON response

	revalidatePath(ROUTES.SOURCES.path);
}

export async function reorderSources(sources: Source[]): Promise<void> {
	await fetchInAction(
		`${SOURCES_URL}/reorder`,
		{
			method: 'PUT',
			body: JSON.stringify(sources.map(({ id }) => ({ id }))),
		},
		false,
	);

	revalidatePath(ROUTES.SOURCES.path);
}
