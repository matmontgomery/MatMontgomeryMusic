<script lang="ts">
	import Button from './Button.svelte';
	import { difficulty } from '$lib/data/difficulty';
	import { activeAudio } from '$lib/stores/activeAudio';
	import { resolve } from '$app/paths';

	let { composition } = $props();

	let audioElement: HTMLAudioElement | undefined = $state();
	let isPlaying = $state(false);
	let currentTime = $state(0);
	let duration = $state(0);

	let showBuyingOptions = $state(false);
	let buyingOptionsElement: HTMLDivElement;

	$effect(() => {
		if (!showBuyingOptions) return;

		function handleOutsideClick(event: MouseEvent) {
			if (buyingOptionsElement && !buyingOptionsElement.contains(event.target as Node)) {
				showBuyingOptions = false;
			}
		}

		document.addEventListener('click', handleOutsideClick);

		return () => {
			document.removeEventListener('click', handleOutsideClick);
		};
	});

	function toggleBuyingOptions() {
		showBuyingOptions = !showBuyingOptions;
	}

	async function togglePlayback() {
		if (!audioElement || !composition.recording) return;

		if (!audioElement.paused) {
			audioElement.pause();

			if ($activeAudio === audioElement) {
				activeAudio.set(null);
			}

			return;
		}

		// Tell all other composition cards to pause.
		activeAudio.set(audioElement);

		try {
			await audioElement.play();
		} catch (error) {
			if ($activeAudio === audioElement) {
				activeAudio.set(null);
			}

			console.error('Unable to play recording:', error);
		}
	}

	function openScore() {
		if (!composition.score) return;

		window.open(composition.score, '_blank', 'noopener,noreferrer');
	}

	// Pause this card whenever another card becomes active.
	$effect(() => {
		const active = $activeAudio;

		if (audioElement && active !== audioElement && !audioElement.paused) {
			audioElement.pause();
		}
	});

	function updateDuration() {
		if (!audioElement) return;

		if (Number.isFinite(audioElement.duration)) {
			duration = audioElement.duration;
		}
	}

	function seek(time: number) {
		if (!audioElement || !Number.isFinite(time)) return;

		audioElement.currentTime = time;
		currentTime = time;
	}

	function formatTime(seconds: number): string {
		if (!Number.isFinite(seconds)) return '0:00';

		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = Math.floor(seconds % 60);

		return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
	}
</script>

