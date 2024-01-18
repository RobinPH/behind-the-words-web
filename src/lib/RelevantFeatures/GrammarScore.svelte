<script lang="ts">
	import Card from '$lib/Card.svelte';

	type Props = {
		id: string;
		metadata: {
			errors_formatted: {
				message: string;
				context: string;
				offsetInContext: number;
				errorLength: number;
			}[];
		};
		result: {
			grammar_score: number;
		};
	};

	export let props: Props;
	export let description =
		'A score indicating the number and severity of grammar errors in a text.';

	const score = Math.round(props.results.grammar_score * 100 * 100) / 100;
</script>

<Card>
	<div class="flex items-center justify-between gap-2 text-2xl">
		<h1 class="font-bold">Grammar Score</h1>
		<div class="underline min-w-fit">
			<span>{score}%</span>
		</div>
	</div>
	<p class="text-gray-400">{description}</p>
	<progress class="w-full progress" value={props.results.grammar_score} max={1} />
	<div class="flex flex-col gap-4 pt-4 overflow-y-auto max-h-96">
		{#each props.metadata.errors_formatted as { message, context, errorLength, offsetInContext }}
			<div class="p-4 rounded-lg bg-slate-600">
				<div>
					<span class="font-semibold">Error Message: </span>
					<span class="text-gray-400">{message}</span>
				</div>
				<div class="flex gap-2">
					<div class="font-semibold min-w-fit">Error:</div>
					<div class="font-courier-new">
						<div>{context}</div>
						<div>
							{@html ''
								.padStart(errorLength, '^')
								.padStart(errorLength + offsetInContext, ' ')
								.replaceAll(' ', '&nbsp;')}
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
</Card>
