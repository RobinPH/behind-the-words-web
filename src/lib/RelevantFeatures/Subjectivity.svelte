<script lang="ts">
	import Card from '$lib/Card.svelte';

	type Props = {
		id: string;
		result: {
			subjectivity: number;
		};
	};

	export let props: Props;
	export let description =
		"Measures the degree of subjectivity in the text, reflecting the extent to which the author's opinions or feelings influence the content, it uses the TextBlob Python library for sentiment analysis. The subjectivity score is computed through the TextBlob library.";

	const score = Math.round(props.result.subjectivity * 100 * 100) / 100;
</script>

<Card>
	<div class="flex items-center justify-between gap-2 text-2xl">
		<h1 class="font-bold">Subjectivity</h1>
		<div class="underline min-w-fit">
			<span>{score}%</span>
		</div>
	</div>
	<p class="text-gray-400">{description}</p>
	<progress class="w-full progress" value={props.result.subjectivity} max={1} />
</Card>