<div class="composition-card stack">
	<img src={composition.coverArt} alt={composition.title} />

	<div class="style-box">
		<p class="grade">{difficulty[composition.difficulty]}</p>
		<p class="style">{composition.styles[0]}</p>
	</div>

	<div class="card-info stack small">
		<h3 class="card-title">{composition.title}</h3>

		<h4 class="card-subtitle">
			{!composition.arranger ? `By ${composition.composer}` : `Arr. by ${composition.arranger}`}
		</h4>

		<p class="description">{composition.description}</p>

		<div class="cta-wrapper">
			<hr class="card-break" />
			<div class="cta-container stack small">
				<div class="price-box">
					<h4 class="price">${composition.price}</h4>
					<p>|</p>
					<div class="buying-options" bind:this={buyingOptionsElement}>
						<button
							class="buying-options-trigger"
							type="button"
							aria-expanded={showBuyingOptions}
							onclick={toggleBuyingOptions}
						>
							Buying Options
						</button>
						{#if showBuyingOptions}
							<div class="buying-options-menu">
								{#if composition.dapperPageUrl}
									<a
										href={composition.dapperPageUrl}
										target="_blank"
										rel="noopener noreferrer"
										onclick={() => (showBuyingOptions = false)}
									>
										Dapper Page
										<span aria-hidden="true">↗</span>
									</a>
								{/if}
								{#if composition.JWPepperUrl}
									<a
										href={composition.JWPepperUrl}
										target="_blank"
										rel="noopener noreferrer"
										onclick={() => (showBuyingOptions = false)}
									>
										J.W. Pepper
										<span aria-hidden="true">↗</span>
									</a>
								{/if}
								{#if !composition.dapperPageUrl && !composition.JWPepperUrl}
									<p class="no-options">No purchase links available.</p>
								{/if}
							</div>
						{/if}
					</div>
				</div>
				<div class="flex-group">
					<Button
						text={isPlaying ? 'Pause' : 'Listen'}
						secondary
						style="--size:var(--size--1)"
						onclick={togglePlayback}
						disabled={!composition.recording}
					/>
					<Button
						text="View Score"
						outline
						style="--size:var(--size--1)"
						onclick={openScore}
						disabled={!composition.score}
					/>
				</div>
				{#if composition.recording}
					<audio
						bind:this={audioElement}
						src={composition.recording}
						preload="metadata"
						onloadedmetadata={updateDuration}
						ondurationchange={updateDuration}
						onerror={() => {
							console.error('Audio failed to load:', composition.recording, audioElement?.error);
						}}
						onplay={() => (isPlaying = true)}
						onpause={() => (isPlaying = false)}
						onended={() => {
							isPlaying = false;
							currentTime = 0;

							if ($activeAudio === audioElement) {
								activeAudio.set(null);
							}
						}}
						ontimeupdate={() => {
							currentTime = audioElement?.currentTime ?? 0;
						}}
					></audio>
					<div
						class="progress"
						style={`--progress: ${duration > 0 ? (currentTime / duration) * 100 : 0}%`}
					>
						<div class="progress-track" aria-hidden="true">
							<div class="progress-fill"></div>
							<div class="progress-thumb"></div>
						</div>
						<input
							class="progress-input"
							type="range"
							min="0"
							max={duration || 0}
							step="0.1"
							value={Math.min(currentTime, duration || 0)}
							oninput={(event) => seek(Number(event.currentTarget.value))}
							disabled={!duration || !Number.isFinite(duration)}
							aria-label={`Seek through ${composition.title}`}
						/>
					</div>
					<p class="time-display">
						{formatTime(currentTime)} /
						{formatTime(audioElement?.duration ?? duration)}
					</p>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	.composition-card {
		background-color: var(--surface-container);
		border: 1px solid var(--surface-container-highest);
		border-radius: var(--border-radius-sm);
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}

	img {
		object-fit: contain;
		object-position: center 15%;
		aspect-ratio: 16 / 9;
	}

	.style-box {
		position: absolute;
		margin: 0;
		top: var(--space-2xs);
		left: var(--space-2xs);
		display: flex;
		gap: 0.5em;
	}

	.grade,
	.style {
		background-color: var(--clr-dark);
		font-size: var(--size--1);
		text-transform: uppercase;
		padding: 0.25em;
		border: 1px solid var(--outline);
		border-radius: var(--border-radius-sm);
		opacity: 0.9;
	}

	.grade {
		color: var(--clr-primary);
	}

	.card-info {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		flex-grow: 1;
	}

	.card-title {
		font-size: var(--size-1);
	}

	.card-subtitle {
		font-size: var(--size-0);
		color: var(--clr-primary);
		font-family: var(--font-body);
		font-weight: 400;
		text-transform: uppercase;
	}

	.description {
		font-size: var(--size-0);
	}

	.cta-wrapper {
		margin-top: auto;
	}

	.card-break {
		width: 100%;
		opacity: 0.1;
		margin-block-start: 1rem;
	}

	.price-box {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		gap: 0.5em;
	}

	.price {
		color: var(--clr-primary);
	}

	.buying-options {
		position: relative;
	}

	.buying-options-trigger {
		display: inline-flex;
		align-items: center;
		gap: 0.3em;
		padding: 0;
		border: 0;
		background: transparent;
		color: inherit;
		font-family: var(--font-body);
		text-decoration: none;
		text-underline-offset: 0.2em;
		cursor: pointer;
	}

	.buying-options-trigger:hover {
		text-decoration: underline;
	}

	.buying-options-menu {
		position: absolute;
		z-index: 10;
		top: calc(100% + 0.5rem);
		left: 0;
		min-width: 10rem;
		display: grid;
		padding: 0.35rem;
		background: var(--surface-container);
		border: 1px solid var(--surface-container-highest);
		border-radius: var(--border-radius-sm);
		box-shadow: 0 0.5rem 1.25rem rgb(0 0 0 / 15%);
	}

	.buying-options-menu a {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.6rem 0.75rem;
		border-radius: var(--border-radius-sm);
		color: inherit;
		text-decoration: none;
		white-space: nowrap;
	}

	.buying-options-menu a:hover,
	.buying-options-menu a:focus-visible {
		background: var(--surface-container-highest);
	}

	.no-options {
		padding: 0.6rem 0.75rem;
		font-size: var(--size--1);
		white-space: nowrap;
	}

	.progress {
		--thumb-size: 8px;

		position: relative;
		flex: 1;
		min-width: 0;
		height: 20px;
		display: flex;
		align-items: center;
		cursor: pointer;
	}

	/* The thin, understated track */
	.progress-track {
		position: absolute;
		left: calc(var(--thumb-size) / 2);
		right: calc(var(--thumb-size) / 2);
		height: 2px;
		background: var(--surface-container-highest);
		border-radius: 999px;
		pointer-events: none;
		transition: height 180ms ease;
	}

	.progress-fill {
		width: var(--progress);
		height: 100%;
		background: var(--clr-primary);
		border-radius: inherit;
	}

	/* Small, refined thumb — hidden until interaction */
	.progress-thumb {
		position: absolute;
		top: 50%;
		left: var(--progress);
		width: var(--thumb-size);
		height: var(--thumb-size);
		background: var(--clr-primary);
		border-radius: 50%;
		transform: translate(-50%, -50%) scale(0);
		opacity: 0;
		transition:
			transform 180ms ease,
			opacity 180ms ease;
	}

	/* Transparent range input handles all pointer and keyboard input */
	.progress-input {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		margin: 0;
		opacity: 0;
		cursor: pointer;
	}

	/* Reveal the thumb on hover or keyboard focus */
	.progress:hover .progress-thumb,
	.progress:focus-within .progress-thumb {
		transform: translate(-50%, -50%) scale(1);
		opacity: 1;
	}

	/* Subtle emphasis while interacting */
	.progress:hover .progress-track,
	.progress:focus-within .progress-track {
		height: 3px;
	}

	.progress-input:focus-visible {
		outline: 2px solid var(--clr-primary);
		outline-offset: 3px;
		border-radius: 4px;
	}

	.progress-input:disabled {
		cursor: default;
	}

	.progress:has(.progress-input:disabled) {
		cursor: default;
		opacity: 0.6;
	}

	.time-display {
		font-size: var(--size--1);
		font-variant-numeric: tabular-nums;
		opacity: 0.7;
		text-align: right;
	}
</style>
