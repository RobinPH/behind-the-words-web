<script lang="ts">
	import Card from '$lib/Card.svelte';
	import { onMount } from 'svelte';

	type Props = {
		id: string;
		metadata: {
			nouns: string[];
			adjectives: string[];
			prepositions: string[];
			articles: string[];
			pronouns: string[];
			verbs: string[];
			adverbs: string[];
			interjections: string[];
			n_formal: number;
			n_contextual: number;
		};
		result: {
			formality_score: number;
		};
	};

	const show = [
		'nouns',
		'adjectives',
		'prepositions',
		'articles',
		'pronouns',
		'verbs',
		'adverbs',
		'interjections'
	] as const;

	export let props: Props;
	export let description = `Evaluates the level of formality of a text using Heylighen & Dewaele's (1999) F-measure.`;

	const score = Math.round(props.results.formality_score * 100 * 100) / 100;

	onMount(() => {
		let script = document.createElement('script');
		script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js';
		document.head.append(script);

		script.onload = () => {
			// @ts-ignore
			MathJax = {
				tex: {
					inlineMath: [
						['$', '$'],
						['\\(', '\\)']
					]
				},
				svg: { fontCache: 'global' }
			};
		};
	});

	const formalityEquation = `
		\\begin{align*}
		f &= \\{\\text{nouns}, \\text{adjectives}, \\text{prepositions}, \\text{articles}\\} \\\\
		c &= \\{\\text{pronouns}, \\text{verbs}, \\text{adverbs}, \\text{interjections}\\} \\\\
		F &= \\frac{50 \\left ( \\frac{\\left | f \\right | - \\left | c \\right |}{\\left | f \\right | + \\left | c \\right |} + 1\\right )}{100}
		\\end{align*}
	`;
</script>

<Card>
	<div class="flex items-center justify-between gap-2 text-2xl">
		<h1 class="font-bold">Formality Score</h1>
		<div class="underline min-w-fit">
			<span>{score}%</span>
		</div>
	</div>
	<p class="text-gray-400">{description}</p>
	<!-- <div class="flex justify-center w-full">
		{formalityEquation}
	</div> -->
	<progress class="w-full progress" value={props.results.formality_score} max={1} />
	<div class="flex flex-row flex-wrap gap-2 pt-4">
		{#each show as key}
			<div class="p-2 rounded-lg bg-slate-600">
				<span class="font-bold">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
				<span> ({props.metadata[key].length})</span>
			</div>
		{/each}
	</div>
	<!-- {#each show as key}
		<div class="overflow-x-auto">
			<span class="font-bold">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
			<span> ({props.metadata[key].length}): </span>
			<span class="text-gray-400">{props.metadata[key].join(', ')}</span>
		</div>
	{/each} -->
</Card>
