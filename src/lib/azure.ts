import { COMPUTERVISION_KEY } from '$env/static/private';

const endpoint = 'https://apollo-computervision.cognitiveservices.azure.com/';

type RecognitionResult = {
	modelVersion: string;
	metadata: {
		width: number;
		height: number;
	};
	descriptionResult: {
		values: [
			{
				text: string;
				confidence: number;
			}
		];
	};
	tagsResult: {
		values: [
			{
				name: string;
				confidence: number;
			}
		];
	};
};

export const generateImageDescription = async (imageFile: File, fetcher: typeof fetch) => {
	const url = `${endpoint}computervision/imageanalysis:analyze?api-version=2022-10-12-preview&features=description,tags&language=en`;

	const response = await fetcher(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/octet-stream',
			'Ocp-Apim-Subscription-Key': COMPUTERVISION_KEY
		},
		body: imageFile
	});

	return (await response.json()) as RecognitionResult;
};
