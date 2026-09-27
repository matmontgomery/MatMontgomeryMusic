<script lang="ts">
	import { tick } from 'svelte';

	interface Props {
		open?: boolean;
		title?: string;
		closeButton?: boolean;
		closeOnOutsideClick?: boolean;
		closeOnEscape?: boolean;
		maxWidth?: string;
	}

	let {
		open = $bindable(false),
		title,
		closeButton = true,
		closeOnOutsideClick = true,
		closeOnEscape = true,
		maxWidth = '600px',
		children
	}: Props & { children?: import('svelte').Snippet } = $props();

	let dialog: HTMLDivElement;
	let previousActiveElement: HTMLElement | null = null;

	const titleId = `modal-title-${Math.random().toString(36).slice(2)}`;

	function close() {
		open = false;
	}

	function handleBackdropClick(event: MouseEvent) {
		if (!closeOnOutsideClick) return;

		if (event.target === event.currentTarget) {
			close();
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && closeOnEscape) {
			event.preventDefault();
			close();
		}
	}

	$effect(() => {
		if (!open) return;

		previousActiveElement = document.activeElement as HTMLElement;

		const originalOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';

		tick().then(() => {
			dialog?.focus();
		});

		return () => {
			document.body.style.overflow = originalOverflow;

			previousActiveElement?.focus();
			previousActiveElement = null;
		};
	});
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
	<div
		class="modal-backdrop"
		role="presentation"
		onclick={handleBackdropClick}
	>
		<div
			bind:this={dialog}
			class="modal"
			role="dialog"
			aria-modal="true"
			aria-labelledby={title ? titleId : undefined}
			tabindex="-1"
			style={`--modal-max-width: ${maxWidth}`}
		>
			{#if closeButton}
				<button
					class="close-button"
					type="button"
					aria-label="Close modal"
					onclick={close}
				>
					<span aria-hidden="true">&times;</span>
				</button>
			{/if}

			{#if title}
				<h2 id={titleId}>{title}</h2>
			{/if}

			{#if children}
				{@render children()}
			{/if}
		</div>
	</div>
{/if}

<style>
	.modal-backdrop {
		position: fixed;
		inset: 0;
        margin: 0;
		z-index: 1000;

		display: flex;
		align-items: center;
		justify-content: center;

		padding: 1.5rem;

		background: rgb(0 0 0 / 0.45);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);

		animation: fade-in 150ms ease-out;
	}

	.modal {
		position: relative;

		width: min(100%, var(--modal-max-width));

		max-height: calc(100vh - 3rem);
		overflow-y: auto;

		padding: 2rem;

		background: var(--clr-dark);
		border-radius: 0.75rem;

		box-shadow:
			0 0 1rem var(--clr-primary);

		outline: none;

		animation: modal-in 150ms ease-out;
	}

	.close-button {
		position: absolute;
		top: 0.75rem;
		right: 0.75rem;

		display: grid;
		place-items: center;

		width: 2rem;
		height: 2rem;

		padding: 0;

		border: 0;
		border-radius: 50%;

		background: transparent;
		color: inherit;

		font-size: 1.75rem;
		line-height: 1;

		cursor: pointer;
	}

	.close-button:hover {
		background: rgb(0 0 0 / 0.08);
	}

	.close-button:focus-visible {
		outline: 2px solid currentColor;
		outline-offset: 2px;
	}

	@keyframes fade-in {
		from {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	}

	@keyframes modal-in {
		from {
			opacity: 0;
			transform: translateY(0.5rem) scale(0.98);
		}

		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.modal-backdrop,
		.modal {
			animation: none;
		}
	}
</style>