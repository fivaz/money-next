'use server';

import { API, ROUTES } from '@/lib/const';
import { type Source, validateSources } from '@/lib/source/source.model';
import { revalidatePath } from 'next/cache';
import { fetchAPI } from '@/lib/shared/api.utils.actions';

export async function getExpectedBalance(): Promise<number> {
	return await fetchAPI(`${API.SOURCES}/expected-balance`);
}

export async function getSources(): Promise<Source[]> {
	const data = await fetchAPI(API.SOURCES);
	return validateSources(data);
}

export async function addSourceDB(source: Omit<Source, 'id'>) {
	const saved = await fetchAPI(API.SOURCES, {
		method: 'POST',
		body: JSON.stringify(source),
	});

	revalidatePath(ROUTES.SOURCES.path);

	return saved;
}

export async function editSourceDB(source: Source) {
	const saved = fetchAPI(`${API.SOURCES}/${source.id}`, {
		method: 'PUT',
		body: JSON.stringify(source),
	});

	revalidatePath(ROUTES.SOURCES.path);

	return saved;
}

export async function deleteSourceDB(id: number): Promise<void> {
	await fetchAPI(`${API.SOURCES}/${id}`, {
		method: 'DELETE',
	});

	revalidatePath(ROUTES.SOURCES.path);
}

export async function reorderSources(sources: Source[]): Promise<void> {
	await fetchAPI(`${API.SOURCES}/reorder`, {
		method: 'PUT',
		body: JSON.stringify(sources.map(({ id }) => ({ id }))),
	});

	revalidatePath(ROUTES.SOURCES.path);
}
