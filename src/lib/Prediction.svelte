<script lang="ts">
	import cx from 'classnames';
	import { nextInQueue, predictionResultId, processingQueue, userResults } from '../stores/store';
	import { predict, predictFromFile } from './BackendUtils';

	export let prediction: {
		id: string;
		type: 'text' | 'file';
		input: any;
		includeCNN: boolean;
		callback: (res: any) => {};
	};
	export let forceStart = false;
	export let store = false;

	let isLoading = true;
	let isCompleted = false;
	export let result = null;
	let error;
	let partialResult;

	$: if ((!prediction.isProcessing && $processingQueue === prediction.id) || forceStart) {
		let promise;

		if (prediction.type === 'text') {
			promise = predict(prediction.input.text, prediction.includeCNN, (data) => {
				partialResult = data;
			});
		} else if (prediction.type === 'file') {
			promise = predictFromFile(prediction.input.file, prediction.includeCNN, (data) => {
				partialResult = data;
			});
		}

		if (promise) {
			prediction.isProcessing = true;
			promise
				.then((res) => {
					result = res;

					prediction.callback?.(result);

					if (store) {
						predictionResultId.set(res.id);
					}

					userResults.set([result, ...$userResults]);

					isCompleted = true;
					// updateUserResults();

					// if ($predictionQueue.length === 1) {
					// 	redirectToResultPage();
					// }
				})
				.catch((e) => {
					error = e;
				})
				.finally(() => {
					isLoading = false;
					nextInQueue();
				});
		}
	}

	const redirectToResultPage = (newTab = false) => {
		if (result) {
			const a = document.createElement('a');
			a.href = `/result/${result.id}`;
			if (newTab) {
				a.target = '_blank';
			}
			a.click();
		}
	};

	const truncate = (text: string, maxLength = 100) => {
		if (text.length > maxLength) {
			return text.slice(0, maxLength) + '...';
		}

		return text;
	};

	$: probability = result ? Math.round(result.result.probability * 100 * 100) / 100 : 0;
	$: label = probability < 50 ? 'Human 🧑' : 'LLM 🤖';
</script>

{#if !(isCompleted && result)}
	<div
		aria-label="close sidebar"
		class={cx(
			'block max-w-full border-2 text-sm duration-150 rounded-md',
			!prediction.isProcessing && 'border-gray-400',
			prediction.isProcessing && 'border-info',
			isCompleted && 'border-success hover:cursor-pointer hover:translate-x-1 duration-150'
		)}
		on:click={() => {
			// closeSidebar();
			// viewingResult.set(result);
			// goto(`/result/${result.id}`);
		}}
	>
		<div class="mx-4 my-2">
			<div class="truncate">
				{#if prediction.type === 'text'}
					{truncate(prediction.input.text, 128)}
				{:else}
					{prediction.input.filename}
				{/if}
			</div>
			<div class="flex justify-between">
				<p class="w-full text-xs italic text-gray-400 truncate">
					{#if isCompleted}
						{#if result}
							Result: <span class="text-lg">{label}</span>
						{:else}
							Completed
						{/if}
					{:else if prediction.isProcessing}
						<span>Processing</span>
						{#if partialResult}
							({partialResult.current_task_index + 1}/{partialResult.total_tasks}) {partialResult.current_task}
						{/if}
					{:else if !prediction.isProcessing}
						Queued
					{/if}
				</p>
				<!-- <p class="w-full text-xs font-bold text-right">
        {probability}%
      </p> -->
			</div>
		</div>
	</div>
{/if}

<!-- <div
	class={cx(
		'max-w-full text-sm duration-150 rounded-md hover:bg-base-100 hover:cursor-pointer hover:translate-x-1',
		!prediction.isProcessing && 'border-gray-400',
		prediction.isProcessing && 'border-info',
		isCompleted && 'border-success hover:cursor-pointer hover:translate-x-1 duration-150'
	)}
	on:click={() => {
		redirectToResultPage(true);
	}}
>
	<div class="flex flex-row items-center gap-4 px-6 py-4">
		{#if prediction.isProcessing && !isCompleted}
			<div class="loading loading-bars loading-lg" />
		{/if}
		<div class="w-full">
			<p class="w-full text-sm font-bold truncate">
				{#if isCompleted}
					{#if result}
						Result: <span class="text-lg">{label}</span>
					{:else}
						Completed
					{/if}
				{:else if prediction.isProcessing}
					<span>Processing</span>
					{#if partialResult}
						{partialResult.current_task}
						({partialResult.current_task_index + 1}/{partialResult.total_tasks})
					{/if}
				{:else if !prediction.isProcessing}
					Queued
				{/if}
			</p>
			<p class={cx(!prediction.isProcessing && 'border-gray-400 italic text-gray-400')}>
				{#if prediction.type === 'text'}
					{truncate(prediction.input.text, 128)}
				{:else}
					{prediction.input.filename}
				{/if}
			</p>
		</div>
		{#if result}
			<div class="flex flex-row gap-2 min-w-fit">
				<div class="text-xs font-bold text-gray-400 min-w-fit">LLM-meter</div>
				<div class="text-4xl font-bold">
					{probability}%
				</div>
			</div>
		{/if}
	</div>
</div> -->
