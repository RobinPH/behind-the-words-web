<script lang="ts">
	import { onMount } from 'svelte';
	import {
		predictionTaskQueue,
		processingPredictionTasks,
		updateUserResults,
		userResults
	} from '../stores/store';
	import { clearHistory } from './BackendUtils';
	import ProcessingPredictionTaskcopy from './ProcessingPredictionTask copy.svelte';
	import { default as QueuedPredictionTask } from './QueuedPredictionTask.svelte';
	import ResultAsSiderbar from './ResultAsSiderbar.svelte';

	export let noProgress = false;
	let results: any[] = [];

	userResults.subscribe((res) => {
		results = res;
	});

	onMount(() => {
		updateUserResults();
	});
</script>

<div
	class="flex flex-col h-full gap-2 p-4 border-r-4 w-72 bg-base-200 border-base-300 max-w-[90dvw]"
>
	<div class="flex flex-row items-center justify-between">
		<h1 class="text-xl font-bold">HISTORY</h1>

		<div class="tooltip tooltip-left" data-tip="Clear History">
			<button class="btn btn-square btn-error btn-outline btn-sm" on:click={clearHistory}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					class="bi bi-trash"
					viewBox="0 0 16 16"
				>
					<path
						d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
					/>
					<path
						fill-rule="evenodd"
						d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
					/>
				</svg>
			</button>
		</div>
	</div>
	<ul class="flex flex-col w-full gap-1 overflow-x-hidden overflow-y-auto">
		<!-- {#if !noProgress}
			{#each [...$predictionQueue].reverse() as prediction (prediction.id)}
				<Prediction {prediction} />
			{/each}
		{/if} -->

		{#each [...$predictionTaskQueue].reverse() as predictionTask (predictionTask.id)}
			<QueuedPredictionTask {predictionTask} />
		{/each}

		{#each [...$processingPredictionTasks].reverse() as predictionTask (predictionTask.id)}
			<ProcessingPredictionTaskcopy {predictionTask} />
		{/each}

		{#if results.length + $predictionTaskQueue.length + $processingPredictionTasks.length === 0}
			<p class="text-sm italic text-gray-400">No history.</p>
		{:else}
			{#each results as result}
				<ResultAsSiderbar {result} />
			{/each}
		{/if}
	</ul>
</div>
