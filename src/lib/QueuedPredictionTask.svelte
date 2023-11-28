<script lang="ts">
	import type { PredictionTask } from '../types/types';
	import { truncate } from '../utils';

	export let predictionTask: PredictionTask;
</script>

<div
	aria-label="close sidebar"
	class="block max-w-full text-sm duration-150 border-2 border-gray-400 rounded-md"
>
	<div class="mx-4 my-2">
		<div class="truncate">
			{#if predictionTask.type === 'text'}
				{truncate(predictionTask.input.text, 128)}
			{:else}
				{predictionTask.input.filename}
			{/if}
		</div>
		<div class="flex justify-between">
			<p class="w-full text-xs italic text-gray-400 truncate">Queued</p>
		</div>
	</div>
</div>
