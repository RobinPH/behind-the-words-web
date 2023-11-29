<script lang="ts">
	import { goto } from '$app/navigation';
	import cx from 'classnames';
	import { setViewingResultId, viewingResult } from '../stores/store';
	import { closeSidebar } from '../utils/sidebar';

	export let result: any;

	$: probability = result ? Math.round(result.result.probability * 100 * 10) / 10 : 0;
	$: icon = probability < 50 ? '🧑' : '🤖';
</script>

<div
	aria-label="close sidebar"
	class={cx(
		'block max-w-full text-sm duration-150 border-2 border-transparent rounded-md hover:bg-base-100 hover:cursor-pointer hover:translate-x-1',
		result._new && '!border-success',
		$viewingResult && $viewingResult.id === result.id && '!border-info'
	)}
	on:click={() => {
		closeSidebar();
		setViewingResultId(result.id);
		goto(`/result/${result.id}`);
	}}
>
	<div class="flex gap-1 mx-4 my-2">
		<div class="flex flex-col w-full truncate">
			<div class="flex">
				<span>{icon}</span>
				{#if result.text.length === 0}
					<p class="italic text-gray-400 truncate">No preview.</p>
				{:else}
					<p class="truncate">{result.text.slice(0, 128)}</p>
				{/if}
			</div>
			<p class="w-full text-xs italic text-gray-400">
				{#if result.filename}
					{result.filename}
				{/if}
			</p>
		</div>
		<div class="flex items-center justify-center min-w-fit">
			<p class="text-xl font-bold text-right min-w-fit">
				{probability}%
			</p>
		</div>
	</div>
</div>
