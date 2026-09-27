<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '../styles/app.css';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>


<header>
	<Header />
</header>


<main class="stack large">
	{@render children()}
</main>

<footer>
	<Footer />
</footer>

<style>

</style>