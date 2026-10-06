<script>
	import Button from './Button.svelte';
	import matTrumpet from '$lib/assets/mat_trumpet_1.avif';
</script>

<div class="composition-card stack">
	<img src={matTrumpet} alt="" />
	<div class="style-box">
		<p class="grade">Med-Advanced</p>
		<p class="style">Modern Rock</p>
	</div>
	<div class="card-info stack small">
		<h3 class="card-title">Ain't No Time</h3>
		<h4 class="card-subtitle">Modern Rock</h4>
		<p class="description">
			Inspired by dubstep, this moder rock piece will get your band's juices flowing.
		</p>
		<hr class="card-break" />
		<div class="price-box">
			<h4 class="price">$50</h4>
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
