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
		"Measures the degree of subjectivity in the text, indicating the extent to which the author's opinions or feelings influence the content.";

	const score = Math.round(props.result.subjectivity * 100 * 100) / 100;
</script>

<Card>
	<div class="text-2xl flex gap-2 items-center justify-between">
		<h1 class="font-bold">Subjectivity</h1>
		<div class="underline">
			<span>{score}%</span>
		</div>
	</div>
	<p class="text-gray-400">{description}</p>
	<progress class="progress w-full" value={props.result.subjectivity} max={1} />
</Card>
