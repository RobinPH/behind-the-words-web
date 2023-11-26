<script lang="ts">
	import Result from '$lib/Result.svelte';
	import { viewingResult } from '../../../stores/store';
	export let data: any;

	viewingResult.set(data);

	$: finalResult = (() => {
		const finalResult = {};

		if ($viewingResult)
			for (const r of $viewingResult.result.results) {
				// @ts-ignore
				finalResult[r.id] = r;
			}

		return finalResult;
	})();

	$: probability = $viewingResult
		? Math.round($viewingResult.result.probability * 100 * 100) / 100
		: 0;
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
			<span class="loading loading-bars loading-lg" />
		</div>
	{/if}
</div>
