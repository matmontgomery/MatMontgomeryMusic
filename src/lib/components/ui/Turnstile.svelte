<script lang="ts">
	import { onMount } from 'svelte';
	import { PUBLIC_TURNSTILE_SITE_KEY } from '$env/static/public';

	interface Props {
		onToken?: (token: string) => void;
		onError?: () => void;
		onExpired?: () => void;
	}

	let { onToken, onError, onExpired }: Props = $props();

	let container: HTMLDivElement;

	let widgetId: string | null = null;

	type Turnstile = {
		render: (
			element: HTMLElement,
			options: {
				sitekey: string;
				theme?: 'auto' | 'light' | 'dark';
				appearance?: 'always' | 'execute' | 'interaction-only';
				callback?: (token: string) => void;
				'expired-callback'?: () => void;
				'error-callback'?: () => void;
			}
		) => string;
		reset: (widgetId?: string) => void;
	};

	declare global {
		interface Window {
			turnstile?: Turnstile;
		}
	}

	onMount(() => {
		if (!PUBLIC_TURNSTILE_SITE_KEY) {
			return;
		}

		const renderWidget = () => {
			if (!window.turnstile || !container || widgetId !== null) {
				return;
			}

			widgetId = window.turnstile.render(container, {
				sitekey: PUBLIC_TURNSTILE_SITE_KEY,
				theme: 'auto',
				appearance: 'interaction-only',

				callback: (token) => {
					onToken?.(token);
				},

				'expired-callback': () => {
					onExpired?.();
				},

				'error-callback': () => {
					onError?.();
				}
			});
		};

		if (window.turnstile) {
			renderWidget();
			return;
		}

		const interval = window.setInterval(() => {
			if (window.turnstile) {
				window.clearInterval(interval);
				renderWidget();
			}
		}, 100);

		return () => window.clearInterval(interval);
	});

	export function reset() {
		if (window.turnstile && widgetId !== null) {
			window.turnstile.reset(widgetId);
		}
	}
</script>

<svelte:head>
	<script
		src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
		async
		defer
	></script>
</svelte:head>

{#if PUBLIC_TURNSTILE_SITE_KEY}
	<div bind:this={container}></div>
{/if}