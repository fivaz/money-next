import { z } from 'zod';

export function validateSchema<T extends z.ZodTypeAny>(
	data: unknown,
	schema: T,
	typeName: string,
): z.infer<T>[] {
	// Ensure data is an array
	if (!Array.isArray(data)) {
		console.warn(`Expected an array of ${typeName}, received:`, data);
		return [];
	}

	// Validate each item individually
	const validItems: z.infer<T>[] = [];
	data.forEach((item, index) => {
		const result = schema.safeParse(item);
		if (result.success) {
			validItems.push(result.data);
		} else {
			console.warn(`Invalid ${typeName} at index ${index}:`, {
				item,
				errors: result.error.format(),
			});
		}
	});

	return validItems;
}
