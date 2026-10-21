<script>
	import Hero from "$lib/components/layout/Hero.svelte";
    import matTrumpet from "$lib/assets/mat_trumpet_2.avif"
	import ContactPageContactForm from "$lib/components/ui/ContactPageContactForm.svelte";
    import { page } from "$app/state";

    let selectedSubject = $state('');

    $effect(() => {
        selectedSubject = page.url.searchParams.get('selectedSubject') ?? '';
    });
</script>


<Hero background={matTrumpet} text="Fill the form to reach out directly to Mat. He aims to get back within 1 business day.">
    {#snippet titleContent()}
        <h1 class="title">Contact <span class="accent">Mat</span></h1>
    {/snippet}
</Hero>

<section id="contact">
    <ContactPageContactForm {selectedSubject} noHeader />
</section>

<style>
    #contact {
        margin-block-start: 0rem;
    }

</style>