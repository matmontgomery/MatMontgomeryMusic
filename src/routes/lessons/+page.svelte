<script lang='ts'>
	import Hero from '$lib/components/layout/Hero.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import matTrumpet from '$lib/assets/mat_trumpet_1.avif';
	import matTrumpet2 from '$lib/assets/mat_trumpet_2.avif';
	import LessonForm from '$lib/components/ui/LessonForm.svelte';
	import { goto } from '$app/navigation';
</script>

<Hero
	text=
		"Mat has been teaching trumpet for over 20 years, 
		holding a WA state teaching certificate with an endorsement in music education. 
		He is dedicated to cultivation musicianship through disciplined technique, 
		incremental progress, and ongoing motivation.
		Mat currently teaches lessons in the greater Olympia area."
	background={matTrumpet}
>
	{#snippet titleContent()}
		<h1 class="title">Trumpet <span class="accent">Studio</span></h1>
	{/snippet}
	<Button text="Sign Up For Lessons" onclick={() => {goto('#book')}} />
</Hero>

<section id="pedegogy">
	<div class="container stack">
		<div class="pedagogy | stack small">
			<h2>Pedagogical Philosophy</h2>
			<p>
				Students are capable of reaching great heights and my role it to help them achieve their
				potential. Learning an instrument can be difficult. Progress happens incrementally over
				time. Staying motivated throughout is key. Let's celebrate each victory along the way as the
				students continue on the path to excellence.
			</p>
		</div>
		<div class="bento-box">
			<div class="technical stack small" style:--background={`url(${matTrumpet2})`}>
				<h3 class="color-primary">Technical Foundation</h3>
				<p>
					Technical ability allows the student to play the music that they want. Breath control,
					articulation, range, and speed are worked on each week.
				</p>
			</div>
			<div class="honors">
				<img src="" alt="" />
				<h3>Student Honors</h3>
				<ul>
					<li>All-State Jazz Band</li>
					<li>All-State Concert Band</li>
					<li>State Solo & Ensemble Finalists</li>
				</ul>
			</div>
			<div class="certified stack small">
				<img src="" alt="" />
				<h3>Certified Instruction</h3>
				<p>
					As a certified music educator, Mat has spent more than two decades he has been honing his
					craft as a music educator.
				</p>
			</div>
			<div class="inspiration">
				<blockquote>
					“The mediocre teacher tells. The good teacher explains. The superior teacher demonstrates.
					The great teacher inspires.”
				</blockquote>
				<p class="attr">- William Arthur Ward</p>
			</div>
		</div>
	</div>
</section>

<section id="packages" class="section-light">
	<div class="container stack">
		<div class="stack small | packages-text">
			<h2 class="text-align-center">Lesson Packages</h2>
			<p class="text-align-center">
				Instructional tiers designed for students at varying stages of their musical development.
				Studio spots are limited.
			</p>
		</div>
		<div class="switcher" style="--min-card-width: 300px;">
			<div class="lesson-card">
				<h3>Weekly 60 Min</h3>
				<p>Weekly 60-minute private lessons. Comprehensive training for advanced learners.</p>
				<h3><span class="price">$250</span>/mo</h3>
				<hr class="card-break" />
				<ul>
					<li>Individual instruction</li>
					<li>Fundamentals and beyond</li>
					<li>Advanced technical skills</li>
					<li>All-State or solo prep</li>
					<li>Great for advanced high school players</li>
				</ul>
				<Button text="Book Now" secondary onclick={() => {goto('#book')}} />
			</div>
			<div class="lesson-card featured">
				<h3>Weekly 30 Min</h3>
				<p>Weekly 30-minute private lessons. Most popular choice. Ideal for most players.</p>
				<h3><span class="price">$140</span>/mo</h3>
				<hr class="card-break" />
				<ul>
					<li>Individual instruction</li>
					<li>Focus on the fundamentals</li>
					<li>Jazz or classical</li>
					<li>All-State or solo prep</li>
					<li>Great for elementary through high school players</li>
				</ul>
				<Button text="Book Now" onclick={() => {goto('#book')}} />
			</div>
			<div class="lesson-card">
				<h3>Custom Clinic</h3>
				<p>Hire Mat to help inspire and educate your trumpets, bands, and jazzers.
                    
                </p>
				<h3 class="price">$Custom</h3>
				<hr class="card-break" />
				<ul>
					<li>Sectional coaching</li>
					<li>Masterclasses</li>
					<li>Improv workshops</li>
                    <li>Guest clinics</li>
				</ul>
				<Button text="Inquire" outline onclick={() => {goto('/contact')}} />
			</div>
		</div>
	</div>
</section>

<section id="book">
    <div class="container">
        <div class="book-text">
            <h2>Book A Lesson</h2>
            <p>Lessons are currently available. Contact Mat to book your lessons today. Space is limited.</p>
        </div>
        <LessonForm noHeader />
    </div>
</section>

<style>
	p {
		font-size: var(--size-0);
	}

	.section-light {
		background-color: var(--surface-container);
		padding-block: var(--space-2xl);
	}

	.pedagogy {
		width: min(100%, 800px);
		margin-inline: auto;
	}

	.bento-box {
		width: min(100%, 800px);
		margin-inline: auto;
		display: grid;
		gap: 1rem;
		grid-template-areas:
			'technical'
			'honors'
			'certified'
			'inspiration';
	}

	@media (min-width: 700px) {
		.bento-box {
			grid-template-areas:
				'technical technical honors'
				'certified inspiration inspiration';
		}
	}

	.bento-box > div {
		padding: 1rem;
		box-shadow: var(--box-shadow-sm);
		background-color: var(--surface-container);
		border-radius: var(--border-radius-sm);
	}

	.bento-box h3 {
		font-size: var(--size-0);
	}

	.bento-box p {
		font-size: var(--size--1);
	}

	.technical {
		grid-area: technical;
		background: linear-gradient(90deg, hsl(0 0 0 / 0.5), var(--clr-dark) 80%), var(--background);
		background-position: center 15%;
		background-size: cover;
		background-repeat: no-repeat;
		padding-top: var(--space-2xl) !important;
	}

	.technical > h3 {
		font-style: italic;
	}

	.honors {
		grid-area: honors;
	}

	.honors li {
		font-family: var(--font-body);
		opacity: 0.65;
	}

	.honors li::marker {
		content: '✔ ';
		color: var(--clr-primary);
	}

	.certified {
		grid-area: certified;
	}

	.certified h3 {
		color: var(--clr-secondary);
	}

	.inspiration {
		grid-area: inspiration;
		background-color: var(--surface-container-highest) !important;
		display: flex;
		flex-direction: column;
		justify-content: center;
        padding: 2rem !important;
	}

	blockquote {
		font-family: var(--font-display);
        font-size: var(--size-0);
		font-style: italic;
		text-align: center;
        opacity: 0.8;
	}

	.attr {
		color: var(--clr-primary);
		text-align: center;
	}

    .packages-text {
        width: min(100%, 600px);
        margin-inline: auto;
    }

	.lesson-card {
		background-color: var(--clr-dark);
		padding: 2rem;
		border-radius: var(--border-radius-md);
		border: 1px solid var(--surface-container-highest);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 1rem;
		scale: 0.95;
	}

	.lesson-card li::marker {
		content: '✔ ';
		color: var(--clr-primary);
	}

	.lesson-card h3 {
		font-size: var(--size-1);
	}

	.card-break {
		width: 95%;
		opacity: 0.25;
	}

	.lesson-card.featured {
		scale: 1.01;
		background-color: var(--surface-container-highest);
		border: 0.25em solid var(--clr-primary);
		position: relative;
	}

	.lesson-card.featured::after {
		content: 'Most Popular';
		text-transform: uppercase;
		font-family: var(--font-body);
		background-color: var(--clr-primary);
		color: var(--clr-dark);
		padding: 0.25em 1em;
		border-radius: 0 8px 0 var(--border-radius-md);
		position: absolute;
		top: -1px;
		right: -1px;
	}

	.lesson-card.featured h3:first-of-type {
		color: var(--clr-primary);
	}

    .book-text {
        width: min(100%, 500px);
    }
</style>
