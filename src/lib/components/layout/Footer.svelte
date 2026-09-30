<script lang="ts">
	import Button from '../ui/Button.svelte';
	import { pages } from '$lib/data/navigation';
	import { resolve } from '$app/paths';

	let { onclick } = $props();
</script>

	<section>
		<div class="container">
			<h2 class="color-primary">Mat Montgomery</h2>
			<h3>Trumpet <span class="accent">Artistry</span> & Pedagogy</h3>
		</div>
		<div class="container footer-content">
			<div class="tag-line">
				<div class="button-container"><Button text="Contact" {onclick} /></div>
			</div>
			<div class="footer-links">
				<ul role="list">
					<li class="label"><h4>Links</h4></li>
                    <li><a href={resolve("/")}>Home</a></li>
					{#each pages as page (page.href)}
						<li><a href={resolve(page.href)}>{page.name}</a></li>
					{/each}
				</ul>
			</div>
		</div>
		<div class="container copyright-container">
			<p class="copyright">© {new Date().getFullYear()} Mat Montgomery Music. All rights reserved.</p>
		</div>
	</section>

<style>

	section {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		min-height: 60dvh;
		padding: 2rem 0;
		background: #000;
		box-shadow: 0 0 0.1em var(--clr-primary);
		margin-block-start: 5rem;
	}
	
	.footer-content {
		display: flex;
		justify-content: space-between;
	}
	
	.tag-line {
		margin-block-start: var(--space-m);
	}

	.copyright-container {
		margin-top: auto;
	}

	.copyright {
		font-size: var(--size--1);
	}

	.accent {
		color: var(--clr-secondary);
		font-style: italic;
	}

	.button-container {
		width: fit-content;
	}

	h2, h3 {
		text-transform: uppercase;
	}

	h3 {
		margin: 0;
		margin-block-start: var(--space-3xs);
	}

	.label > h4 {
		font-style: italic;
		color: var(--clr-secondary);
	}

	ul {
		margin: 0;
		padding: 0;
		margin-block-start: var(--space-m);
	}
</style>
