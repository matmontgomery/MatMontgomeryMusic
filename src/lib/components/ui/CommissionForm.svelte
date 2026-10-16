<script lang="ts">
	import Button from './Button.svelte';
	import Turnstile from './Turnstile.svelte';

	let name = $state('');
	let email = $state('');
	let school = $state('');
	let difficulty = $state('');
	let timeline = $state('');
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

			name = '';
			email = '';
			school = '';
			difficulty = '';
			timeline = '';
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
		<div class="stack small">
			<h3 class="color-primary">Inquire About a Commission</h3>
			<p>Fill out the form bellow to receive a custom project timeline and quote, or to schedule an exploratory call.</p>
		</div>
	{/if}

	<form onsubmit={handleSubmit}>
		<input type="hidden" name="formType" value="commission">
		<!-- Honeypot -->
		<div class="honeypot" aria-hidden="true">
			<label for="website">Website</label>
			<input id="website" name="website" type="text" tabindex="-1" autocomplete="off" />
		</div>

		<div>
			<label for="name">Director Name</label>

			<input id="name" name="name" type="text" bind:value={name} autocomplete="name" required />
		</div>

		<div>
			<label for="school">School/Organization</label>

			<input id="school" name="school" type="text" bind:value={school} autocomplete="organization" required />
		</div>
		
		<div>
			<label for="email">Email Address</label>
			
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
			<label for="difficulty">Difficulty</label>

			<select id="difficulty" name="difficulty" bind:value={difficulty} required>
				<option value="">Select a difficulty</option>
				<option value="Easy">Easy</option>
				<option value="Medium-Easy">Medium-Easy</option>
				<option value="Medium">Medium</option>
				<option value="Medium-Advanced">Medium-Advanced</option>
				<option value="Advanced">Advanced</option>
			</select>
		</div>

		<div>
			<label for="timeline">Timeline</label>

			<select id="timeline" name="timeline" bind:value={timeline} required>
				<option value="">Select a timeline</option>
				<option value="Rush">Within 2-3 Months (Rush)</option>
				<option value="Standard">4-9 Months</option>
				<option value="Long">Over 9 Months</option>
			</select>
		</div>

		<div>
			<label for="message">Commission Vision</label>

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
				text={status === 'sending' ? 'Submitting...' : 'Submit Commission Inquiry'}
				--size="var(--size--1)"
			/>
		</div>
	</form>
</div>

<style>
	.contact-wrapper {
        background-color: var(--surface-container);
        border: 1px solid var(--outline-variant);
        border-radius: var(--border-radius-sm);
		padding: 1rem;
    }

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
		color: var(--error);
	}

	.send {
		margin-bottom: 0.5em;
	}

	.honeypot {
		position: absolute;
		left: -9999px;
		width: 1px;
		height: 1px;
		overflow: hidden;
	}
</style>
