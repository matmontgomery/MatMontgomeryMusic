<script>
	import Button from './Button.svelte';

	let { composition } = $props();
</script>

<div class="composition-card stack">
	<img src="/static/images/compositions/DPM16002_Cake Mix.jpg" alt={composition.title} />
	<div class="style-box">
		<p class="grade">{composition.difficulty}</p>
		<p class="style">{composition.styles[0]}</p>
	</div>
	<div class="card-info stack small">
		<h3 class="card-title">{composition.title}</h3>
		<h4 class="card-subtitle">{composition.arranger === '' ? `By ${composition.composer}` : `Arr. by ${composition.arranger}`}</h4>
		<p class="description">
			{composition.description}
		</p>
		<hr class="card-break" />
		<div class="price-box">
			<h4 class="price">${composition.price}</h4>
            <p>|</p>
			<a href="#">Buying Options</a>
		</div>
		<div class="flex-group">
			<Button text="Listen" secondary style="--size:var(--size--1)" />
			<Button text="View Score" outline style="--size:var(--size--1)" />
		</div>
	</div>
</div>

<style>
	.composition-card {
		background-color: var(--surface-container);
		border: 1px solid var(--surface-container-highest);
		border-radius: var(--border-radius-sm);
		position: relative;
	}

	img {
		object-fit: cover;
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

    .grade, .style {
        background-color: var(--clr-dark);
        font-size: var(--size--1);
        text-transform: uppercase;
        padding: 0.25em;
        border: 1px solid var(--outline);
        border-radius: var(--border-radius-sm);
    }

    .grade {
        color: var(--clr-primary);
    }

	.card-info {
		padding: 1rem;
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
</style>
