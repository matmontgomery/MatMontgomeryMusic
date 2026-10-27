<script>
	import Hero from '$lib/components/layout/Hero.svelte';
	import matTrumpet1 from '$lib/assets/mat_trumpet_1.avif';
	import matTrumpet2 from '$lib/assets/mat_trumpet_2.avif';
	import matTrumpet3 from '$lib/assets/mat_trumpet_3.avif';
	import MediaCard from '$lib/components/ui/MediaCard.svelte';
</script>

<Hero
	background={matTrumpet2}
	text="Playing professionally for over 20 years. Toured the US, Canada, and Japan with the Gelnn Miller Orchestra, and continues to perform actively accross the Olympia and Pacific Northwest region."
>
	{#snippet titleContent()}
		<h1 class="title">The <span class="accent">Performer</span></h1>
	{/snippet}

	<div class="hero-card-container auto-grid">
		<div class="hero-card stack small">
			<h2>BM | Jazz Studies</h2>
			<h3>University of Washington</h3>
			<p>Advanced improvisation, big band and combo performance, composition and arranging</p>
		</div>
		<div class="hero-card stack small">
			<h2>MM | Orchestral Trumpet Performance</h2>
			<h3>University of Idaho</h3>
			<p>Classical solo repertoire, orchestra, wind ensemble, and chamber ensemble performance</p>
		</div>
	</div>
</Hero>

<section id="media">
	<div class="container stack">
		<h2 class="text-align-center color-primary">Media Gallery</h2>
		<div class="auto-grid" style="--grid-size: 380px;">
			<MediaCard
				type="youtube"
				src="https://youtu.be/M_3xEvhzNAM?si=A52wZ6cM76636xkj"
				title="Mask I"
				label="Video"
				artist="Mat Montgomery"
			/>
			<MediaCard
				type="youtube"
				src="https://youtu.be/Jy5uWhT3gew?si=E9Rmsoz-HPfeTUHE"
				title="Mask II"
				label="Video"
				artist="Mat Montgomery"
			/>
			<MediaCard
				type="youtube"
				src="https://youtu.be/I0qAvFHJmvs?si=QSm0eHHep1zT5RvO"
				title="Mask III"
				label="Video"
				artist="Mat Montgomery"
			/>

			<!-- <MediaCard
				type="audio"
				src="/audio/DPM16002.mp3"
				title="Cake Mix"
				label="Studiio Recording"
				background={matTrumpet1}
				artist="Dapper Page Big Band"
			/> -->
			<!-- <MediaCard 
				type="youtube"
				src="https://youtu.be/-reJIWQWLh4?si=jm9fCpkqapPExR-9"
				title="We Will Rock You"
				label="Video"
				artist="Mat Montgomery"
			/>
			<MediaCard 
				type="youtube"
				src="https://youtu.be/QIy5F8bOSCg?si=DPxpXwueghqo9Gsm"
				title="Boogie Woogie Bugle Boy"
				label="Video"
				artist="Mat Montgomery"
			/> -->
			<MediaCard 
				type="youtube"
				src="https://youtu.be/TtkACB99Nm0?si=y9bc-1R8ELO7BwOB"
				title="Here's That Rainy Day"
				label="Video"
				artist="Mat Montgomery"
			/>
			<MediaCard 
				type="youtube"
				src="https://youtu.be/oRVHWTTcWOs?si=j2BxpiHypV6GB_XR"
				title="Telemann Canonic Sonata Duet no.1"
				label="Video"
				artist="Mat Montgomery"
			/>
			<MediaCard 
				type="youtube"
				src="https://youtu.be/WqM6tynWPfk?si=eKj0QB-bUBpKzV2K"
				title="Black Hole Sun"
				label="Video"
				artist="Mat Montgomery"
			/>
		</div>
	</div>
</section>

<style>
	.hero-card-container {
		width: min(90%, 900px);
		margin: 0 auto;
	}

	.hero-card {
		padding: 1rem;
		background-color: var(--surface-container);
		box-shadow: var(--box-shadow-sm);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.hero-card h2 {
		font-size: var(--size--1);
		font-family: var(--font-body);
		text-transform: uppercase;
		color: var(--clr-primary);
	}

	.hero-card h3 {
		font-size: var(--size-1);
	}

	.hero-card p {
		font-size: var(--size-0);
	}
</style>
