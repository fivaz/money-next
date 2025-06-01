'use server';

import { cookies } from 'next/headers';
import { BACKEND_URL, ROUTES } from '@/lib/const';
import { type Source, SOURCES_URL, validateSources } from '@/lib/source/source.model';
import { revalidatePath } from 'next/cache';
import { fetchWithAuth } from '@/lib/shared/api-server.utils';

export async function getSources(): Promise<Source[]> {
	const data = await fetchWithAuth(SOURCES_URL);
	return validateSources(data);
}

export async function saveSource(source: Source, isEditing: boolean) {
	const method = isEditing ? 'PUT' : 'POST';
	const url = isEditing ? `${SOURCES_URL}/${source.id}` : SOURCES_URL;

	return fetchWithAuth(url, {
		method,
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(source),
	});
}

export async function deleteSource(id: number): Promise<void> {
	await fetchWithAuth(
		`${SOURCES_URL}/${id}`,
		{
			method: 'DELETE',
		},
		false,
	); // false = we don't expect JSON response

	revalidatePath(ROUTES.SOURCES.path);
}

export async function reorderSources(sources: Source[]): Promise<void> {
	await fetchWithAuth(
		`${SOURCES_URL}/reorder`,
		{
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(sources.map(({ id }) => ({ id }))),
		},
		false,
	);

	revalidatePath(ROUTES.SOURCES.path);
}
