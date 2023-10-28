<script lang="ts">
	import Card from '$lib/Card.svelte';

	type Props = {
		id: string;
		metadata: {
			sentence_scores: {
				sentence: string;
				scores: number[];
				average: number;
			}[];
		};
		result: {
			coherence_score: number;
		};
	};

	export let props: Props;
	export let description = 'Metaphor usage score';

	const score = Math.round(props.result.coherence_score * 100 * 100) / 100;

	const formatScore = (score: number) => Math.round(score * 100 * 100) / 100;
</script>

<Card>
	<div class="text-2xl flex gap-2 items-center justify-between">
		<h1 class="font-bold">Coherence Score</h1>
		<div class="underline">
			<span>{score}%</span>
		</div>
	</div>
	<p class="text-gray-400">{description}</p>
	<progress class="progress w-full" value={props.result.coherence_score} max={1} />

	<div class="flex flex-col gap-4 pt-4 max-h-96 overflow-y-auto">
		{#each props.metadata.sentence_scores as { sentence, scores, average }}
			<div class="bg-slate-600 p-4 rounded-lg">
				<div>
					<span class="font-semibold">Sentence: </span>
					<span class="text-gray-400">{sentence}</span>
				</div>
				<div>
					<span class="font-semibold min-w-fit">Coherence Score: </span>
					<span class="underline">{formatScore(average)}%</span>
				</div>
				<progress class="progress w-full" value={average} max={1} />
			</div>
		{/each}
	</div>
</Card>
