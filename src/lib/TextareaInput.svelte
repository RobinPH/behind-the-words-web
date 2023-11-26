<script lang="ts">
	import cx from 'classnames';
	export let text: string;
	export let maxLength: number = 2056;
</script>

<div class="w-full h-[60vh]">
	<textarea
		class="w-full h-full resize-none textarea textarea-info"
		placeholder="Enter Essay"
		bind:value={text}
	/>
	<div class={cx('w-full text-xs text-right', text.length > maxLength && 'text-red-400')}>
		{text.length}/{maxLength}
	</div>
</div>
