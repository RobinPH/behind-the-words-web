<script lang="ts">
	import Card from '$lib/Card.svelte';

	type Props = {
		id: string;
		result: {
			lexical_diversity: {
				ttr: number;
				rttr: number;
				cttr: number;
				mtld: number;
				herdan: number;
				summer: number;
				maas: number;
				yulek: number;
				herdanvm: number;
				simpsond: number;
			};
		};
	};

	const lexicalDiversityMetadata = {
		ttr: {
			label: 'Type-token ratio',
			description:
				'Type-token ratio (TTR) computed as t/w, where t is the number of unique terms/vocab, and w is the total number of words. (Chotlos 1944, Templin 1957)',
			min: 0,
			max: 1
		},
		rttr: {
			label: 'Root TTR',
			description:
				'Root TTR (RTTR) computed as t/sqrt(w), where t is the number of unique terms/vocab, and w is the total number of words. Also known as Guiraud’s R and Guiraud’s index. (Guiraud 1954, 1960)',
			min: 0,
			max: 14.552558898925781
		},
		cttr: {
			label: 'Corrected TTR',
			description:
				'Corrected TTR (CTTR) computed as t/sqrt(2 * w), where t is the number of unique terms/vocab, and w is the total number of words. (Carrol 1964)',
			min: 0,
			max: 10.290212631225586
		},
		mtld: {
			label: 'Measure of Textual Lexical Diversity',
			description:
				'Measure of textual lexical diversity, computed as the mean length of sequential words in a text that maintains a minimum threshold TTR score.',
			min: 0,
			max: 153.0268879699706
		},
		herdan: {
			label: 'Herdan',
			description:
				'Computed as log(t)/log(w), where t is the number of unique terms/vocab, and w is the total number of words. Also known as Herdan’s C. (Herdan 1960, 1964)',
			min: 0,
			max: 1
		},
		summer: {
			label: 'Summer',
			description:
				'Computed as log(log(t)) / log(log(w)), where t is the number of unique terms/vocab, and w is the total number of words. (Summer 1966)',
			min: -0.27540138,
			max: 1
		},
		maas: {
			label: "Maas' TTR",
			description:
				'Maas’ TTR, computed as (log(w) - log(t)) / (log(w) * log(w)), where t is the number of unique terms/vocab, and w is the total number of words. Unlike the other measures, lower maas measure indicates higher lexical richness. (Maas 1972)',
			min: 0,
			max: 0.033837616667151384
		},
		yulek: {
			label: 'Yule’s K',
			description: 'Yule’s K (Yule 1944, Tweedie and Baayen 1998).',
			min: 0,
			max: 277.73786041259757
		},
		herdanvm: {
			label: 'Herdan’s Vm',
			description: 'Herdan’s Vm (Herdan 1955, Tweedie and Baayen 1998)',
			min: 0,
			max: 0.14314068108797073
		},
		simpsond: {
			label: 'Simpson’s D',
			description: 'Simpson’s D (Simpson 1949, Tweedie and Baayen 1998)',
			min: 0,
			max: 0.028232975639402844
		}
	};

	export let props: Props;
	export let description = 'Measures the variety and richness of vocabulary in the text.';

	const formatScore = (score: number) => Math.round(score * 100) / 100;
</script>

<Card>
	<div class="flex items-center justify-between gap-2 text-2xl">
		<h1 class="font-bold">Lexical Diversity</h1>
	</div>
	<p class="text-gray-400">{description}</p>
	<!-- <div class="flex justify-center w-full">
		{formalityEquation}
	</div> -->
	<div class="flex flex-col gap-4 pt-4">
		{#each Object.keys(lexicalDiversityMetadata) as key}
			<div class="p-4 rounded-lg bg-slate-600">
				<div class="flex justify-between">
					<h1 class="font-semibold">{lexicalDiversityMetadata[key].label}</h1>
					<div class="underline">
						<span>{formatScore(props.result.lexical_diversity[key])}</span>
					</div>
				</div>
				<p class="text-gray-400">{lexicalDiversityMetadata[key].description}</p>
				<progress
					class="w-full progress"
					value={props.result.lexical_diversity[key]}
					max={lexicalDiversityMetadata[key].max}
				/>
			</div>
		{/each}
	</div>
</Card>
