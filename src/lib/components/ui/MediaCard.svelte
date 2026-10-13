<!-- <script lang="ts">
    import logo from '$lib/assets/favicon.svg'
	let { background=logo }: { background?: string } = $props();
</script>

<div class="media-card" style:--image={background ? `url(${background})` : undefined}>
	<div class="details stack">
		<div class="stack small">
            <p class="label">Live Recording</p>
            <p class="media-title">Hummel: Trumpet Concerto in E-flat Major</p>
        </div>
		<div class="player-controls">
            <div class="play-pause"></div>
            <div class="progress-bar"></div>
            <p class="time">1:42/4:30</p>
        </div>
	</div>
</div>

<style>
	.media-card {
		min-height: 200px;
		display: flex;
		flex-direction: column;
		justify-content: end;
		background: var(--image);
		background-position: center 15%;
		background-size: cover;
		background-repeat: no-repeat;
        box-shadow: var(--box-shadow-sm);
	}

	.details {
        padding: 1rem;
		margin-top: 160px;
        background-color: var(--surface-container);
	}

	.label {
		color: var(--clr-secondary);
        background-color: var(--surface-container-highest);
        width: fit-content;
        font-size: var(--size--1);
        padding: 0.1em 0.5em;
        border-radius: var(--border-radius-sm);
        text-transform: uppercase;
	}

    .media-title {
        font-size: var(--size-0);
    }

    .player-controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    }

    .play-pause {
        width: 28px;
        aspect-ratio: 1;
        background-color: var(--surface-container-highest);
        border-radius: var(--border-radius-sm);
        box-shadow: var(--box-shadow-sm);
    }

    .progress-bar {
        flex-grow: 1;
        height: 5px;
        background-color: var(--surface-container-highest);
        border-radius: var(--border-radius-sm);
        position: relative;
    }

    .progress-bar::after {
        content: '';
        position: absolute;
        width: 30%;
        height: 100%;
        background-color: var(--clr-primary);
        border-radius: var(--border-radius-sm);
    }

    .time {
        font-size: var(--size--1);
    }

</style> -->


<script lang="ts">
	import logo from '$lib/assets/favicon.svg';

	type MediaType = 'audio' | 'youtube';

	interface Props {
		type?: MediaType;
		src: string;
		title: string;
		label?: string;
		background?: string;
		artist?: string;
	}

	let {
		type = 'audio',
		src,
		title,
		label = 'Live Recording',
		background = logo,
		artist
	}: Props = $props();

	let audioEl: HTMLAudioElement;
	let isPlaying = $state(false);
	let currentTime = $state(0);
	let duration = $state(0);

	const youtubeId = $derived(getYoutubeId(src));

	function getYoutubeId(url: string): string | null {
		try {
			const parsed = new URL(url);

			if (parsed.hostname === 'youtu.be') {
				return parsed.pathname.slice(1).split('/')[0] || null;
			}

			if (
				parsed.hostname === 'youtube.com' ||
				parsed.hostname === 'www.youtube.com' ||
				parsed.hostname === 'm.youtube.com'
			) {
				if (parsed.pathname === '/watch') {
					return parsed.searchParams.get('v');
				}

				const match = parsed.pathname.match(
					/^\/(?:embed|shorts)\/([^/]+)/
				);

				return match?.[1] ?? null;
			}
		} catch {
			return null;
		}

		return null;
	}

	function togglePlayback() {
		if (!audioEl) return;

		if (audioEl.paused) {
			void audioEl.play();
		} else {
			audioEl.pause();
		}
	}

	function seek(time: number) {
		if (!audioEl || !Number.isFinite(time)) return;

		audioEl.currentTime = time;
		currentTime = time;
	}

	function formatTime(seconds: number): string {
		if (!Number.isFinite(seconds) || seconds < 0) return '0:00';

		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = Math.floor(seconds % 60);

		return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
	}
</script>

<article
	class="media-card"
	style:--image={background ? `url("${background}")` : 'none'}
