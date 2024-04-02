<script lang="ts">
	import type { PredictionTask } from '../types/types';
	import { truncate } from '../utils';

	export let predictionTask: PredictionTask;
</script>

<div
	aria-label="close sidebar"
	class="block max-w-full text-sm duration-150 border-2 rounded-md border-info"
>
	<div class="mx-4 my-2">
		<div class="flex gap-1 align-middle">
			<span class="loading loading-spinner loading-xs" />
			<div class="truncate">
				{#if predictionTask.type === 'text'}
					{truncate(predictionTask.input.text, 128)}
				{:else}
					{predictionTask.input.filename}
				{/if}
			</div>
		</div>
		<div class="flex justify-between">
			<p class="w-full text-xs italic text-gray-400 truncate">
				{#if predictionTask.partialResult}
					{#if predictionTask.partialResult.process.type == 'booting'}
						<span>{predictionTask.partialResult.process.label}</span>
						[{predictionTask.partialResult.service}]
					{:else if predictionTask.partialResult.process.type == 'processing'}
						<span>{predictionTask.partialResult.process.label}</span>
						({predictionTask.partialResult.current_task_index + 1}/{predictionTask.partialResult
							.total_tasks}) {predictionTask.partialResult.current_task}
					{:else}
						<span>Loading...</span>
					{/if}
				{:else}
					<span>Loading...</span>
				{/if}
			</p>
		</div>
	</div>
</div>
