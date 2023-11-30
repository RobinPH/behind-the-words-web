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
			mispelled_words: MispelledWord[];
		};
		result: {
			mispelled_words: number;
			_word_count: number;
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
			<span>{props.metadata.mispelled_words.length}</span>
			<span> out of </span>
			<span>{props.result._word_count}</span>
		</div>
	</div>
	<p class="text-gray-400">{description}</p>
	<progress
		class="w-full progress"
		value={props.metadata.mispelled_words.length}
		max={props.result._word_count}
	/>
</Card>
