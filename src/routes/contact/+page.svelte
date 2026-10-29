<script>
    import Hero from "$lib/components/layout/Hero.svelte";
    import matTrumpet from "$lib/assets/mat_directing_2.avif";
    import ContactPageContactForm from "$lib/components/ui/ContactPageContactForm.svelte";
    import { page } from "$app/state";

    let selectedSubject = $derived(
        page.url.searchParams.get('selectedSubject') ?? ''
    );
</script>

<svelte:head>
  <title>Contact Mat Montgomery | Trumpet Teacher & Performer | Jazz Composer</title>
  <meta
    name="description"
    content="Motivate and inspire your trumpet student to reach thier potential through private trumpet lessons with Mat Montgomery. Serving the Olympia, Lacey, Tumwater area. Hire Mat Montgomery on trumpet for jazz, pop, funk, studio, or orchestra performances. Explore original jazz compositions and arrangements by Mat Montgomery. Listen to recordings, preview scores, and discover music published by Dapper Page Music. Commission a custom piece taylor made for your ensemble by Mat Montgomery."
  />
  <meta property="og:title" content="Contact Mat Montgomery | Trumpet Teacher & Performer | Jazz Composer" />
  <meta
    property="og:description"
    content="Motivate and inspire your trumpet student to reach thier potential through private trumpet lessons with Mat Montgomery. Serving the Olympia, Lacey, Tumwater area. Explore original compositions, arrangements, recordings, and sample scores."
  />
  <meta property="og:type" content="website" />
  <meta
    property="og:url"
    content="https://matmontgomerymusic.com/contact"
  />
  <meta
    property="og:image"
    content="https://matmontgomerymusic.com/mat_directing_2.avif"
  />
</svelte:head>

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
        margin-block-start: -12rem;
    }

</style>