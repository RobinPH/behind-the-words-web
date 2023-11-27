import { getUserResults } from '$lib/BackendUtils';
import { getLocalStorageItem } from '$lib/LocalStorageUtils';
import { get, writable } from 'svelte/store';

export const userResults = writable([]);

export const updateUserResults = async () => {
	const results = await getUserResults(getLocalStorageItem('user-id'));
	userResults.set(results.reverse());
};

export const viewingResult = writable();

export const predictionQueue = writable<any[]>([]);

export const processingQueue = writable<string | undefined>();

export const nextInQueue = () => {
	const processing = get(processingQueue);
	const queue = get(predictionQueue);

	if (processing === undefined) {
		if (queue.length > 0) {
			processingQueue.set(queue[0].id);
		}
	} else {
		const index = queue.findIndex((prediction) => prediction.id === processing) + 1;

		if (index < queue.length) {
			processingQueue.set(queue[index].id);
		}
	}
};

predictionQueue.subscribe(() => {
	nextInQueue();
});
