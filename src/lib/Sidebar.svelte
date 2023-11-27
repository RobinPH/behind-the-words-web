<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { updateUserResults, userResults, viewingResult } from '../stores/store';

	let results: any[] = [];

	userResults.subscribe((res) => {
		results = res;
	});

	onMount(() => {
		updateUserResults();
	});
</script>

<div class="flex flex-col h-full gap-2 p-4 border-r-4 bg-base-200 border-base-300">
	<h1 class="text-xl font-bold">HISTORY</h1>
	<ul class="flex flex-col overflow-x-hidden overflow-y-auto w-60">
		{#if results.length === 0}
			<p class="text-sm italic text-gray-400">No history.</p>
		{:else}
			{#each results as result}
				<li class="w-full">
					<label
						for="my-drawer-3"
						aria-label="close sidebar"
						class="block max-w-full px-4 py-2 text-sm truncate duration-150 rounded-md hover:bg-base-100 hover:cursor-pointer hover:translate-x-1"
						on:click={() => {
							viewingResult.set(result);
							goto(`/result/${result.id}`);
						}}
					>
						{#if result.text.length > 0}
							<p>
								{result.text.slice(0, 128)}
							</p>
							{#if result.filename}
								<p class="text-xs italic text-gray-400">
									{result.filename}
								</p>
							{/if}
						{:else}
							<p class="text-sm italic text-gray-400">No Title.</p>
						{/if}
					</label>
					<!-- <a class="max-w-full truncate" href={`/result/${result.id}`}>{result.text.slice(0, 128)}</a> -->
				</li>
			{/each}
		{/if}
	</ul>
</div>
