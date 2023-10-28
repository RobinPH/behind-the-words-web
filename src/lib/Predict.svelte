<script lang="ts">
	import { default as axios } from 'axios';
	export let text: string;
	export let result: any;
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

	const predict = (txt: string) => {
		result = null;
		return new Promise((resolve, reject) => {
			const predictEndpoint = includeCNN
				? makeEndpoint(baseUrl, '/rf-cnn')
				: makeEndpoint(baseUrl, '/rf');
			if (typeof predictEndpoint == 'string') {
				axios
					.post(
						predictEndpoint,
						{
							text: txt
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
</script>

<div class="flex items-center gap-2">
	<div class="items-end justify-center form-control">
		<label class="flex justify-end gap-2 cursor-pointer items label w-fit">
			<span class="label-text">Include CNN</span>
			<input type="checkbox" bind:checked={includeCNN} class="checkbox checkbox-info checkbox-sm" />
		</label>
		<label class="flex justify-end gap-2 cursor-pointer label">
			<span class="label-text">Backend URL</span>
			<input
				type="url"
				placeholder="Enter URL"
				class="w-72 input input-bordered input-xs"
				bind:value={baseUrl}
			/>
		</label>
	</div>
	<button
		class="btn btn-info"
		disabled={isLoading}
		on:click={async () => {
			isLoading = true;

			error = null;

			predict(text)
				.then((res) => {
					result = res;
				})
				.catch((e) => {
					error = e;
				})
				.finally(() => {
					isLoading = false;
				});
		}}
	>
		{#if isLoading}
			<span class="loading loading-spinner" />
			Checking
		{:else}
			Check
		{/if}
	</button>
</div>
