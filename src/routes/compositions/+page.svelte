<script>
	import Hero from '$lib/components/layout/Hero.svelte';
	import matComp from '$lib/assets/mat_comp_1.avif'
	import Button from '$lib/components/ui/Button.svelte';
	import CompositionCard from '$lib/components/ui/CompositionCard.svelte';
	import CommissionForm from '$lib/components/ui/CommissionForm.svelte';
	import { goto } from '$app/navigation';
	import { compositions } from '$lib/data/compositions';
</script>

<svelte:head>
	<title>Jazz Band Compositions & Arrangements | Mat Montgomery</title>

	<link
		rel="canonical"
		href="https://matmontgomerymusic.com/compositions"
	/>

	<meta
		name="description"
		content="Explore original jazz compositions and arrangements by Mat Montgomery. Listen to recordings, preview scores, find published works, and commission custom music for your ensemble."
	/>

	<meta
		property="og:title"
		content="Jazz Compositions & Custom Arrangements | Mat Montgomery"
	/>
	<meta
		property="og:description"
		content="Discover original jazz music by Mat Montgomery, listen to recordings, preview scores, explore published works, and request a custom composition or arrangement for your ensemble."
	/>
	<meta property="og:type" content="website" />
	<meta
		property="og:url"
		content="https://matmontgomerymusic.com/compositions"
	/>
	<meta
		property="og:image"
		content="https://matmontgomerymusic.com/mat_comp.JPG"
	/>
</svelte:head>

<Hero
    background={matComp}
>
    {#snippet titleContent()}
        <h1 class="title">
            Composition <span class="accent">Portfolio</span>
        </h1>
    {/snippet}

    {#snippet textContent()}
        Explore selected original compositions and arrangements by Mat Montgomery,
        published through
        <a
			class="color-primary"
            href="https://www.dapperpage.com/"
            target="_blank"
            rel="noopener noreferrer"
        >Dapper Page Music</a>.
        Peruse sample scores, listen to full recordings, and find ways to buy.
        Initiate a conversation for a specially commissioned piece for your jazz band.
    {/snippet}

    <div class="flex-group">
        <Button
            text="Commission a Piece"
            style="--size: var(--size--1)"
            onclick={() => goto('#commission')}
        />
        <Button
            text="Browse Selected Works"
            outline
            style="--size: var(--size--1)"
            onclick={() => goto('#compositions')}
        />
    </div>
</Hero>

<section id="compositions" class="stack">
<div class="container stack small">
	<h2 class="color-primary">Selected Compositions</h2>
	<p>These are a few pieces that Mat has written or arragned over the years. Many more of his composotions are available on <a class="color-primary" href="https://www.dapperpage.com/">DapperPage.com</a>.</p>
</div>
	<div class="container auto-grid">
		{#each compositions as composition (composition.publisherId)}
			<CompositionCard {composition}/>
		{/each}
	</div>
</section>

<hr class="section-break" />

<section id="commission">
	<div class="container with-sidebar">
		<div class="not-sidebar stack" style="--content-min-width: 55%;">
			<h2 class="color-primary">Commission a Tailored Work</h2>
			<p>
				Every ensemble has a distinct voice, a specific set of strengths, and star soloists who
				deserve music written just for them. For over 20 years, Mat Montgomery has collaborated with
				festival directors, school band programs, collegiate jazz orchestras, and professional
				ensembles to craft unforgettable premiere repertoire.
			</p>
			<p>
				Whether honoring an special occassion, featuring a graduating senior, or presenting a
				festival competition chart, Mat partners directly with your program throught the creative
				process.
			</p>
			<h3 class="color-primary">The Commission Process</h3>
			<ol class="stack small">
				<li>
					<h4>Repertoire Consultation</h4>
					<p>
						We discuss your ensemble instrumentation, solois strengths, difficulty targets, and
						event timeline to determine the stylistic direction.
					</p>
				</li>
				<li>
					<h4>Sketches & Audio Mockups</h4>
					<p>
						You receive thematic drafts and MIDI audio renderings to rehearse ideas and provide
						directorial feedback early in the process.
					</p>
				</li>
				<li>
					<h4>Dapper Page Engraving Standard</h4>
					<p>
						Compleete delevery of publication-grade conductor score, formatted parts, and dedication
						inscriptions.
					</p>
				</li>
				<li>
					<h4>Optional Virtual or In-Person Clinic</h4>
					<p>
						Mat joins your ensemble for rehearsal clinics (via Zoom or in-person) ahead of the world
						premiere performance.
					</p>
				</li>
			</ol>
			<div class="cert">
				<div class="icon"><span class="material-symbols-outlined"> verified </span></div>
				<p>All commissioned charts include exclusive performance rights for the premiere season.</p>
			</div>
		</div>
		<div class="sidebar" style="--sidebar-min-width: 24rem;">
			<div class="commission">
				<CommissionForm />
			</div>
		</div>
	</div>
</section>

<style>
	ol {
		border-left: 1px solid var(--outline-variant);
	}

	li {
		font-family: var(--font-display);
		color: var(--clr-secondary);
		font-size: var(--size-1);
	}

	.cert {
		background-color: var(--surface-container);
		display: flex;
        align-items: center;
        gap: 0.5em;
		padding: 1em;
		border: 1px solid var(--outline-variant);
		border-radius: var(--border-radius-sm);
	}



	.cert p {
		font-size: var(--size--1);
	}

	.section-break {
		width: 90%;
		opacity: 0.2;
	}

	.material-symbols-outlined {
		font-variation-settings:
			'FILL' 0,
			'wght' 400,
			'GRAD' 0,
			'opsz' 24;
	}
</style>
