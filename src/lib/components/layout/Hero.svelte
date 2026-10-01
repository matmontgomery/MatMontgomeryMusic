<script lang="ts">
	import logo from '$lib/assets/favicon.svg';
	import Button from '../ui/Button.svelte';
	import type { Snippet } from 'svelte';

	let {
		title = 'Hero Title',
		titleContent,
		subText,
		text = 'Here is a description of what this page is about',
		background = logo,
		onclick,
        children
	}: {
		title: string;
		titleContent?: Snippet;
		subText?: string;
		text?: string;
		background?: string;
		onclick?: (event: MouseEvent) => void;
        children?: Snippet;
	} = $props();
</script>

<section id="hero" style:--hero-image={background ? `url(${background})` : undefined}>
	<div class="container hero">
		{#if titleContent}
			{@render titleContent()}
		{:else}
			<h1>{title}</h1>
		{/if}
		{#if subText}
			<p class="hero-subtitle color-primary">{subText}</p>
		{:else}
			<p class="hero-text">{text}</p>
		{/if}
        {#if children}
            <div class="children-container">{@render children()}</div>
        {/if}
	</div>
</section>

<style>
	#hero {
		padding-block: var(--space-3xl);
		background: linear-gradient(hsl(0 0 0 / 55%), var(--clr-dark)), var(--hero-image);
		background-position: center 15%;
		background-size: cover;
		background-repeat: no-repeat;
	}

	.hero {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 65dvh;
	}

	h1,
	p {
		text-align: center;
		text-wrap: balance;
	}

	.hero-subtitle {
		font-family: var(--font-display);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin-block-start: var(--space-xs);
		margin-block-end: var(--space-m);
	}

	h1 {
		text-box: trim-both cap alphabetic;
		text-transform: uppercase;
	}

	.children-container {
		margin-block-start: var(--space-m);
	}
</style>
