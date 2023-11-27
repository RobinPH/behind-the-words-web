import { default as axios } from 'axios';

import { getLocalStorageItem } from './LocalStorageUtils';

const getBaseUrl = () =>
	getLocalStorageItem('override-backend-url', 'https://885f-128-199-73-133.ngrok-free.app');

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

export const predict = (txt: string, includeCNN = false, partialCallback = () => {}) => {
	return streamRequest(
		'POST',
		makeEndpoint('/predict'),
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
	return new Promise((resolve, reject) => {
		axios
			.post(
				makeEndpoint('/predict-stream'),
				{
					text: txt,
					user_id: getLocalStorageItem('user-id'),
					include_cnn: includeCNN
				},
				{
					headers: {
						'ngrok-skip-browser-warning': 1
					},
					responseType: 'stream'
				}
			)
			.then((response) => {
				const stream = response.data;

				console.log(response.data.pipe);

				console.log('fooo');

				// stream.on('data', (data) => {
				// 	console.log(data);
				// 	if (data.done) {
				// 		resolve(data.data);
				// 	} else {
				// 		partialCallback(data.data);
				// 	}
				// });

				// stream.on('end');

				// console.log(stream);
			})
			.catch(reject);
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
	// 		.then((response) => resolve(response.data))
	// 		.catch(reject);
	// });
};

export const predictFromFile = (file: any, includeCNN = false, partialCallback = () => {}) => {
	const data = new FormData();
	data.append('file', file);
	data.append(
		'props',
		JSON.stringify({
			user_id: getLocalStorageItem('user-id'),
			include_cnn: includeCNN
		})
	);

	return streamRequest('POST', makeEndpoint('/predict-from-file'), data, {}, partialCallback);

	return new Promise((resolve, reject) => {
		axios
			.post(makeEndpoint('/predict-from-file').toString(), data, {
				headers: {
					'Content-Type': 'multipart/form-data',
					'ngrok-skip-browser-warning': 1
				}
			})
			.then((response) => resolve(response.data))
			.catch(reject);
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

const streamRequest = (method, url, body, headers = {}, callback = () => {}) => {
	return new Promise((resolve, reject) => {
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
