<script lang="ts">
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

</style>
