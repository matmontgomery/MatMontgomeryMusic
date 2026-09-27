<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type Props = HTMLButtonAttributes & {
		text?: string;
		secondary?: boolean;
	};

	let {
		text = 'Text',
		type = 'button',
		onclick,
		disabled = false,
		secondary = false,
		...rest
	}: Props = $props();
</script>

<button {...rest} {type} {onclick} {disabled} class:secondary>
	{text}
</button>

<style>
	button {
		font-family: var(--font-body);
		font-size: var(--size, var(--size-0));
		padding: 0.5em 2em;
		background-color: var(--clr-primary);
		border: 1px solid var(--clr-light);
		border-radius: 100vw;
		opacity: 0.85;
		scale: 0.99;
		transition: opacity 0.2s, scale 0.2s;
		color: var(--clr-dark);
	}

	.secondary {
		background-color: var(--clr-secondary);
	}

	button:hover {
		opacity: 1;
		scale: 1;
	}
</style>