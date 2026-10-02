<script>
	import Hero from '$lib/components/layout/Hero.svelte';
	import Modal from '$lib/components/layout/Modal.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import ContactForm from '$lib/components/ui/ContactForm.svelte';
	import matTrumpet from '$lib/assets/mat_trumpet_3.avif';
	import matTrumpet2 from '$lib/assets/mat_trumpet_2.avif';
	import matTrumpet3 from '$lib/assets/mat_trumpet_1.avif';
	import Button from '$lib/components/ui/Button.svelte';

	let showModal = $state(false);
</script>

<Hero
	title="Trumpet Artistry & Pedagogy"
	text="Performer. Teacher. Composer."
	background={matTrumpet}
	
>
	{#snippet titleContent()}
		<h1 class="title">
			Trumpet <span class="accent">Artistry</span> & Pedegogy
		</h1>
	{/snippet}
	<Button text="Contact" onclick={() => (showModal = true)} />
</Hero>

<Modal bind:open={showModal}>
	<ContactForm />
</Modal>

<div class="container stack">
	<div class="switcher" style="--min-card-width: 250px">
		<Card
			title="The Performer"
			text="Professional trumpet player with dual performance degrees and worldwide touring experience with the Glenn Miller Orchestra."
			src={matTrumpet}
			alt="Mat playing trumpet."
			href="/performance"
			linkText="View Profile"
		/>
		<Card
			title="The Educator"
			text="Over 20 years of experience offering personalized trumpet instruction, helping students reach their fullest potential."
			src={matTrumpet2}
			alt="Mat playing trumpet."
			href="/lessons"
			linkText="Explore Lessons"
		/>
		<Card
			title="The Composer"
			text="Founder of Dapper Page Music, specializing in modern big band compositions played by school and professional bands globally."
			src={matTrumpet3}
			alt="Mat playing trumpet."
			href="compositions"
			linkText="Browse Music"
		/>
	</div>
</div>


