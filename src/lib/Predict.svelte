<script lang="ts">
	import { v4 as uuidv4 } from 'uuid';
	import { queuePredictionTasks, setViewingResultId, viewingResult } from '../stores/store';
	export let text: string;
	export let includeCNN = true;
	export let baseUrl: string = 'http://127.0.0.1:6060';
	export let error: any;

	let isLoading = false;
</script>

<div class="flex flex-row items-end gap-2 sm:items-center">
	<div class="items-end justify-center form-control">
		<label class="flex justify-end gap-2 cursor-pointer items label w-fit">
			<span class="label-text">Include CNN</span>
			<input type="checkbox" bind:checked={includeCNN} class="checkbox checkbox-info checkbox-sm" />
		</label>
		<!-- <label class="flex justify-end gap-2 cursor-pointer label">
			<span class="label-text">Backend URL</span>
			<input
				type="url"
				placeholder="Enter URL"
				class="w-72 input input-bordered input-xs"
				bind:value={baseUrl}
			/>
		</label> -->
	</div>
	<button
		class="btn btn-info"
		disabled={isLoading}
		on:click={async () => {
			if (text.length > 0) {
				isLoading = true;
				viewingResult.set(null);
				document.getElementById('my-drawer-3').checked = true;
				queuePredictionTasks({
					id: uuidv4(),
					type: 'text',
					input: {
						text
					},
					includeCNN,
					callback: (result) => {
						// resultId = result.id;

						setViewingResultId(result.id);
						isLoading = false;
					}
				});
			}
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
