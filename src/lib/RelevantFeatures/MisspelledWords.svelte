<script lang="ts">
	import Card from '$lib/Card.svelte';

	type MispelledWord = {
		text: string;
		suggestion: string;
		offset: number;
	};

	type Props = {
		id: string;
		metadata: {
			word_count: number;
		};
		result: {
			misspelled_words: number;
		};
	};

	export let props: Props;
	export let description =
		'Identifies words that are misspelled. The percentage of misspelled words to number of words in a text.';
</script>

<Card>
	<div class="flex items-center justify-between gap-2 text-2xl">
		<h1 class="font-bold">Misspelled Words</h1>
		<div class="underline min-w-fit">
			<span>{Math.round(props.result.misspelled_words * props.metadata.word_count)}</span>
			<span> out of </span>
			<span>{props.metadata.word_count}</span>
		</div>
	</div>
	<p class="text-gray-400">{description}</p>
	<progress
		class="w-full progress"
		value={props.result.misspelled_words}
		max={props.metadata.word_count}
	/>
</Card>
