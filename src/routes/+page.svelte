<script lang="ts">
	import { browser } from '$app/environment';
	import Card from '$lib/Card.svelte';
	import FileUpload from '$lib/FileUpload.svelte';
	import Predict from '$lib/Predict.svelte';
	import CNNPrediction from '$lib/RelevantFeatures/CNNPrediction.svelte';
	import CoherenceScore from '$lib/RelevantFeatures/CoherenceScore.svelte';
	import FormalityScore from '$lib/RelevantFeatures/FormalityScore.svelte';
	import GrammarScore from '$lib/RelevantFeatures/GrammarScore.svelte';
	import LexicalDiversity from '$lib/RelevantFeatures/LexicalDiversity.svelte';
	import MetaphorUsage from '$lib/RelevantFeatures/MetaphorUsage.svelte';
	import MisspelledWords from '$lib/RelevantFeatures/MisspelledWords.svelte';
	import ReadabilityScore from '$lib/RelevantFeatures/ReadabilityScore.svelte';
	import RepetitiveWords from '$lib/RelevantFeatures/RepetitiveWords.svelte';
	import Sentiment from '$lib/RelevantFeatures/Sentiment.svelte';
	import Subjectivity from '$lib/RelevantFeatures/Subjectivity.svelte';
	import TextareaInput from '$lib/TextareaInput.svelte';

	let text =
		'In conclusion, blockchain technology represents a paradigm shift in how we manage data, conduct transactions, and establish trust. Its decentralized and transparent nature has the potential to disrupt various industries, unlocking new possibilities and efficiencies. As the technology continues to evolve, addressing challenges and adapting to regulatory changes will be crucial in realizing the full potential of blockchain and ushering in a new era of trust and transparency in the digital age. The journey of blockchain is not only a technological evolution but a transformative force shaping the future of our interconnected world.';

	let result: any;
	let includeCNN: boolean;

	// onMount(() => {
	// 	predict(text).then((res) => {
	// 		result = res;
	// 	});
	// });

	$: finalResult = (() => {
		const finalResult = {};

		if (result)
			for (const r of result.results) {
				// @ts-ignore
				finalResult[r.id] = r;
			}

		return finalResult;
	})();

	$: probability = result ? Math.round(result.probability * 100 * 100) / 100 : 0;

	const getLocalStorageItem = (key: string, defaultValue: any = undefined) => {
		if (!browser) {
			return defaultValue;
		}

		if (typeof localStorage == undefined) {
			return defaultValue;
		}

		return localStorage.getItem(key);
	};

	const setLocalStorageItem = (key: string, value: string) => {
		if (!browser) {
			return;
		}

		if (typeof localStorage == undefined) {
			return;
		}

		return localStorage.setItem(key, value);
	};

	let error: any;
	let baseUrl = getLocalStorageItem('backend-url', 'http://127.0.0.1:6060');

	$: if (baseUrl != undefined) setLocalStorageItem('backend-url', baseUrl);
</script>

<div class="flex flex-col w-full h-full gap-4 p-4 pt-4 md:pt-8 md:p-16 md:gap-8">
	<h1 class="text-2xl font-bold sm:text-4xl text-info">Behind the Words</h1>
	<TextareaInput bind:text />
	<div class="flex items-center justify-between w-full gap-2">
		<FileUpload bind:text bind:baseUrl />
		<Predict bind:text bind:result bind:includeCNN bind:baseUrl bind:error />
	</div>
	{#if error}
		<div class="alert alert-error">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="w-6 h-6 stroke-current shrink-0"
				fill="none"
				viewBox="0 0 24 24"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
				/></svg
			>
			<span>Error: {error}</span>
		</div>
	{/if}
	{#if result}
		<Card>
			<div class="flex justify-between w-full gap-2">
				<div class="flex flex-col gap-2">
					{#if result.probability < 0.5}
						<div class="text-4xl font-bold">Human 🧑</div>
						<div>
							Your essay is likely written by <span class="text-lg"><strong>Human</strong></span>
						</div>
					{:else}
						<div class="text-4xl font-bold">LLM 🤖</div>
						<div>
							Your essay is likely written by <span class="text-lg"
								><strong>Large Language Model (LLM)</strong></span
							>
						</div>
					{/if}
				</div>
				<div class="flex flex-col items-center gap-2 p-4 rounded-lg bg-slate-600">
					<div
						class="radial-progress"
						style={`--value: ${probability}; --size: 6rem; --thickness: 1rem;`}
					>
						{probability}%
					</div>
					<div class="font-semibold text-gray-300">LLM-meter</div>
				</div>
			</div>
		</Card>
		{#if finalResult.cnn_prediction} <CNNPrediction props={finalResult.cnn_prediction} /> {/if}
		{#if finalResult.mispelled_words} <MisspelledWords props={finalResult.mispelled_words} /> {/if}
		{#if finalResult.grammar_score} <GrammarScore props={finalResult.grammar_score} /> {/if}
		{#if finalResult.repetitive_words}
			<RepetitiveWords props={finalResult.repetitive_words} />
		{/if}
		{#if finalResult.coherence_score} <CoherenceScore props={finalResult.coherence_score} /> {/if}
		{#if finalResult.formality_score} <FormalityScore props={finalResult.formality_score} /> {/if}
		{#if finalResult.readability_score}
			<ReadabilityScore props={finalResult.readability_score} />
		{/if}
		{#if finalResult.metaphor_usage_score}
			<MetaphorUsage props={finalResult.metaphor_usage_score} />
		{/if}
		{#if finalResult.lexical_diversity}
			<LexicalDiversity props={finalResult.lexical_diversity} />
		{/if}
		{#if finalResult.sentiment} <Sentiment props={finalResult.sentiment} /> {/if}
		{#if finalResult.subjectivity} <Subjectivity props={finalResult.subjectivity} /> {/if}
	{/if}
</div>
