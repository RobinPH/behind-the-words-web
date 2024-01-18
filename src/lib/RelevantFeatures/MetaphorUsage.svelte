<script lang="ts">
	import Card from '$lib/Card.svelte';

	type Props = {
		id: string;
		metadata: {
			scores: {
				sentence: string;
				score: number;
			}[];
		};
		result: {
			metaphor_usage: number;
		};
	};

	export let props: Props;
	export let description =
		'The metaphor usage score for each sentence and calcuate the average, the methodology is based on the principles outlined in the study conducted by Gao, E. Choi, et.al (2018).';

	const score = Math.round(props.results.metaphor_usage * 100 * 100) / 100;

	const formatScore = (score: number) => Math.round(score * 100 * 100) / 100;
</script>

<Card>
	<div class="flex items-center justify-between gap-2 text-2xl">
		<h1 class="font-bold">Metaphor Usage Score</h1>
		<div class="underline min-w-fit">
			<span>{score}%</span>
		</div>
	</div>
	<p class="text-gray-400">{description}</p>
	<progress class="w-full progress" value={props.results.metaphor_usage} max={1} />

	<div class="flex flex-col gap-4 pt-4 overflow-y-auto max-h-96">
		{#each props.metadata.scores as { sentence, score }}
			<div class="p-4 rounded-lg bg-slate-600">
				<div>
					<span class="font-semibold">Sentence: </span>
					<span class="text-gray-400">{sentence}</span>
				</div>
				<div>
					<span class="font-semibold min-w-fit">Metaphor Usage Score: </span>
					<span class="underline">{formatScore(score)}%</span>
				</div>
				<progress class="w-full progress" value={score} max={1} />
			</div>
		{/each}
	</div>
</Card>
