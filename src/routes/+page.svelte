<script lang="ts">
	import Hero from '$lib/components/layout/Hero.svelte';
	import Modal from '$lib/components/layout/Modal.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import ContactForm from '$lib/components/ui/ContactForm.svelte';
	import matTrumpet2 from '$lib/assets/mat_trumpet_2.avif';
	import matTrumpet5 from '$lib/assets/mat_trumpet_5.avif';
	import matTeaching from '$lib/assets/mat_teaching_2.avif';
	import matComp from '$lib/assets/mat_comp_1.avif';
	import Button from '$lib/components/ui/Button.svelte';

	let showModal = $state(false);

	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Mat Montgomery',
		url: 'https://matmontgomerymusic.com/',
		jobTitle: ['Trumpet Performer', 'Trumpet Teacher', 'Jazz Composer'],
		description:
			'Trumpet performer, teacher, and jazz composer creating original compositions and arrangements.'
	};
</script>

<svelte:head>
	<script type="application/ld+json">
		{@html JSON.stringify(structuredData)}
	</script>
	<title>Mat Montgomery | Trumpet Teacher, Performer & Composer</title>
	<link rel="canonical" href="https://matmontgomerymusic.com/" />

	<meta
		name="description"
		content="Meet Mat Montgomery: trumpet teacher serving Olympia, Lacey, and Tumwater, professional performer, and jazz composer creating original music and arrangements."
	/>

	<meta property="og:title" content="Mat Montgomery | Trumpet Teacher, Performer & Composer" />
	<meta
		property="og:description"
		content="Explore trumpet lessons in the Olympia area, performance recordings, original jazz compositions, and custom music commissions."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://matmontgomerymusic.com/" />
	<meta property="og:image" content="https://matmontgomerymusic.com/mat_trumpet_2.avif" />
</svelte:head>

<Hero
	title="Trumpet Artistry & Pedagogy"
	text="Performer. Teacher. Composer."
	background={matTrumpet5}
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

<section class="stack">
	<div class="container">
		<h2 class="text-align-center color-primary">Serving the Greater Olympia Area</h2>
	</div>
	<div class="container stack">
		<div class="switcher" style="--min-card-width: 250px">
			<Card
				title="Performer"
				text="Professional trumpet player with dual performance degrees and worldwide touring experience with the Glenn Miller Orchestra."
				src={matTrumpet2}
				alt="Mat playing trumpet."
				href="/performance"
				linkText="View Profile"
			/>
			<Card
				title="Educator"
				text="Over 20 years of experience offering personalized trumpet instruction, helping students reach their fullest potential."
				src={matTeaching}
				alt="Mat playing trumpet."
				href="/lessons"
				linkText="Explore Lessons"
			/>
			<Card
				title="Composer"
				text="Founder of Dapper Page Music, specializing in modern big band compositions played by school and professional bands globally."
				src={matComp}
				alt="Mat playing trumpet."
				href="compositions"
				linkText="Browse Music"
			/>
		</div>
	</div>
</section>
