<script>
	import Hero from "$lib/components/layout/Hero.svelte";
    import matTrumpet from "$lib/assets/mat_trumpet_2.avif"
	import ContactForm from "$lib/components/ui/ContactForm.svelte";

</script>


<Hero background={matTrumpet} text="Fill the form to reach out directly to Mat. He aims to get back within 1 business day.">
    {#snippet titleContent()}
        <h1 class="title">Contact <span class="accent">Mat</span></h1>
    {/snippet}
</Hero>

<section id="contact">
    <ContactForm noHeader />
</section>

<style>
    #contact {
        margin-block-start: 0rem;
    }

</style>