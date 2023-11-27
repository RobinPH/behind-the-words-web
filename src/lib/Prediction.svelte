<script lang="ts">
	import cx from 'classnames';
	import {
		nextInQueue,
		predictionQueue,
		processingQueue,
		updateUserResults
	} from '../stores/store';
	import { predict, predictFromFile } from './BackendUtils';

	export let prediction: { id: string; type: 'text' | 'file'; input: any; includeCNN: boolean };
	let isLoading = true;
	let isCompleted = false;
	let result;
	let error;
	let partialResult;

	$: if (!prediction.isProcessing && $processingQueue === prediction.id) {
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
					// console.log({ res });
					result = res;
					isCompleted = true;
					updateUserResults();

					if ($predictionQueue.length === 1) {
						redirectToResultPage();
					}
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

<div
	class={cx(
		'max-w-full border-2 shadow-xl card bg-base-100',
		!prediction.isProcessing && 'border-gray-400',
		prediction.isProcessing && 'border-info',
		isCompleted && 'border-success hover:cursor-pointer'
	)}
	on:click={() => {
		redirectToResultPage(true);
	}}
>
	<div class="flex flex-row items-center gap-4 px-6 py-4">
		{#if prediction.isProcessing && !isCompleted}
			<div class="loading loading-bars loading-lg" />
		{/if}
		<div>
			<p class="w-full text-sm font-bold truncate">
				{#if isCompleted}
					{#if result}
						{label} ({probability}%)
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
	</div>
</div>
