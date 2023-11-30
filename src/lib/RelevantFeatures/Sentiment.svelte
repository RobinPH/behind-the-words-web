<script lang="ts">
	import Card from '$lib/Card.svelte';

	type Props = {
		id: string;
		result: {
			sentiment: number;
		};
	};

	export let props: Props;
	export let description =
		'Determines the overall sentiment or emotion expressed in the text, whether it be positive, negative, or neutral, the implementation uses the TextBlob Python library for sentiment analysis. The sentiment of the text is computed through the TextBlob library.';

	const score = Math.round(props.result.sentiment * 100) / 100;
</script>

<Card>
	<div class="flex items-center justify-between gap-2 text-2xl">
		<h1 class="font-bold">Sentiment</h1>
		<div class="underline min-w-fit">
			<span>{score}</span>
		</div>
	</div>
	<p class="text-gray-400">{description}</p>
	<progress class="w-full progress" value={props.result.sentiment + 1} max={2} />
</Card>
