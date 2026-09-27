<script lang="ts">
    import logo from '$lib/assets/favicon.svg'

    let { title="Hero Title", text="Here is a description of what this page is about", src=logo, alt="logo" } = $props();
</script>

<section id="hero">
    <div class="container hero">
        <img {src} {alt}>
        <h1>{title}</h1>
        <p class="hero-text">{text}</p>
    </div>
</section>


<style>
    .hero {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 65dvh;
    }

    .hero > * + * {
        margin-top: var(--space-2xs);
    }

    h1, p {
        text-align: center;
        text-wrap: balance;
    }

    h1 {
        text-box: trim-both cap alphabetic;
    }

</style>