import { browser } from '$app/environment';

export const getLocalStorageItem = (key: string, defaultValue: any = undefined) => {
	if (!browser) {
		return defaultValue;
	}

	if (typeof localStorage == undefined) {
		return defaultValue;
	}

	return localStorage.getItem(key) ?? defaultValue;
};

export const setLocalStorageItem = (key: string, value: string) => {
	if (!browser) {
		return;
	}

	if (typeof localStorage == undefined) {
		return;
	}

	return localStorage.setItem(key, value);
};
