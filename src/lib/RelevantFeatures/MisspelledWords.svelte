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
		'Identifies words that are misspelled. Average of the number of misspelled words in an essay.';
</script>

<Card>
	<div class="text-2xl flex gap-2 items-center justify-between">
		<h1 class="font-bold">Misspelled Words</h1>
		<div class="underline">
			<span>{props.metadata.mispelled_words.length}</span>
			<span> out of </span>
			<span>{props.result._word_count}</span>
		</div>
	</div>
	<p class="text-gray-400">{description}</p>
	<progress
		class="progress w-full"
		value={props.metadata.mispelled_words.length}
		max={props.result._word_count}
	/>
</Card>
