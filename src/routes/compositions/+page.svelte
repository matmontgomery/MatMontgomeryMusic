<script>
	import Hero from "$lib/components/layout/Hero.svelte";
    import matTrumpet from '$lib/assets/mat_trumpet_1.avif';
	import Button from "$lib/components/ui/Button.svelte";
	import CompositionCard from "$lib/components/ui/CompositionCard.svelte";
	import CommissionForm from "$lib/components/ui/CommissionForm.svelte";
    import { goto } from "$app/navigation";


</script>


<Hero
    text="Explore selected original compositions and arragements by Mat Montgomery, published through Dapper Page Music. Peruse sample scores, listen to full recordings, and find ways to buy. Initiate a conversation for a specially commissioned piece for your jazz band."
    background={matTrumpet}
>
    {#snippet titleContent()}
        <h1 class="title">Composition <span class="accent">Portfolio</span></h1>
    {/snippet}
    <div class="flex-group">
        <Button text="Commission a Piece" style="--size: var(--size--1)" onclick={() => goto('#commission')} />
        <Button text="Browse Selected Works" outline style="--size: var(--size--1)" onclick={() => goto('#compositions')} />
    </div>
</Hero>

<section id="compositions">
    <div class="container auto-grid">
        <CompositionCard />
        <CompositionCard />
        <CompositionCard />
        <CompositionCard />
        <CompositionCard />
    </div>
</section>

<hr class="section-break">

<section id="commission">
    <div class="container with-sidebar">
        <div class="not-sidebar stack" style="--content-min-width: 55%;">
            <h2 class="color-primary">Commission a Tailored Work</h2>
            <p>Every ensemble has a distinct voice, a specific set of strengths, and star soloists who deserve music written just for them.
                For over 20 years, Mat Montgomery has collaborated with festival directors, school band programs, collegiate jazz orchestras, and professional ensembles to craft unforgettable premiere repertoire.
            </p>
            <p>Whether honoring an special occassion, featuring a graduating senior, or presenting a festival competition chart, Mat partners directly with your program throught the creative process.</p>
            <h3 class="color-primary">The Commission Process</h3>
            <ol class="stack small">
                <li>
                    <h4>Repertoire Consultation</h4>
                    <p>We discuss your ensemble instrumentation, solois strengths, difficulty targets, and event timeline to determine the stylistic direction.</p>
                </li>
                <li>
                    <h4>Sketches & Audio Mockups</h4>
                    <p>You receive thematic drafts and MIDI audio renderings to rehearse ideas and provide directorial feedback early in the process.</p>
                </li>
                <li>
                    <h4>Dapper Page Engraving Standard</h4>
                    <p>Compleete delevery of publication-grade conductor score, formatted parts, and dedication inscriptions.</p>
                </li>
                <li>
                    <h4>Optional Virtual or In-Person Clinic</h4>
                    <p>Mat joins your ensemble for rehearsal clinics (via Zoom or in-person) ahead of the world premiere performance.</p>
                </li>
            </ol>
            <div class="cert">
                <img src="" alt="">
                <p>All commissioned charts include exclusive performance rirghts for the premiere season.</p>
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

</style>