>
	{#if type === 'youtube'}
		<div class="video-container">
			{#if youtubeId}
				<iframe
					src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
					title={title}
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					referrerpolicy="strict-origin-when-cross-origin"
					allowfullscreen
				></iframe>
			{:else}
				<p class="video-error">Please provide a valid YouTube URL.</p>
			{/if}
		</div>
	{/if}

	<div class="details stack">
        <p class="label" class:video={type === 'youtube'}>{label}</p>
		<div class="text stack small">
			<h2 class="media-title">{title}</h2>

			{#if artist}
				<p class="artist">{artist}</p>
			{/if}
		</div>

		{#if type === 'audio'}
			<audio
				bind:this={audioEl}
				src={src}
				preload="metadata"
				onplay={() => (isPlaying = true)}
				onpause={() => (isPlaying = false)}
				ontimeupdate={() => (currentTime = audioEl.currentTime)}
				onloadedmetadata={() => (duration = audioEl.duration)}
				onended={() => (isPlaying = false)}
			></audio>

			<div class="player-controls">
				<button
					class="play-pause"
					type="button"
					onclick={togglePlayback}
					aria-label={isPlaying ? 'Pause recording' : 'Play recording'}
				>
					{#if isPlaying}
						<svg viewBox="0 0 24 24" aria-hidden="true">
							<path d="M8 5h3v14H8zM15 5h3v14h-3z" fill="currentColor" />
						</svg>
					{:else}
						<svg viewBox="0 0 24 24" aria-hidden="true">
							<path d="M7 4v16l13-8z" fill="currentColor" />
						</svg>
					{/if}
				</button>

				<input
					class="progress-bar"
					type="range"
					min="0"
					max={duration || 0}
					step="0.1"
					value={Math.min(currentTime, duration || 0)}
					oninput={(event) => seek(Number(event.currentTarget.value))}
					disabled={!duration}
					aria-label="Recording progress"
					style={`--progress: ${duration ? (currentTime / duration) * 100 : 0}%`}
				/>

				<p class="time">
					{formatTime(currentTime)}/{formatTime(duration)}
				</p>
			</div>
		{/if}
	</div>
</article>

<style>
	.media-card {
		min-width: 0;
		min-height: 320px;
		display: flex;
		flex-direction: column;
		justify-content: end;
		background-color: var(--surface-container);
		background-image:
			linear-gradient(transparent 15%, var(--clr-primary)),
			var(--image);
		background-position: center, center 15%;
		background-size: cover;
		background-repeat: no-repeat;
		box-shadow: var(--box-shadow-sm);
		overflow: hidden;
	}

	.details {
		padding: 1rem;
		margin-top: auto;
		background-color: var(--surface-container);
	}

    .details > .text {
        border-left: 1px solid var(--outline);
        padding-left: 1em;
    }

	.label {
		color: var(--clr-secondary);
		background-color: var(--surface-container-highest);
		width: fit-content;
		font-size: var(--size--1);
		padding: 0.1em 0.5em;
		border-radius: var(--border-radius-sm);
		text-transform: uppercase;
	}

    .label.video {
        position: relative;
    }

	.media-title {
		font-size: var(--size-0);
	}

	.artist {
		font-size: var(--size--1);
		color: var(--clr-secondary);
	}

	.player-controls {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
	}

	.play-pause {
		width: 32px;
		aspect-ratio: 1;
		flex-shrink: 0;
		display: grid;
		place-items: center;
		padding: 0.3rem;
		color: var(--clr-primary);
		background-color: var(--surface-container-highest);
		border: none;
		border-radius: var(--border-radius-sm);
		box-shadow: var(--box-shadow-sm);
		cursor: pointer;
	}

	.play-pause svg {
		width: 100%;
		height: 100%;
	}

	.play-pause:focus-visible,
	.progress-bar:focus-visible {
		outline: 2px solid var(--clr-primary);
		outline-offset: 3px;
	}

	.progress-bar {
		flex: 1;
		min-width: 0;
		height: 5px;
		appearance: none;
		-webkit-appearance: none;
		background: var(--surface-container-highest);
		background-image: linear-gradient(
			var(--clr-primary),
			var(--clr-primary)
		);
		background-size: var(--progress) 100%;
		background-repeat: no-repeat;
		border-radius: var(--border-radius-sm);
		cursor: pointer;
	}

	.progress-bar::-webkit-slider-thumb {
		appearance: none;
		-webkit-appearance: none;
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: var(--clr-primary);
	}

	.progress-bar::-moz-range-thumb {
		width: 12px;
		height: 12px;
		border: none;
		border-radius: 50%;
		background: var(--clr-primary);
	}

	.progress-bar:disabled {
		cursor: default;
		opacity: 0.6;
	}

	.time {
		font-size: var(--size--1);
		font-variant-numeric: tabular-nums;
		white-space: nowrap;
	}

	.video-container {
		position: relative;
		width: 100%;
		aspect-ratio: 16 / 9;
		background: #000;
	}

	.video-container iframe {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		border: 0;
	}

	.video-error {
		color: var(--clr-secondary);
		padding: 1rem;
	}
</style>