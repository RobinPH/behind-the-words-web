<script lang="ts">
	import Card from '$lib/Card.svelte';

	type Props = {
		id: string;
		result: {
			sentiment: {
				polarity: number;
				subjectivity: number;
			};
		};
	};

	const sentimentMetadata = {
		polarity: {
			label: 'Polarity',
			description:
				'Determines the overall sentiment or emotion expressed in the text, whether it be positive, negative, or neutral, the implementation uses the TextBlob Python library for sentiment analysis. The sentiment of the text is computed through the TextBlob library.',
			min: -1,
			max: 1
		},
		subjectivity: {
			label: 'Subjectivity',
			description: `Measures the degree of subjectivity in the text, reflecting the extent to which the author's opinions or feelings influence the content, it uses the TextBlob Python library for sentiment analysis. The subjectivity score is computed through the TextBlob library.`,
			min: 0,
			max: 1
		}
	};

	export let props: Props;
	export let description =
		'Determines the overall sentiment or emotion expressed in the text, whether it be positive, negative, or neutral, the implementation uses the TextBlob Python library for sentiment analysis. The sentiment of the text is computed through the TextBlob library.';

	const formatScore = (score: number) => Math.round(score * 100) / 100;
</script>

<Card>
	<div class="flex items-center justify-between gap-2 text-2xl">
		<h1 class="font-bold">Sentiment</h1>
	</div>
	<p class="text-gray-400">{description}</p>
	<div class="flex flex-col gap-4 pt-4">
		{#each Object.keys(sentimentMetadata) as key}
			<div class="p-4 rounded-lg bg-slate-600">
				<div class="flex justify-between">
					<h1 class="font-semibold">{sentimentMetadata[key].label}</h1>
					<div class="underline">
						<span>{formatScore(props.result.sentiment[key])}</span>
					</div>
				</div>
				<p class="text-gray-400">{sentimentMetadata[key].description}</p>
				<progress
					class="w-full progress"
					value={props.result.sentiment[key] + -sentimentMetadata[key].min}
					max={sentimentMetadata[key].max + -sentimentMetadata[key].min}
				/>
			</div>
		{/each}
	</div>
</Card>
