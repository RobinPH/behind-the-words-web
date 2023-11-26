import { getUserResults } from '$lib/BackendUtils';
import { getLocalStorageItem } from '$lib/LocalStorageUtils';
import { writable } from 'svelte/store';

export const userResults = writable([]);

export const updateUserResults = async () => {
	const results = await getUserResults(getLocalStorageItem('user-id'));
	userResults.set(results.reverse());
};

export const viewingResult = writable();
