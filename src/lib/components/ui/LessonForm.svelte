<script lang="ts">
	import Button from './Button.svelte';
	import Turnstile from './Turnstile.svelte';

	let stuName = $state('');
	let age = $state('');
	let parentName = $state('');
	let parent2Name = $state('');
	let email = $state('');
	let phone = $state('');
	let message = $state('');

	let status = $state<'idle' | 'sending' | 'success' | 'error'>('idle');
	let errorMessage = $state('');

	let turnstileToken = $state('');

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();

		status = 'sending';
		errorMessage = '';

		const form = event.currentTarget as HTMLFormElement;
		const formData = new FormData(form);

		// Add the Turnstile token explicitly.
		if (turnstileToken) {
			formData.set('cf-turnstile-response', turnstileToken);
		}

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				body: formData
			});

			const result = await response.json();

			if (!response.ok || !result.success) {
				throw new Error(result.error ?? 'Something went wrong. Please try again.');
			}

			status = 'success';

			stuName = '';
			email = '';
			message = '';
			turnstileToken = '';
		} catch (error) {
			status = 'error';

			errorMessage =
				error instanceof Error ? error.message : 'Something went wrong. Please try again.';
		}
	}

	function handleTurnstileToken(token: string) {
		turnstileToken = token;
	}

	function handleTurnstileExpired() {
		turnstileToken = '';
	}

	function handleTurnstileError() {
		turnstileToken = '';
	}

	let { noHeader = false }: { noHeader?: boolean } = $props();
</script>

<div class="contact-wrapper">
	{#if !noHeader}
		<h2>Contact</h2>
		<p>We look forward to hearing from you. We aim to reply within 1-2 business days.</p>
	{/if}

	<form onsubmit={handleSubmit}>
		<!-- Honeypot -->
		<div class="honeypot" aria-hidden="true">
			<label for="website">Website</label>
			<input id="website" name="website" type="text" tabindex="-1" autocomplete="off" />
		</div>

		<div>
			<label for="student-name">Student Name</label>

			<input id="student-name" name="student-name" type="text" bind:value={stuName} required />
		</div>

		<div>
			<label for="age">Age</label>

			<input id="age" name="age" type="text" bind:value={age} required />
		</div>

		<div>
			<label for="parent-name">Parent Name</label>

			<input
				id="parent-name"
				name="parent-name"
				type="text"
				bind:value={parentName}
				autocomplete="name"
				required
			/>
		</div>

		<div>
			<label for="parent-name-2">Additional Parent Name (opt.)</label>

			<input id="parent-name-2" name="parent-name-2" type="text" bind:value={parent2Name} />
		</div>

		<div>
			<label for="email">Email</label>

			<input
				id="email"
				name="email"
				type="email"
				bind:value={email}
				autocomplete="email"
				required
			/>
		</div>

		<div>
			<label for="phone">Phone</label>

			<input
				id="phone"
				name="phone"
				type="tel"
				bind:value={phone}
				autocomplete="tel"
				required
			/>
		</div>

		<div>
			<label for="message">Message</label>

			<textarea id="message" name="message" bind:value={message} rows="6" required></textarea>
		</div>

		<Turnstile
			onToken={handleTurnstileToken}
			onExpired={handleTurnstileExpired}
			onError={handleTurnstileError}
		/>

		{#if status === 'success'}
			<p class="success" role="status">Thanks for contacting us! Your message has been sent.</p>
		{/if}

		{#if status === 'error'}
			<p class="error" role="alert">
				{errorMessage}
			</p>
		{/if}

		<div class="send">
			<Button
				type="submit"
				disabled={status === 'sending'}
				text={status === 'sending' ? 'Sending...' : 'Send'}
				--size="var(--size--1)"
			/>
		</div>
	</form>
</div>

<style>
	h2 {
		margin: 0;
	}

	p {
		font-size: var(--size-0);
	}

	form {
		width: min(100%, 400px);
		margin-inline: auto;
		margin-block-start: var(--space-l);
		display: grid;
		gap: 1.25rem;
	}

	form > div:not(.honeypot) {
		display: grid;
		gap: 0.5rem;
	}

	textarea {
		resize: vertical;
	}

	.success {
		margin: 0;
	}

	.error {
		margin: 0;
	}

	.send {
		display: flex;
		justify-content: flex-start;
	}

	.honeypot {
		position: absolute;
		left: -9999px;
		width: 1px;
		height: 1px;
		overflow: hidden;
	}
</style>
