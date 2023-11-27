<script lang="ts">
	import { goto } from '$app/navigation';
	import cx from 'classnames';
	import { userResults, viewingResult } from '../stores/store';
	import { closeSidebar } from '../utils/sidebar';
	import { getResult } from './BackendUtils';

	export let result: any;

	$: probability = result ? Math.round(result.result.probability * 100 * 100) / 100 : 0;
	$: icon = probability < 50 ? '🧑' : '🤖';
</script>

<div
	aria-label="close sidebar"
	class={cx(
		'block max-w-full text-sm duration-150 border-2 border-transparent rounded-md hover:bg-base-100 hover:cursor-pointer hover:translate-x-1',
		result._new && '!border-success'
	)}
	on:click={() => {
		closeSidebar();
		getResult(result.id).then(viewingResult.set);
		// viewingResult.set(result);
		goto(`/result/${result.id}`);

		userResults.update((results) => {
			return results.map((res) => {
				if (res === result) {
					delete result._new;
				}

				return res;
			});
		});
	}}
>
	<div class="mx-4 my-2">
		{#if result.text.length > 0}
			<div class="flex justify-between gap-2">
				<div class="truncate">
					{result.text.slice(0, 128)}
				</div>
				<p class="text-xs font-bold text-right min-w-fit">
					{probability}%
				</p>
			</div>
			<div class="flex justify-between">
				<p class="w-full text-xs italic text-gray-400">
					{#if result.filename}
						{result.filename}
					{/if}
				</p>
				<p class="text-xs font-bold text-right min-w-fit">
					{icon}
				</p>
			</div>
		{:else}
			<p class="text-sm italic text-gray-400">No Title.</p>
		{/if}
	</div>
</div>
