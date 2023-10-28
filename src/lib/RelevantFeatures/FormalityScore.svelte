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
	export let description = 'Evaluates the level of formality in the text.';

	const score = Math.round(props.result.formality_score * 100 * 100) / 100;

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
	<div class="text-2xl flex gap-2 items-center justify-between">
		<h1 class="font-bold">Formality Score</h1>
		<div class="underline">
			<span>{score}%</span>
		</div>
	</div>
	<p class="text-gray-400">{description}</p>
	<!-- <div class="w-full flex justify-center">
		{formalityEquation}
	</div> -->
	<progress class="progress w-full" value={props.result.formality_score} max={1} />
	{#each show as key}
		<div class="overflow-x-auto">
			<span class="font-bold">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
			<span> ({props.metadata[key].length}): </span>
			<span class="text-gray-400">{props.metadata[key].join(', ')}</span>
		</div>
	{/each}
</Card>
