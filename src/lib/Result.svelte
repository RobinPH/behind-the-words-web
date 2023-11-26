<script lang="ts">
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
	import Card from './Card.svelte';

	export let result: any;

	$: finalResult = (() => {
		const finalResult = {};

		if (result && result.result)
			for (const r of result.result.results) {
				// @ts-ignore
				finalResult[r.id] = r;
			}

		return finalResult;
	})();

	$: probability = result ? Math.round(result.result.probability * 100 * 100) / 100 : 0;
</script>

{#if result}
	<Card>
		<div class="text-4xl font-bold">Model</div>
		<div>
			{result.model}
		</div>
	</Card>
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
