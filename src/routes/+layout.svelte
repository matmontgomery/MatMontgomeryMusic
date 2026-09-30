<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '../styles/app.css';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import Modal from '$lib/components/layout/Modal.svelte';
	import ContactForm from '$lib/components/ui/ContactForm.svelte';

	let { children } = $props();
	let showModal = $state(false);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>


<header>
	<Header />
</header>


<main class="stack large">
	{@render children()}
	<Modal bind:open={showModal}>
		<ContactForm />
	</Modal>
</main>

<footer>
	<Footer onclick={() => (showModal = true)} />
</footer>

<style>

</style>