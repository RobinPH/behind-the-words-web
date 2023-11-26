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
	<ul class="flex flex-col space-y-2 overflow-auto w-60">
		{#if results.length === 0}
			<p class="italic text-gray-400">No history.</p>
		{:else}
			{#each results as result}
				<li class="w-full">
					<label
						for="my-drawer-3"
						aria-label="close sidebar"
						class="block max-w-full px-4 py-2 truncate duration-150 rounded-md hover:bg-base-100 hover:cursor-pointer"
						on:click={() => {
							viewingResult.set(result);
							goto(`/result/${result.id}`);
						}}>{result.text.slice(0, 128)}</label
					>
					<!-- <a class="max-w-full truncate" href={`/result/${result.id}`}>{result.text.slice(0, 128)}</a> -->
				</li>
			{/each}
		{/if}
	</ul>
</div>
