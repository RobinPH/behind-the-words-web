<script lang="ts">
	import Card from '$lib/Card.svelte';

	type RepetitiveWord = [string, number];

	type Props = {
		id: string;
		metadata: {
			repetitive_words: RepetitiveWord[];
			_word_count: number;
		};
		result: {
			repetitive_words: number;
		};
	};

	export let props: Props;
	export let description =
		'Assessing the number of repetition or frequency of repeated words in a particular text.';

	const repeats =
		props.metadata.repetitive_words.reduce((acc, val) => acc + val[1], 0) -
		props.metadata.repetitive_words.length;
</script>

<Card>
	<div class="text-2xl flex gap-2 items-center justify-between">
		<h1 class="font-bold">Repetitive Words</h1>
		<div class="underline">
			<span>{repeats}</span>
			<span> out of </span>
			<span>{props.metadata._word_count}</span>
		</div>
	</div>
	<p class="text-gray-400">{description}</p>
	<progress class="progress w-full" value={repeats} max={props.metadata._word_count} />
</Card>
