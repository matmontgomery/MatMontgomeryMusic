import { json } from '@sveltejs/kit';
import nodemailer from 'nodemailer';
import {
	SMTP_HOST,
	SMTP_PORT,
	SMTP_USER,
	SMTP_PASS,
	SMTP_FROM,
	CONTACT_EMAIL,
	TURNSTILE_SECRET_KEY
} from '$env/static/private';

const transporter = nodemailer.createTransport({
	host: SMTP_HOST,
	port: Number(SMTP_PORT),
	secure: Number(SMTP_PORT) === 465,
	auth: {
		user: SMTP_USER,
		pass: SMTP_PASS
	}
});

async function verifyTurnstile(token: string, request: Request) {
	if (!TURNSTILE_SECRET_KEY) {
		return true;
	}

	const ip =
		request.headers.get('CF-Connecting-IP') ??
		request.headers.get('X-Forwarded-For') ??
		undefined;

	const body = {
		secret: TURNSTILE_SECRET_KEY,
		response: token,
		...(ip ? { remoteip: ip } : {})
	};

	try {
		const response = await fetch(
			'https://challenges.cloudflare.com/turnstile/v0/siteverify',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(body)
			}
		);

		if (!response.ok) {
			return false;
		}

		const result = await response.json();

		return result.success === true;
	} catch (error) {
		console.error('Turnstile verification failed:', error);
		return false;
	}
}

export async function POST({ request }) {
	try {
		const formData = await request.formData();

		const name = String(formData.get('name') ?? '').trim();
		const email = String(formData.get('email') ?? '').trim();
		const message = String(formData.get('message') ?? '').trim();

		// Honeypot
		const website = String(formData.get('website') ?? '').trim();

		// Turnstile
		const turnstileToken = String(
			formData.get('cf-turnstile-response') ?? ''
		).trim();

		/*
		 * Honeypot:
		 *
		 * Real visitors should never fill this field.
		 * Silently report success so bots don't learn that
		 * they've been caught.
		 */
		if (website) {
			return json({ success: true });
		}

		// Basic validation
		if (!name || !email || !message) {
			return json(
				{
					success: false,
					error: 'Please fill out all required fields.'
				},
				{ status: 400 }
			);
		}

		// Basic email validation
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!emailPattern.test(email)) {
			return json(
				{
					success: false,
					error: 'Please enter a valid email address.'
				},
				{ status: 400 }
			);
		}

		/*
		 * Turnstile is optional in the starter.
		 *
		 * If TURNSTILE_SECRET_KEY exists, Turnstile becomes
		 * required for this endpoint.
		 */
		if (TURNSTILE_SECRET_KEY) {
			if (!turnstileToken) {
				return json(
					{
						success: false,
						error: 'Please complete the verification and try again.'
					},
					{ status: 400 }
				);
			}

			const validTurnstile = await verifyTurnstile(
				turnstileToken,
				request
			);

			if (!validTurnstile) {
				return json(
					{
						success: false,
						error: 'Verification failed. Please try again.'
					},
					{ status: 400 }
				);
			}
		}

		// Notification email to the client
		await transporter.sendMail({
			from: SMTP_FROM,
			to: CONTACT_EMAIL,
			replyTo: email,
			subject: `New contact form message from ${name}`,
			text: `
Name: ${name}
Email: ${email}

Message:

${message}
			`.trim(),
			html: `
				<h2>New Contact Form Message</h2>

				<p><strong>Name:</strong> ${escapeHtml(name)}</p>
				<p><strong>Email:</strong> ${escapeHtml(email)}</p>

				<h3>Message</h3>

				<p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
			`
		});

		// Confirmation email to the visitor
		await transporter.sendMail({
			from: SMTP_FROM,
			to: email,
			subject: 'Thanks for contacting us',
			text: `
Hi ${name},

Thanks for getting in touch. We've received your message and will get back to you as soon as possible.

Your message:

${message}

Thanks!
			`.trim(),
			html: `
				<p>Hi ${escapeHtml(name)},</p>

				<p>
					Thanks for getting in touch. We've received your
					message and will get back to you as soon as possible.
				</p>

				<p><strong>Your message:</strong></p>

				<p>
					${escapeHtml(message).replace(/\n/g, '<br>')}
				</p>

				<p>Thanks!</p>
			`
		});

		return json({ success: true });
	} catch (error) {
		console.error('Contact form error:', error);

		return json(
			{
				success: false,
				error: 'Something went wrong. Please try again later.'
			},
			{ status: 500 }
		);
	}
}

function escapeHtml(value: string) {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#039;');
}