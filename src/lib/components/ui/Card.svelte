<script lang="ts">
	import logo from '$lib/assets/favicon.svg';

	interface Props {
		src?: string;
		alt?: string;
		title?: string;
		text?: string;
		href?: string;
		linkText?: string;
		primary?: boolean;
		secondary?: boolean;
	}

	let {
		src = logo,
		alt = 'logo',
		title = 'Card Title',
		text = 'Here are the important things you need to know.',
		href = '#',
		linkText = 'Find out more',
		primary = false,
		secondary = false
	}: Props = $props();
</script>

<div class="card stack" class:primary class:secondary>
	<div class="icon">
		<img {src} {alt} />
	</div>
	<h3>{title}</h3>
	<p>{text}</p>
	<a {href}>{linkText}</a>
</div>

<style>
	.card {
		background-color: var(--clr-light);
		color: var(--clr-dark);
		padding: 1rem;
		border-radius: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.icon {
		display: flex;
		justify-content: center;
	}

	h3 {
		font-size: var(--size-1);
	}

	p {
		color: var(--clr-dark);
		font-size: var(--size-0);
	}

	a {
		text-decoration: underline;
	}

	.primary {
		border: 5px solid var(--clr-primary);
		box-shadow: 0 0 1em var(--clr-primary);
	}

	.secondary {
		border: 5px solid var(--clr-secondary);
		box-shadow: 0 0 1em var(--clr-secondary);
	}
</style>
