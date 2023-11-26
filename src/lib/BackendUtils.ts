import { default as axios } from 'axios';

import { getLocalStorageItem } from './LocalStorageUtils';

const getBaseUrl = () => getLocalStorageItem('backend-url', 'http://127.0.0.1:6060');

const makeEndpoint = (endpoint: string) => {
	const baseUrl = getBaseUrl();

	try {
		const url = new URL(endpoint, baseUrl);

		if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') {
			return url.toString();
		} else {
			return url.toString().replace(/^http:\/\//i, 'https://');
		}
	} catch (e) {
		throw `Invalid Backend URL (${baseUrl})`;
	}
};

export const predict = (txt: string, includeCNN = false) => {
	return new Promise((resolve, reject) => {
		const predictEndpoint = includeCNN ? makeEndpoint('/rf-cnn') : makeEndpoint('/rf');
		if (typeof predictEndpoint == 'string') {
			axios
				.post(
					predictEndpoint,
					{
						text: txt,
						user_id: getLocalStorageItem('user-id')
					},
					{
						headers: {
							'ngrok-skip-browser-warning': 1
						}
					}
				)
				.then((response) => resolve(response.data))
				.catch(reject);
		}
	});
};

export const getResult = (id: string) => {
	return new Promise((resolve, reject) => {
		axios
			.get(makeEndpoint(`/result/${id}`), {
				headers: {
					'ngrok-skip-browser-warning': 1
				}
			})
			.then((response) => resolve(response.data))
			.catch(reject);
	});
};

export const getUserResults = (id: string) => {
	return new Promise((resolve, reject) => {
		axios
			.get(makeEndpoint(`/user/${id}`), {
				headers: {
					'ngrok-skip-browser-warning': 1
				}
			})
			.then((response) => resolve(response.data))
			.catch(reject);
	});
};

import { writable } from 'svelte/store';

const useResults = writable([]);
