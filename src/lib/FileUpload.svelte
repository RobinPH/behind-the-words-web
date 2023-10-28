<script lang="ts">
	import { default as axios } from 'axios';

	export let text: string;
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
	on:change={async (event) => {
		event.preventDefault();

		// @ts-ignore
		const file = event.target.files[0];

		const data = new FormData();
		data.append('file', file);

		isLoading = true;

		axios
			.post(makeEndpoint(baseUrl, '/read-file').toString(), data, {
				headers: {
					'Content-Type': 'multipart/form-data',
					'ngrok-skip-browser-warning': 1
				}
			})
			.then((response) => {
				text = response.data.text;
			})
			.catch((e) => {
				error = e;
			})
			.finally(() => {
				isLoading = false;
			});
	}}
	required
/>
