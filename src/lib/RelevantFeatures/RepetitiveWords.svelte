<script lang="ts">
	import Card from '$lib/Card.svelte';

	type RepetitiveWord = [string, number];

	type Props = {
		id: string;
		metadata: {
			repetitive_words: RepetitiveWord[];
			word_count: number;
		};
		result: {
			repetitive_words: number;
		};
	};

	export let props: Props;
	export let description =
		'Calculates the number of repeated words in a text. The percentage of duplicate words to the number of words in a text.';

	const repeats =
		props.metadata.word_frequency.reduce((acc, val) => acc + val[1], 0) -
		props.metadata.word_frequency.length;
</script>

<Card>
	<div class="flex items-center justify-between gap-2 text-2xl">
		<h1 class="font-bold">Repetitive Words</h1>
		<div class="underline min-w-fit">
			<span>{repeats}</span>
			<span> out of </span>
			<span>{props.metadata.word_count}</span>
		</div>
	</div>
	<p class="text-gray-400">{description}</p>
	<progress class="w-full progress" value={repeats} max={props.metadata.word_count} />
</Card>
