import { default as axios } from 'axios';

import { getLocalStorageItem } from './LocalStorageUtils';

const BACKUP_ENDPOINT = 'https://robinph.pythonanywhere.com/';

const getBaseUrl = async () => {
	// const url = getLocalStorageItem('override-backend-url', 'http://127.0.0.1:6060/');
	const url = getLocalStorageItem('override-backend-url', 'https://robinph.pythonanywhere.com/');

	try {
		await axios.get(new URL('ping', url).toString(), {
			timeout: 200
		});

		return url;
	} catch (e) {
		return new URL(BACKUP_ENDPOINT).toString();
	}
};

const makeEndpoint = async (endpoint: string, useBackup = false) => {
	const baseUrl = useBackup ? BACKUP_ENDPOINT : await getBaseUrl();

	try {
		const url = new URL(endpoint, baseUrl);

		if (
			url.hostname === 'localhost' ||
			url.hostname === '127.0.0.1' ||
			url.hostname.startsWith('172') ||
			url.hostname.startsWith('192') ||
			url.hostname.startsWith('127')
		) {
			return url.toString();
		} else {
			return url.toString().replace(/^http:\/\//i, 'https://');
		}
	} catch (e) {
		throw `Invalid Backend URL (${baseUrl})`;
	}
};

export const predict = (
	txt: string,
	includeCNN = false,
	partialCallback: PartialResultCallback = () => {}
) => {
	return makeEndpoint('/predict').then((endpoint) => {
		console.log({ endpoint });
		return streamRequest<PredictionResult>(
			'POST',
			endpoint,
			JSON.stringify({
				text: txt,
				user_id: getLocalStorageItem('user-id'),
				include_cnn: includeCNN
			}),
			{
				'Content-Type': 'application/json',
				'ngrok-skip-browser-warning': 1
			},
			partialCallback
		);
	});
	// return new Promise((resolve, reject) => {
	// 	axios
	// 		.post(
	// 			makeEndpoint('/predict-stream'),
	// 			{
	// 				text: txt,
	// 				user_id: getLocalStorageItem('user-id'),
	// 				include_cnn: includeCNN
	// 			},
	// 			{
	// 				headers: {
	// 					'ngrok-skip-browser-warning': 1
	// 				},
	// 				responseType: 'stream'
	// 			}
	// 		)
	// 		.then((response) => {
	// 			const stream = response.data;

	// 			console.log(response.data.pipe);

	// 			console.log('fooo');

	// 			// stream.on('data', (data) => {
	// 			// 	console.log(data);
	// 			// 	if (data.done) {
	// 			// 		resolve(data.data);
	// 			// 	} else {
	// 			// 		partialCallback(data.data);
	// 			// 	}
	// 			// });

	// 			// stream.on('end');

	// 			// console.log(stream);
	// 		})
	// 		.catch(reject);
	// });

	// return new Promise((resolve, reject) => {
	// 	axios
	// 		.post(
	// 			makeEndpoint('/predict-stream'),
	// 			{
	// 				text: txt,
	// 				user_id: getLocalStorageItem('user-id'),
	// 				include_cnn: includeCNN
	// 			},
	// 			{
	// 				headers: {
	// 					'ngrok-skip-browser-warning': 1
	// 				},
	// 				responseType: 'stream'
	// 			}
	// 		)
	// 		.then((response) => resolve(response.data))
	// 		.catch(reject);
	// });
};

export const predictFromFile = (
	file: any,
	includeCNN = false,
	partialCallback: PartialResultCallback = () => {}
) => {
	const data = new FormData();
	data.append('file', file);
	data.append(
		'props',
		JSON.stringify({
			user_id: getLocalStorageItem('user-id'),
			include_cnn: includeCNN
		})
	);

	return makeEndpoint('/predict-from-file').then((endpoint) => {
		return streamRequest<PredictionResult>('POST', endpoint, data, {}, partialCallback);
	});

	// return new Promise((resolve, reject) => {
	// 	axios
	// 		.post(makeEndpoint('/predict-from-file').toString(), data, {
	// 			headers: {
	// 				'Content-Type': 'multipart/form-data',
	// 				'ngrok-skip-browser-warning': 1
	// 			}
	// 		})
	// 		.then((response) => resolve(response.data))
	// 		.catch(reject);
	// });
};

export const getResult = (id: string) => {
	return new Promise((resolve, reject) => {
		makeEndpoint(`/result/${id}`).then((endpoint) => {
			axios
				.get(endpoint, {
					headers: {
						'ngrok-skip-browser-warning': 1
					}
				})
				.then((response) => resolve(response.data))
				.catch(reject);
		});
	});
};

export const clearHistory = () => {
	return new Promise((resolve, reject) => {
		makeEndpoint(`/clear-history`).then((endpoint) => {
			userResults.set([]);
			axios
				.post(
					endpoint,
					{
						user_id: getLocalStorageItem('user-id')
					},
					{
						headers: {
							'ngrok-skip-browser-warning': 1
						}
					}
				)
				.then((response) => {
					resolve(response.data);
					clearPredictionTasks();
					updateUserResults();
				})
				.catch(reject);
		});
	});
};

const streamRequest = <T>(method, url, body, headers = {}, callback = () => {}) => {
	return new Promise<T>((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open(method, url);
		xhr.seenBytes = 0;

		// xhr.setRequestHeader('Content-Type', 'application/json');

		for (const [key, value] of Object.entries(headers)) {
			xhr.setRequestHeader(key, value);
		}

		xhr.onreadystatechange = function () {
			let newData;

			if (xhr.readyState === 3) {
				newData = xhr.response.substr(xhr.seenBytes);
				xhr.seenBytes = xhr.responseText.length;
			} else if (xhr.readyState === 4) {
				newData = xhr.response.substr(xhr.seenBytes);
				xhr.seenBytes = xhr.responseText.length;
			}

			if (newData) {
				try {
					for (const d of newData.split('\n')) {
						if (!d) {
							continue;
						}
						const data = JSON.parse(d);

						if (data.done) {
							resolve(data.data);
						} else {
							callback(data.data);
						}
					}
				} catch (e) {
					console.log(e, newData);
				}
			}
		};

		xhr.addEventListener('error', reject);

		xhr.send(body);
	});
};

export const getUserResults = (id: string) => {
	return new Promise<PredictionResult[]>((resolve, reject) => {
		makeEndpoint(`/user/${id}`).then((endpoint) => {
			axios
				.get(endpoint, {
					headers: {
						'ngrok-skip-browser-warning': 1
					}
				})
				.then((response) => resolve(response.data))
				.catch(reject);
		});
	});
};

import { writable } from 'svelte/store';
import { clearPredictionTasks, updateUserResults, userResults } from '../stores/store';
import type { PartialResultCallback, PredictionResult } from '../types/types';

const useResults = writable([]);
