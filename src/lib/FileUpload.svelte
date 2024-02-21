<script lang="ts">
	import { v4 as uuidv4 } from 'uuid';
	import { queuePredictionTasks } from '../stores/store';
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

	let files: any;
	let input: any;
</script>

<button class:hidden={!isLoading} class="btn btn-md btn-info" disabled>
	<span class="loading loading-spinner" />
	loading
</button>

<label for="files" class:hidden={isLoading} class="w-full btn btn-bordered btn-info md:max-w-fit">
	Choose files
</label>
<input
	id="files"
	type="file"
	name="file"
	class="hidden"
	accept=".txt,.pdf,.docx,.doc"
	bind:files
	bind:this={input}
	multiple
	on:change={async (event) => {
		event.preventDefault();

		queuePredictionTasks(
			...Array.from(event.target.files).map((file) => {
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

		input.value = '';

		// predictionQueue.set(
		// 	// @ts-ignore
		// 	Array.from(event.target.files).map((file) => {
		// 		return {
		// 			id: uuidv4(),
		// 			type: 'file',
		// 			input: {
		// 				// @ts-ignore
		// 				filename: file.name,
		// 				file
		// 			},
		// 			includeCNN
		// 		};
		// 	})
		// );

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
