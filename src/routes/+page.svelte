<script>
	import Cta from '$lib/components/layout/Cta.svelte';
	import Hero from '$lib/components/layout/Hero.svelte';
	import Modal from '$lib/components/layout/Modal.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import ContactForm from '$lib/components/ui/ContactForm.svelte';
	import matTrumpet from '$lib/assets/mat_trumpet_3.avif';

	let showModal = $state(false);
</script>

<Hero title="Trumpet Artistry & Pedagogy" text="Performer. Teacher. Composer." background={matTrumpet} />

<Modal bind:open={showModal}>
	<h2>My Modal</h2>
	<p>This content can be anything.</p>
	<Button text="Close" onclick={() => (showModal = false)} />
</Modal>

<div class="container stack">
	<div class="switcher">
		<Card title="The Performer" />
		<Card title="The Educator" />
		<Card title="The Composer" />
	</div>
	<Cta />
</div>

<div class="container">
	<ContactForm />
	<Button text="Open Modal" onclick={() => (showModal = true)} />
</div>
