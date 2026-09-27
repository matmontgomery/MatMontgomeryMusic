<script lang="ts">
    import Button from "../ui/Button.svelte";
</script>

<div class="cta">
	<h3>Get Started</h3>
	<Button text="Contact Us" />
	<Button text="More Info" secondary />
</div>

<style>
    h3 {
        font-size: var(--size-1);
        margin-block-end: 0;
    }

    .cta {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: var(--space-2xs);
    }
</style>
