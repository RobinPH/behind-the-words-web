<script lang="ts">
	import Card from '$lib/Card.svelte';

	type Props = {
		id: string;
		metadata: {};
		result: {
			coherence_score: number;
		};
	};

	export let props: Props;
	export let description =
		'The overall coherence and logical flow of the text are measured, revealing how effectively the concepts and words are linked.  Uses SentenceTransformer (all-MiniLM-L6-v2) to get the embedding of each sentence and then computes average cosine similarity of each sentence against all sentences of an essay.';

	const score = Math.round(props.results.coherence_score * 100 * 100) / 100;

	const formatScore = (score: number) => Math.round(score * 100 * 100) / 100;
</script>

<Card>
	<div class="flex items-center justify-between gap-2 text-2xl">
		<h1 class="font-bold">Coherence Score</h1>
		<div class="underline min-w-fit">
			<span>{score}%</span>
		</div>
	</div>
	<p class="text-gray-400">{description}</p>
	<progress class="w-full progress" value={props.results.coherence_score} max={1} />
</Card>
