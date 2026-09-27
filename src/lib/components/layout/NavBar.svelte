<script lang="ts">
	import logo from '$lib/assets/favicon.svg';
	import Button from '../ui/Button.svelte';
	import { resolve } from '$app/paths';
	let menuOpen = $state(false);
    import { pages } from '$lib/data/navigation';

	function closeMenu() {
		menuOpen = false;
	}
</script>

<nav>
	<div class="logo">
		<a href={resolve('/')} onclick={closeMenu}> <img src={logo} alt="logo" /> </a>
	</div>
	<button
		class="menu-toggle"
		type="button"
		aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
		aria-expanded={menuOpen}
		aria-controls="main-navigation"
		onclick={() => (menuOpen = !menuOpen)}
	>
		<span></span> <span></span> <span></span>
	</button>
	<ul id="main-navigation" class:open={menuOpen} class="nav-links" role="list">
		{#each pages as page (page.href)}
			<li><a href={resolve(page.href)} onclick={closeMenu}> {page.name} </a></li>
		{/each}
		<li><Button text="Contact" --size="var(--size--1)" /></li>
	</ul>
</nav>

<style>
	nav {
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.25rem 1rem;
	}
	.logo {
		width: var(--size-1);
	}
	.logo a {
		display: block;
	}
	.logo img {
		display: block;
		width: 100%;
		height: auto;
	}
	.nav-links {
		margin: 0;
		padding: 0;
		display: flex;
		align-items: center;
		gap: 2rem;
		list-style: none;
	}
	.nav-links a {
		text-decoration: none;
	} 
    
    /* Hamburger button */
	.menu-toggle {
		display: none;
		width: 2.5rem;
		height: 2.5rem;
		padding: 0.5rem;
		border: 0;
		background: transparent;
        opacity: 0.85;
		cursor: pointer;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 0.3rem;
	}

	.menu-toggle span {
		display: block;
		width: 1.5rem;
		height: 2px;
		background: var(--clr-light);
		border-radius: 2px;
		transition:
			transform 200ms ease,
			opacity 200ms ease;
	} 
    
    /* Hamburger → X */
	.menu-toggle[aria-expanded='true'] span:nth-child(1) {
		transform: translateY(0.425rem) rotate(45deg);
	}
	.menu-toggle[aria-expanded='true'] span:nth-child(2) {
		opacity: 0;
	}
	.menu-toggle[aria-expanded='true'] span:nth-child(3) {
		transform: translateY(-0.425rem) rotate(-45deg);
	} 
    
    /* Mobile */
	@media (max-width: 700px) {
		nav {
			flex-wrap: wrap;
		}
		.menu-toggle {
			display: flex;
		}
		.nav-links {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: stretch;
			gap: 0;
			max-height: 0;
			overflow: hidden;
			opacity: 0;
			transition:
				max-height 250ms ease,
				opacity 200ms ease;
		}
		.nav-links.open {
			max-height: 20rem;
			opacity: 1;
		}
		.nav-links li {
			width: 100%;
			text-align: center;
		}
		.nav-links a {
			display: block;
			padding: 0.75rem 1rem;
		}
		.nav-links li:last-child {
			padding: 0.75rem 1rem;
		}
	}
</style>
