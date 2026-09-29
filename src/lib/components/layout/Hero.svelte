<script lang="ts">
    import logo from '$lib/assets/favicon.svg'
	import Button from '../ui/Button.svelte';

    let { title="Hero Title", text="Here is a description of what this page is about", background=logo } = $props();
</script>

<section id="hero" style:--hero-image={background ? `url(${background})` : undefined} >
    <div class="container hero">
        <h1>{title}</h1>
        <p class="hero-text color-primary">{text}</p>
        <div><Button text="Contact" /></div>
    </div>
</section>


<style>
    #hero {
        padding-block: var(--space-3xl);
        background: linear-gradient(hsl(0 0 0 / 55%), var(--clr-dark)),
            var(--hero-image);
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
    }

    .hero {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 65dvh;
    }

    h1, p {
        text-align: center;
        text-wrap: balance;
    }

    p {
        font-family: var(--font-display);
        text-transform: uppercase;
        letter-spacing: 0.1em;
        margin-block-start: var(--space-xs);
        margin-block-end: var(--space-m)
    }

    h1 {
        text-box: trim-both cap alphabetic;
        text-transform: uppercase;
    }

</style>