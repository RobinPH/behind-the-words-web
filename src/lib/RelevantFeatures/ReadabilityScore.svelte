<script lang="ts">
	import Card from '$lib/Card.svelte';

	type Props = {
		id: string;
		result: {
			readability_score: {
				flesch_reading_ease: number;
				flesch_kincaid_grade: number;
				smog_index: number;
				coleman_liau_index: number;
				automated_readability_index: number;
				dale_chall_readability_score: number;
				difficult_words: number;
				linsear_write_formula: number;
				gunning_fog: number;
			};
		};
	};

	const readabilityScoreMetadata = {
		flesch_reading_ease: {
			label: 'Flesch Reading Ease',
			description:
				'Flesch Reading Ease formula is a numerical representation of how easy or difficult a piece of text is to read.',
			min: 0,
			max: 121.22
		},
		flesch_kincaid_grade: {
			label: 'Flesch-Kincaid Grade',
			description:
				'Flesch-Kincaid Grade Level is a readability test designed to indicate the comprehension difficulty of a written passage in English. It gives a numerical score that corresponds to a U.S. school grade level. ',
			min: -3.4,
			max: 19
		},
		smog_index: {
			label: 'SMOG Index',
			description:
				'Simple Measure of Gobbledygook (SMOG) Index is a readability formula used to estimate the educational content understanding required for a piece of writing. The SMOG formula is designed to analyze the complexity of English texts',
			min: 4.1721,
			max: 18
		},
		coleman_liau_index: {
			label: 'Coleman Liau Index',
			description:
				'Coleman–Liau index is a readability test designed to gauge the understandability of English texts. It produces a numerical score that corresponds to a U.S. school grade level. ',
			min: 0,
			max: 19.5
		},
		automated_readability_index: {
			label: 'Automated Readability Index',
			description:
				'Automated Readability Index (ARI) is a readability test for English texts, designed to gauge the understandability of a text.',
			min: -17.22,
			max: 22
		},
		dale_chall_readability_score: {
			label: 'Dale Chall Readability Score',
			description:
				'Dale-Chall Readability Formula is a readability test designed to assess the readability level of English texts.',
			min: 0.2075,
			max: 11.5
		},
		linsear_write_formula: {
			label: 'Linsear Write Formula',
			description:
				'Linsear Write is a readability metric for English text, purportedly developed for the United States Air Force to help them calculate the readability of their technical manuals.',
			min: 0,
			max: 25
		},
		gunning_fog: {
			label: 'Gunning Fog',
			description:
				'Gunning Fog Index serves as a tool to assess the readability of a piece of written text. Its primary function is to estimate the educational level a person needs to have in order to easily understand the text. ',
			min: 0,
			max: 19.5
		}
	};

	export let props: Props;
	export let description =
		"Assesses the text's readability, usually by considering factors like sentence length, complexity, and vocabulary. The implementation utilizes Textstat to compute a readability score for the given text.";

	const formatScore = (score: number) => Math.round(score * 100) / 100;
</script>

<Card>
	<div class="flex items-center justify-between gap-2 text-2xl">
		<h1 class="font-bold">Readability Score</h1>
	</div>
	<p class="text-gray-400">{description}</p>
	<!-- <div class="flex justify-center w-full">
		{formalityEquation}
	</div> -->
	<div class="flex flex-col gap-4 pt-4">
		{#each Object.keys(readabilityScoreMetadata) as key}
			<div class="p-4 rounded-lg bg-slate-600">
				<div class="flex justify-between">
					<h1 class="font-semibold">{readabilityScoreMetadata[key].label}</h1>
					<div class="underline">
						<span>{formatScore(props.results.readability_score[key])}</span>
					</div>
				</div>
				<p class="text-gray-400">{readabilityScoreMetadata[key].description}</p>
				<progress
					class="w-full progress"
					value={props.results.readability_score[key]}
					max={readabilityScoreMetadata[key].max}
				/>
			</div>
		{/each}
	</div>
</Card>
