import { DEEPL_KEY } from '$env/static/private';
import { generateImageDescription as azure } from '$lib/azure';

type TranslationResult = {
	translations: [
		{
			text: string;
			detected_source_language: string;
		}
	];
};

export const generateImageDescription = async (imageFile: File, fetcher: typeof fetch) => {
	const json = await azure(imageFile, fetcher);

	const translationResponse = await fetcher('https://api-free.deepl.com/v2/translate', {
		method: 'POST',
		headers: {
			Authorization: `DeepL-Auth-Key ${DEEPL_KEY}`,
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams([
			['text', json.descriptionResult.values[0].text],
			...json.tagsResult.values.map((tag) => ['text', tag.name]),
			['source_lang', 'EN'],
			['target_lang', 'DE']
		])
	});

	const translation: TranslationResult = await translationResponse.json();

	return {
		description: translation.translations[0].text,
		tags: translation.translations.slice(1).map((translation) => translation.text)
	};
};
