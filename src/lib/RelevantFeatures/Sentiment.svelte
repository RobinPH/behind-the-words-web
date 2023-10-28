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
		'Determines the overall sentiment or emotion expressed in the text (e.g., positive, negative, neutral).';

	const score = Math.round(props.result.sentiment * 100) / 100;
</script>

<Card>
	<div class="text-2xl flex gap-2 items-center justify-between">
		<h1 class="font-bold">Sentiment</h1>
		<div class="underline">
			<span>{score}</span>
		</div>
	</div>
	<p class="text-gray-400">{description}</p>
	<progress class="progress w-full" value={props.result.sentiment + 1} max={2} />
</Card>
