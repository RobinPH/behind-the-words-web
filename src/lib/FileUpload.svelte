<script lang="ts">
	import { v4 as uuidv4 } from 'uuid';
	import { predictionQueue } from '../stores/store';
	import { openSidebar } from '../utils/sidebar';

	export let text: string;
	export let includeCNN = false;
	export let baseUrl: string = 'http://127.0.0.1:6060';
	export let error: any;

	const makeEndpoint = (baseUrl: string, endpoint: string) => {
		error = null;
		try {
			const url = new URL(endpoint, baseUrl);

			if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') {
				return url.toString();
			} else {
				return url.toString().replace(/^http\:\/\//i, 'https://');
			}
		} catch (e) {
			throw `Invalid Backend URL (${baseUrl})`;
		}
	};

	let isLoading = false;
</script>

<button class:hidden={!isLoading} class="btn btn-md btn-info" disabled>
	<span class="loading loading-spinner" />
	loading
</button>

<input
	type="file"
	name="file"
	class:hidden={isLoading}
	class="w-full max-w-xs file-input file-input-bordered file-input-info"
	accept=".txt,.pdf,.docx,.doc"
	multiple
	on:change={async (event) => {
		event.preventDefault();

		predictionQueue.set(
			// @ts-ignore
			Array.from(event.target.files).map((file) => {
				return {
					id: uuidv4(),
					type: 'file',
					input: {
						// @ts-ignore
						filename: file.name,
						file
					},
					includeCNN
				};
			})
		);

		openSidebar();

		// isLoading = true;

		// axios
		// 	.post(makeEndpoint(baseUrl, '/predict-from-file').toString(), data, {
		// 		headers: {
		// 			'Content-Type': 'multipart/form-data',
		// 			'ngrok-skip-browser-warning': 1
		// 		}
		// 	})
		// 	.then((response) => {
		// 		text = response.data.text;

		// 		updateUserResults();
		// 	})
		// 	.catch((e) => {
		// 		error = e;
		// 	})
		// 	.finally(() => {
		// 		isLoading = false;
		// 	});
	}}
	required
/>
