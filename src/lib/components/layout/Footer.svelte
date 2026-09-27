<script lang="ts">
	import Button from '../ui/Button.svelte';
	import { pages } from '$lib/data/navigation';
	import { resolve } from '$app/paths';
</script>

<div class="footer">
	<section>
		<div class="container with-sidebar">
			<div class="tag-line sidebar stack">
				<h2>Trusted <span class="accent">Authority</span></h2>
				<Button text="Contact" />
			</div>
			<div class="switcher not-sidebar" style="--min-card-width:170px">
				<ul role="list">
					<li class="label">Links</li>
                    <li><a href={resolve("/")}>Home</a></li>
					{#each pages as page (page.href)}
						<li><a href={resolve(page.href)}>{page.name}</a></li>
					{/each}
					<li><a href="#">Contact</a></li>
				</ul>
				<ul role="list">
					<li class="label">Social</li>
					<li><a href="#">Instagram</a></li>
					<li><a href="#">Facebook</a></li>
					<li><a href="#">X</a></li>
				</ul>
				<ul role="list">
					<li class="label">Legal</li>
					<li><a href="#">Privacy Policy</a></li>
					<li><a href="#">Terms of Service</a></li>
				</ul>
			</div>
		</div>
	</section>
	<h2 class="footer-brand text-align-center">Brand Name</h2>
</div>

<style>
	.footer {
		background: linear-gradient(var(--clr-light), var(--clr-primary));
		overflow: clip;
		margin-top: 5rem;
	}

	section {
		border-radius: 0 0 2rem 2rem;
		background: var(--clr-dark);
		padding: 2rem 0 10rem 0;
	}

	.accent {
		color: var(--clr-secondary);
		font-style: italic;
	}

	.tag-line > h2 {
		font-size: var(--size-2);
		margin-top: 0;
	}

	.label {
		font-family: var(--font-body);
		font-size: var(--size-0);
	}

	.footer-brand {
		--brand-chars: 7.5;
		font-size: calc(100dvw / var(--brand-chars));
		color: var(--clr-dark);
		margin: 0;
		line-height: 1;
		opacity: 0.7;
	}

	ul {
		text-align: end;
	}
</style>
