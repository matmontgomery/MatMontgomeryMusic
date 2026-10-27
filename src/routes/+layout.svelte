<script lang="ts">
	import '../styles/app.css';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import Modal from '$lib/components/layout/Modal.svelte';
	import ContactForm from '$lib/components/ui/ContactForm.svelte';
	import LessonForm from '$lib/components/ui/LessonForm.svelte';

	let { children } = $props();
	let showModal = $state(false);
	let showLessonModal = $state(false);
</script>

<svelte:head>
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
	<link rel="manifest" href="/site.webmanifest" />
</svelte:head>

<header>
	<Header onclick={() => (showLessonModal = true)} />
</header>

<main class="stack large">
	{@render children()}
	<Modal bind:open={showModal}>
		<ContactForm />
	</Modal>
	<Modal bind:open={showLessonModal}>
		<LessonForm />
	</Modal>
</main>

<footer>
	<Footer onclick={() => (showModal = true)} />
</footer>

<style>
</style>
