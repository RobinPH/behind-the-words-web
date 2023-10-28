<script lang="ts">
	import { default as axios } from 'axios';

	export let text: string;
	export let baseUrl: string = 'http://127.0.0.1:6060';

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

		const response = await axios.post(new URL('/read-file', baseUrl).toString(), data, {
			headers: {
				'Content-Type': 'multipart/form-data',
				'ngrok-skip-browser-warning': 1
			}
		});

		isLoading = false;

		text = response.data.text;
	}}
	required
/>
