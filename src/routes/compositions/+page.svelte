<script>
	import Hero from "$lib/components/layout/Hero.svelte";
    import matTrumpet from '$lib/assets/mat_trumpet_1.avif';
	import Button from "$lib/components/ui/Button.svelte";
	import CompositionCard from "$lib/components/ui/CompositionCard.svelte";


</script>


<Hero
    text="Explore selected original compositions and arragements by Mat Montgomery, published through Dapper Page Music. Peruse sample scores, listen to full recordings, and find ways to buy. Initiate a conversation for a specially commissioned piece for your jazz band."
    background={matTrumpet}
>
    {#snippet titleContent()}
        <h1 class="title">Composition <span class="accent">Portfolio</span></h1>
    {/snippet}
    <div class="flex-group">
        <Button text="Commission a Piece" style="--size: var(--size--1)" />
        <Button text="Browse Selected Works" outline style="--size:var(--size--1)" />
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

<style>

</style>