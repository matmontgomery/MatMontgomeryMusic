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
		background-color: #000;
		padding: 1rem;
		box-shadow: 0 0 1px var(--clr-primary);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.icon {
		display: flex;
		justify-content: center;
		box-shadow: 0 0 8px -4px var(--clr-primary);
	}
	
	.icon > img {
		aspect-ratio: 16 / 9;
		height: 100%; width: 100%;
		object-fit: cover;
		object-position: center 10%;
	}

	h3 {
		font-size: var(--size-2);
		color: var(--clr-primary);
	}

	p {
		font-size: var(--size-0);
	}

	a {
		color: var(--clr-primary);
		position: relative;
		width: fit-content;
		text-transform: uppercase;
	}

	a::after {
		content: " \2192";
		position: absolute;
		right: 0;
		transform: translateX(calc(100% + 0.5em));
		transition: transform 0.2s ease;
	}

	a:hover {
		text-decoration: none;
	}

	a:hover::after {
		transform: translateX(calc(100% + 1em));
	}

	.primary {
		box-shadow: var(--box-shadow);
	}

	.secondary {
		box-shadow: var(--box-shadow-secondary);
	}
</style>
