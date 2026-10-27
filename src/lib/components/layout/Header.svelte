<script lang="ts">
    import NavBar from "./NavBar.svelte";

    let { onclick } = $props();
</script>

<div class="header">
    <NavBar {onclick} />
</div>