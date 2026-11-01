import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
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

type FieldConfig = {
	key: string;
	label: string;
	required?: boolean;
};

type FormConfig = {
	clientSubject: string;
	confirmationSubject: string;
	confirmationMessage: string;
	senderNameField: string;
	fields: FieldConfig[];
};

const FORM_CONFIG: Record<string, FormConfig> = {
	general: {
		clientSubject: 'New general contact message',
		confirmationSubject: 'Thanks for contacting Mat',
		confirmationMessage:
			"Thanks so much for reaching out to me! I got your message and I'll get back to you soon. Thanks!",
		senderNameField: 'name',
		fields: [
			{ key: 'name', label: 'Name', required: true },
			{ key: 'email', label: 'Email', required: true },
			{ key: 'message', label: 'Message', required: true }
		]
	},

	contactPage: {
		clientSubject: 'New',
		confirmationSubject: 'Thanks for contacting Mat',
		confirmationMessage:
			"Thanks so much for reaching out to me! I got your message and I'll get back to you soon. Thanks!",
		senderNameField: 'name',
		fields: [
			{ key: 'name', label: 'Name', required: true },
			{ key: 'email', label: 'Email', required: true },
			{ key: 'subject', label: 'Subject', required: true },
			{ key: 'message', label: 'Message', required: true }
		]
	},

	lesson: {
		clientSubject: 'New trumpet lesson inquiry',
		confirmationSubject: 'Trumpet Lessons with Mat Montgomery',
		confirmationMessage:
			"Thanks for reaching out about trumpet lessons! I got your message and I'll be in touch soon to go over details, answer any questions, and schedule the lessons. Thanks!",
		senderNameField: 'parentName',
		fields: [
			{ key: 'parentName', label: 'Parent/Guardian Name', required: true },
			{ key: 'parent2Name', label: 'Additional Parent/Guardian Name', required: false },
			{ key: 'phone', label: 'Phone', required: true },
			{ key: 'email', label: 'Email', required: true },
			{ key: 'studentName', label: 'Student Name', required: true },
			{ key: 'age', label: 'Age', required: true },
			{ key: 'message', label: 'Message' }
		]
	},

	commission: {
		clientSubject: 'New commission inquiry',
		confirmationSubject: 'Custom Commission by Mat Montgomery',
		confirmationMessage:
			"Thanks for reaching out about a commission! I'll be in touch soon to go over the project details together.",
		senderNameField: 'name',
		fields: [
			{ key: 'name', label: 'Name', required: true },
			{ key: 'school', label: 'School/Organization', required: true },
			{ key: 'email', label: 'Email', required: true },
			{ key: 'difficulty', label: 'Difficulty', required: true },
			{ key: 'message', label: 'Commission Vision', required: true },
			{ key: 'timeline', label: 'Desired Timeline', required: true }
		]
	}
};

async function verifyTurnstile(token: string, request: Request) {
	if (!TURNSTILE_SECRET_KEY) return true;

	const ip =
		request.headers.get('CF-Connecting-IP') ?? request.headers.get('X-Forwarded-For') ?? undefined;

	const body = {
		secret: TURNSTILE_SECRET_KEY,
		response: token,
		...(ip ? { remoteip: ip } : {})
	};

	try {
		const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body)
		});

		if (!response.ok) return false;

		const result = await response.json();
		return result.success === true;
	} catch (error) {
		console.error('Turnstile verification failed:', error);
		return false;
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

function formatHtml(value: string) {
	return escapeHtml(value).replace(/\r?\n/g, '<br>');
}

export const POST: RequestHandler = async ({ request }) => {
	try {
		const formData = await request.formData();

		// Honeypot
		const website = String(formData.get('website') ?? '').trim();

		if (website) {
			return json({ success: true, successMessage: 'Thanks a million!!!!!' });
		}

		// Identify the form
		const formType = String(formData.get('formType') ?? '');

		if (!Object.hasOwn(FORM_CONFIG, formType)) {
			return json({ success: false, error: 'Invalid form submission.' }, { status: 400 });
		}

		const config = FORM_CONFIG[formType];

		// Read only the fields allowed for this form
		const values: Record<string, string> = {};

		for (const field of config.fields) {
			values[field.key] = String(formData.get(field.key) ?? '').trim();
		}

		// Validate required fields
		const missingField = config.fields.find((field) => field.required && !values[field.key]);

		if (missingField) {
			return json(
				{
					success: false,
					error: `Please provide ${missingField.label.toLowerCase()}.`
				},
				{ status: 400 }
			);
		}

		const email = values.email;
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!emailPattern.test(email)) {
			return json(
				{ success: false, error: 'Please enter a valid email address.' },
				{ status: 400 }
			);
		}

		// Turnstile is required whenever a secret key is configured
		const turnstileToken = String(formData.get('cf-turnstile-response') ?? '').trim();

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

			const validTurnstile = await verifyTurnstile(turnstileToken, request);

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

		const senderName = values[config.senderNameField] || 'Website visitor';

		// Format the submitted fields for both email formats
		const submittedFields = config.fields
			.filter((field) => values[field.key])
			.map((field) => ({
				label: field.label,
				value: values[field.key]
			}));

		const plainDetails = submittedFields
			.map(({ label, value }) => `${label}: ${value}`)
			.join('\n\n');

		const htmlDetails = submittedFields
			.map(
				({ label, value }) =>
					`<p><strong>${escapeHtml(label)}:</strong><br>${formatHtml(value)}</p>`
			)
			.join('');

		// Email the client
		await transporter.sendMail({
			from: SMTP_FROM,
			to: CONTACT_EMAIL,
			replyTo: email,
			subject: `${
				formType === 'contactPage'
					? `${config.clientSubject} ${values.subject} message`
					: config.clientSubject
			} — ${senderName.replace(/[\r\n]+/g, ' ')}`,
			text: plainDetails,
			html: `
			<h2>${escapeHtml(
				`${
					formType === 'contactPage'
						? `${config.clientSubject} ${values.subject} message`
						: config.clientSubject
				} — ${senderName.replace(/[\r\n]+/g, ' ')}`
			)}</h2>
			${htmlDetails}
            `
		});

		// Confirm receipt to the visitor
		await transporter.sendMail({
			from: SMTP_FROM,
			to: email,
			subject: config.confirmationSubject,
			text: `
			Hi ${senderName},
			
			${config.confirmationMessage}
			
			Here is a copy of your submission:
			
			${plainDetails}
			
			Thank you!
            `.trim(),
			html: `
			<p>Hi ${escapeHtml(senderName)},</p>
			<p>${escapeHtml(config.confirmationMessage)}</p>
			<p><span style="opacity: 65%;">--</span><br>
			<span style="opacity: 65%;">Mat Montgomery</span><br>
			<a href="http://matmontgomerymusic.com" target="_blank" rel="noopener noreferrer">matmontgomerymusic.com</a>
			<br>
			<a href="http://dapperpage.com" target="_blank" rel="noopener noreferrer">dapperpage.com</a></p>
			<br>
			<h3>Your submission</h3>
			${htmlDetails}
            `
		});

		return json({ success: true });
	} catch (error) {
		console.error('Form submission error:', error);

		return json(
			{
				success: false,
				error: 'Something went wrong. Please try again later.'
			},
			{ status: 500 }
		);
	}
};
