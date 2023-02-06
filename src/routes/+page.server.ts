import type { Actions } from './$types';
import { generateImageDescription } from '$lib/recognition';
import { fail } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request, fetch }) => {
		const data = await request.formData();
		const image = data.get('image') as File;
		try {
			const imageDescription = await generateImageDescription(image, fetch);
			return { success: true, ...imageDescription };
		} catch (error) {
			return fail(400, { success: false, description: '', tags: [] });
		}
	}
};
