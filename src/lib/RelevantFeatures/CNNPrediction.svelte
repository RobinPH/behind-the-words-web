<script lang="ts">
	import Card from '$lib/Card.svelte';

	type Props = {
		id: string;
		result: {
			cnn_prediction: number;
		};
	};

	export let props: Props;
	export let description = 'LLM Prediction using CNN';

	const score = Math.round(props.results.cnn_prediction * 100 * 100) / 100;
</script>

<Card>
	<div class="flex items-center justify-between gap-2 text-2xl">
		<h1 class="font-bold">CNN Prediction</h1>
		<div class="underline">
			<span>{score}%</span>
		</div>
	</div>
	<p class="text-gray-400">{description}</p>
	<progress class="w-full progress" value={props.results.cnn_prediction} max={1} />
</Card>
