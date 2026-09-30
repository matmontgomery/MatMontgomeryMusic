<script>
    import Hero from "$lib/components/layout/Hero.svelte";
    
</script>

<Hero text="Playing professionally for over 20 years. Toured the US, Canada, and Japan with the Gelnn Miller Orchestra, and continues to perform actively accross the Olympia and Pacific Northwest region.">
    {#snippet titleContent()}
        <h1 class="title">The <span class="accent">Performer</span></h1>
    {/snippet}

    <div class="hero-card-container">
        <div class="hero-card">
            <h2>BM | Jazz Studies</h2>
            <h3>University of Washington</h3>
            <p>Advanced improvisation, big band and combo performance, composition and arranging</p>
        </div>
        <div class="hero-card">
            <h2>MM | Orchestral Trumpet Performance</h2>
            <h3>University of Idaho</h3>
            <p>Classical solo repertoire, orchestra, wind ensemble, and chamber ensemble performance</p>
        </div>
    </div>
</Hero>

<style>

</style>