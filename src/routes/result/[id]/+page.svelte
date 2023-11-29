<script lang="ts">
	import { getResult } from '$lib/BackendUtils';
	import Card from '$lib/Card.svelte';
	import Result from '$lib/Result.svelte';
	import { onMount } from 'svelte';
	import { isFetchingResult, viewingResult } from '../../../stores/store';
	import type { PageData } from './$types';
	export let data: PageData;

	onMount(async () => {
		isFetchingResult.set(true);
		const result = await getResult(data.id);

		viewingResult.set(result);

		isFetchingResult.set(false);
	});
</script>

<div class="flex flex-col w-full h-full gap-4 p-4 pt-4 md:pt-8 md:p-16 md:gap-8">
	<!-- <h1 class="text-2xl font-bold sm:text-4xl text-info">Behind the Words</h1> -->
	<!-- <TextareaInput bind:text />
	<div class="flex items-center justify-between w-full gap-2">
		<FileUpload bind:text bind:baseUrl bind:error />
		<Predict bind:text bind:result bind:includeCNN bind:baseUrl bind:error />
	</div> -->
	{#if $viewingResult}
		<!-- <div
			class="p-4 text-sm text-justify border-2 rounded-lg border-info max-h-[60vh] overflow-auto"
		>
			{$viewingResult.text}
		</div> -->
		<textarea
			class="w-full textarea textarea-info h-[60vh] resize-none !bg-transparent !border-info"
			placeholder="Enter Essay"
			value={$viewingResult.text}
			disabled
		/>
		<Result result={$viewingResult} />
	{:else}
		<div class="flex items-center justify-center w-full">
			{#if $isFetchingResult}
				<span class="loading loading-bars loading-lg" />
			{:else}
				<Card><p class="font-bold">Result not found</p></Card>
			{/if}
		</div>
	{/if}
</div>
