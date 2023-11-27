<script lang="ts">
	import FileUpload from '$lib/FileUpload.svelte';
	import { getLocalStorageItem, setLocalStorageItem } from '$lib/LocalStorageUtils';
	import Predict from '$lib/Predict.svelte';
	import Prediction from '$lib/Prediction.svelte';
	import Result from '$lib/Result.svelte';
	import TextareaInput from '$lib/TextareaInput.svelte';
	import { v4 as uuidv4 } from 'uuid';
	import { predictionQueue } from '../stores/store';

	let text = '';

	let result: any;
	let includeCNN: boolean;

	let error: any;
	let baseUrl = getLocalStorageItem('backend-url', 'http://127.0.0.1:6060');
	let userId = getLocalStorageItem('user-id', uuidv4());

	// $: if (baseUrl != undefined) setLocalStorageItem('backend-url', baseUrl);
	$: setLocalStorageItem('user-id', userId);
</script>

<div class="flex flex-col w-full h-full gap-4 p-4 pt-4 md:pt-8 md:p-16 md:gap-8">
	<!-- <h1 class="text-2xl font-bold sm:text-4xl text-info">Behind the Words</h1> -->

	{#if $predictionQueue.length <= 0}
		<div class="mb-4 md:mb-0">
			<TextareaInput bind:text />
		</div>
		<div class="flex flex-col items-end justify-between w-full gap-2 md:items-center md:flex-row">
			<FileUpload bind:text bind:baseUrl bind:error bind:includeCNN />
			<Predict bind:text bind:result bind:includeCNN bind:baseUrl bind:error />
		</div>
		{#if error}
			<div class="alert alert-error">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="w-6 h-6 stroke-current shrink-0"
					fill="none"
					viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
					/></svg
				>
				<span>Error: {error}</span>
			</div>
		{/if}
		{#if result}
			<Result {result} />
		{/if}
	{:else}
		<div class="flex flex-col w-full gap-4">
			{#each $predictionQueue as prediction (prediction.id)}
				<Prediction {prediction} />
			{/each}
		</div>
	{/if}
</div>
