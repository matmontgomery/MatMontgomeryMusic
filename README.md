# SvelteKit Starter Project
This is a base starter project in SvelteKit that can be used as a template for future projects.

## New Project

1. Clone starter
2. Rename project
3. Install dependencies
4. Update site configuration
5. Add branding/fonts
6. Configure environment variables
7. Start development server
8. Build pages
9. Add optional features as needed
10. Deploy to Netlify
11. Transfer ownership to client

## CSS
The style sheets have been broken up for clarity and ease of use. The app.css has imports of all the other sheets and is the only one referenced in the project layout. The reset is basically a copy of Andy Bell's CSS reset. Typography and Forms have the styles for the copy, headings, form elements, and buttons.

### Variables
The variables style sheet contains size and space variables from Utopia.fyi. It also contains some default fonts from ModernFontStacks.com (no downloading needed). There are also variables for light and dark neutral colors and a primary and secondary color. For colors, it's best to use a few colors and create variation with opacity.

### Layout
The layout style sheet has a few useful layout options that commonly occur.
* .container is used on every page to keep content a regular distance off the edge.
* .auto-grid will take a set of grid items (usually product cards) and display them to automatically fit the space with uniform widths regardless of screen size.
* .flex-group will automatically cluster a group of items (like filter chips) that don't need uniform width, but should be grouped together and able to wrap to the next row to prevent overflow.
* .stack (and variations) are used to provide regularly spaced stacks of elements.
* The sidebar layout uses a few different classes
    * .with-sidebar defines the container that has a sidebar and other content.
    * .sidebar is a child inside the .with-sidebar element and will stay the same size until it automatically switches to be on top of the other content at certain screen sizes (no media query required).
    * .not-sidebar is the child that contains the main content. Its size will automatically adjust to fill the width.
* .switcher will automatically switch from row to column depending on the screen size, also without media queries.

## Contact Form Setup

The starter project includes a reusable contact form with:

* Name, email, and message fields
* Honeypot spam protection
* Optional Cloudflare Turnstile protection
* Email notification to the site owner
* Automatic confirmation email to the person who submitted the form
* SMTP support for services such as Gmail

### 1. Add the SMTP credentials

Create or update your `.env` file with the email account that will send the messages:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-email@example.com
SMTP_PASS=your-app-password
SMTP_FROM=your-email@example.com
CONTACT_EMAIL=client@example.com
```

**What these variables mean:**

| Variable        | Purpose                                                |
| --------------- | ------------------------------------------------------ |
| `SMTP_HOST`     | SMTP server used to send email                         |
| `SMTP_PORT`     | SMTP port (`465` is commonly used with SSL)            |
| `SMTP_USER`     | Email account used to authenticate                     |
| `SMTP_PASS`     | SMTP password or app password                          |
| `SMTP_FROM`     | Address that appears as the sender                     |
| `CONTACT_EMAIL` | Email address that receives contact-form notifications |

For Gmail, `SMTP_PASS` should normally be a **Google App Password**, rather than the account's regular password.

> Never commit `.env` or other files containing SMTP credentials to Git.

### 2. Install Nodemailer

If Nodemailer is not already installed:

```bash
npm install nodemailer
npm install -D @types/nodemailer
```

The contact form uses Nodemailer on the server to send both emails.

### 3. Add the contact form to a page

Import the reusable component:

```svelte
<script lang="ts">
	import ContactForm from '$lib/components/ui/ContactForm.svelte';
</script>

<h1>Contact Us</h1>

<ContactForm />
```

The component handles the form submission and communicates with:

```text
/api/contact
```

No email configuration is needed in the page itself.

### 4. Test the basic contact form

Start the development server:

```bash
npm run dev
```

Submit the form and verify that:

1. The client's `CONTACT_EMAIL` receives the notification.
2. The notification contains the visitor's name, email, and message.
3. Replying to the notification goes to the visitor's email address.
4. The visitor receives a confirmation email.

### 5. Configure Cloudflare Turnstile (optional)

Turnstile provides an additional layer of protection against automated submissions.

Create a Turnstile site in the Cloudflare dashboard and obtain:

* Site Key
* Secret Key

Add them to `.env`:

```env
PUBLIC_TURNSTILE_SITE_KEY=your-site-key
TURNSTILE_SECRET_KEY=your-secret-key
```

The `PUBLIC_` prefix is intentional. The site key is safe to use in browser code.

**Do not expose `TURNSTILE_SECRET_KEY` to the browser.**

The contact form automatically enables Turnstile when these variables are configured. No changes to the page containing `<ContactForm />` are necessary.

### 6. Test Turnstile

After adding the keys, restart the development server:

```bash
npm run dev
```

Submit the form again and verify that the Turnstile widget appears and that a valid submission is successfully delivered.

The server verifies the Turnstile token with Cloudflare before sending either email.

### 7. Configure the production environment

Before deploying, add the same environment variables to the hosting provider.

For Netlify, add them under:

**Project → Site configuration → Environment variables**

Add:

```text
SMTP_HOST
SMTP_PORT
SMTP_USER
SMTP_PASS
SMTP_FROM
CONTACT_EMAIL
PUBLIC_TURNSTILE_SITE_KEY
TURNSTILE_SECRET_KEY
```

If Turnstile is not being used on a particular site, the Turnstile variables can be omitted.

After adding or changing environment variables, redeploy the site.

### 8. Configure the Turnstile domain

If using Turnstile in production, add the client's production domain to the Turnstile site's allowed hostnames in Cloudflare.

For example:

```text
example.com
www.example.com
```

If testing locally, `localhost` can also be included as an allowed hostname.

### 9. Perform a final production test

After deployment, submit the contact form from the live website.

Confirm that:

* The form submits successfully.
* The client receives the notification email.
* The visitor receives the confirmation email.
* Clicking **Reply** on the client notification replies to the visitor.
* Turnstile works correctly, if enabled.
* The form behaves correctly on mobile.
* Required fields prevent empty submissions.

### Quick Setup Checklist

For a new client site, the normal setup is:

```text
□ Install/configure Nodemailer
□ Create the client's sending email account
□ Create an email app password if required
□ Add SMTP credentials to the environment
□ Set CONTACT_EMAIL to the client's email
□ Add <ContactForm /> to the contact page
□ Test the form locally
□ Create Cloudflare Turnstile site (optional)
□ Add Turnstile keys to the environment
□ Add production domain to Turnstile
□ Add environment variables to Netlify
□ Deploy
□ Test the live contact form
```

Once the starter project is configured, the contact form itself should require very little customization from site to site. Most client-specific configuration should happen through environment variables rather than by modifying the component.


## Client Handoff & Deployment Checklist

Use this checklist when moving a completed website from development to the client.

The goal is to make sure the client owns the important accounts and credentials, the production site is configured correctly, and you can hand over the project without leaving your personal accounts connected.

---

### 1. Confirm the client's accounts

Before launch, make sure the client has accounts for the services the website uses.

Typical services include:

```text
□ Domain registrar
□ Netlify
□ Email provider
□ Cloudflare
□ Supabase
□ Google account (if applicable)
□ Any third-party services used by the site
```

The client should own these accounts whenever possible.

Avoid creating important production accounts under your personal email address.

---

### 2. Connect the production domain

Configure the client's domain to point to the production site.

For Netlify:

```text
□ Add the custom domain to the Netlify site
□ Configure the required DNS records
□ Verify the domain
□ Confirm HTTPS is working
□ Test both www and non-www versions
```

Choose the preferred version of the domain and make sure the other version redirects to it.

For example:

```text
https://example.com
```

could be the primary domain, with:

```text
https://www.example.com
```

redirecting to it.

---

### 3. Configure production environment variables

Development values should never be copied into production blindly.

Add the required environment variables to the production hosting environment.

For example:

```text
□ SMTP_HOST
□ SMTP_PORT
□ SMTP_USER
□ SMTP_PASS
□ SMTP_FROM
□ CONTACT_EMAIL
□ PUBLIC_TURNSTILE_SITE_KEY
□ TURNSTILE_SECRET_KEY
□ PUBLIC_SUPABASE_URL
□ PUBLIC_SUPABASE_PUBLISHABLE_KEY
```

Only add variables that the particular project actually uses.

### Important

Never commit secrets to Git.

Production secrets should be stored in the hosting provider's environment-variable settings.

---

### 4. Configure email

If the site has a contact form:

```text
□ Confirm the client's sending email account
□ Create an app password if required
□ Configure SMTP credentials
□ Set SMTP_FROM
□ Set CONTACT_EMAIL
□ Test the notification email
□ Test the visitor confirmation email
□ Test replying to the notification
```

The client notification should use the visitor's email as the `Reply-To` address so the client can simply click **Reply**.

See the [Contact Form Setup](#contact-form-setup) section for the complete contact-form configuration.

---

### 5. Configure Cloudflare Turnstile

If the site uses Turnstile:

```text
□ Create the Turnstile site under the client's Cloudflare account
□ Add the production domain
□ Copy the Site Key
□ Copy the Secret Key
□ Add both keys to the production environment
□ Redeploy
□ Test the contact form
```

Do not use your personal Cloudflare account for a client's production Turnstile configuration unless there is a specific reason to do so.

---

### 6. Configure Supabase

If the project uses Supabase:

```text
□ Create or transfer the Supabase project
□ Confirm the production database
□ Apply the required database schema
□ Configure Row Level Security
□ Add production environment variables
□ Configure authentication providers if applicable
□ Configure the production site URL
□ Configure authentication redirect URLs
□ Create the client's admin account
□ Test the admin login
```

Make sure the production project is separate from any development/testing database when appropriate.

---

### 7. Create the client's admin account

If the site has an admin section:

```text
□ Create the client's account
□ Confirm the client can log in
□ Confirm the client can access /admin
□ Test the client's permissions
□ Test password reset
□ Confirm password-reset emails work
```

The client's login should use the client's email address rather than the developer's account.

If the project has multiple administrators, document who has access.

---

### 8. Configure password reset

Test the complete password-reset process:

```text
□ Request password reset
□ Receive reset email
□ Open reset link
□ Set a new password
□ Log in with the new password
```

Make sure production URLs are used in the password-reset links rather than localhost URLs.

---

### 9. Build and deploy

Before deploying:

```bash
npm run lint
npm run build
```

Resolve any errors before pushing the production build.

Then:

```text
□ Commit final changes
□ Push to the production repository
□ Deploy to Netlify
□ Confirm deployment succeeds
□ Open the live website
```

---

### 10. Test the production website

Perform a complete test of the live site rather than relying only on the local development version.

#### Navigation

```text
□ Home
□ About
□ Contact
□ Blog/content pages
□ Categories
□ External links
□ Navigation menu
□ Footer links
```

#### Forms

```text
□ Contact form
□ Required fields
□ Honeypot
□ Turnstile, if enabled
□ Email notification
□ Confirmation email
□ Error handling
```

#### Admin

```text
□ Login
□ Logout
□ Password reset
□ Create content
□ Edit content
□ Delete content
□ Publish/unpublish
```

Only test the features that exist in the particular project.

---

### 11. Test on multiple devices

At minimum, test:

```text
□ Desktop
□ Tablet
□ Mobile
```

Check for:

```text
□ Navigation problems
□ Horizontal scrolling
□ Text overflow
□ Images
□ Forms
□ Buttons
□ Modals
□ Touch interactions
□ Footer positioning
```

Also test the site in at least one Chromium-based browser and Safari when practical.

---

### 12. Check SEO and site metadata

Before launch:

```text
□ Page titles
□ Meta descriptions
□ Open Graph/social sharing image
□ Favicon
□ Site name
□ Canonical URLs, if used
□ robots.txt
□ sitemap
```

If the site is replacing an existing website, check whether existing URLs need redirects.

---

### 13. Check analytics and third-party services

If the site uses analytics or other external services:

```text
□ Analytics configured
□ Correct production property/account
□ Tracking tested
□ Third-party API keys configured
□ Production URLs configured
```

Do not leave development/testing analytics mixed with the client's production data.

---

### 14. Remove development leftovers

Before final handoff:

```text
□ Remove test accounts
□ Remove test content
□ Remove development-only environment variables
□ Remove temporary API keys
□ Remove unused integrations
□ Remove personal accounts from production
□ Check for localhost URLs
□ Check for development domains
□ Check for placeholder text
□ Check for placeholder images
```

A useful search before launch is:

```bash
grep -R "localhost" src
```

Also search the project for other development URLs or placeholder values.

---

### 15. Verify Git repository

The repository should not contain secrets.

Check for:

```text
□ .env
□ API keys
□ SMTP passwords
□ Turnstile secret keys
□ Supabase service-role keys
□ Private credentials
```

Make sure `.gitignore` includes the appropriate environment files.

For example:

```gitignore
.env
.env.*
!.env.example
```

An `.env.example` file can be committed to document which variables the project requires without containing their actual values.

Example:

```env
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
SMTP_FROM=
CONTACT_EMAIL=

PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=

PUBLIC_SUPABASE_URL=
PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

---

### 16. Give the client their account information

The client should receive access to the services they own.

Depending on the project, this may include:

```text
□ Domain registrar
□ Netlify
□ Cloudflare
□ Supabase
□ Email provider
□ Google account
□ Other third-party services
```

Do **not** send passwords in plain text email when avoidable.

Use the service's account invitation/team-member system or a password manager's secure sharing feature when available.

---

### 17. Document the project

Create a short project handoff document containing:

```text
Project:
Production URL:
Git repository:
Hosting provider:
Domain registrar:

Client email:
Admin URL:

Email provider:
Contact-form recipient:

Database:
Authentication:

Third-party services:
```

Do not put passwords or secret API keys in this document.

Instead, document **where the credentials are stored**.

---

### 18. Client acceptance test

Have the client perform a few important tasks themselves.

For example:

```text
□ Log into the admin area
□ Change/update content
□ Submit the contact form
□ Receive the contact notification
□ Reply to the notification
□ Log out
□ Reset their password
```

This catches problems that can be missed when the developer is the only person testing the site.

---

### 19. Final handoff

Once everything is verified:

```text
□ Client owns production accounts
□ Client has admin access
□ Production domain works
□ HTTPS works
□ Environment variables are configured
□ Contact form works
□ Authentication works
□ Database works
□ Production build succeeds
□ No secrets are committed
□ Test content is removed
□ Client has received necessary documentation
□ Client has successfully tested the site
```

At this point the website is ready for normal client use.

---

## Quick Launch Checklist

For future projects, the shortened version is:

```text
CLIENT
□ Client accounts created/connected
□ Client owns production services
□ Client admin account created

DOMAIN
□ Domain connected
□ DNS configured
□ HTTPS verified
□ Redirects verified

EMAIL
□ SMTP configured
□ CONTACT_EMAIL configured
□ Contact form tested
□ Confirmation email tested

SECURITY
□ Environment variables configured
□ Secrets not committed to Git
□ Honeypot tested
□ Turnstile configured/tested if used
□ Supabase RLS verified if used

APPLICATION
□ npm run lint
□ npm run build
□ Production deployment successful
□ Admin login tested
□ Password reset tested
□ Forms tested

QA
□ Desktop tested
□ Mobile tested
□ Tablet tested
□ Links checked
□ Images checked
□ SEO/metadata checked
□ No placeholder content

HANDOFF
□ Client has account access
□ Client has admin access
□ Client has tested the site
□ Documentation delivered
□ Development/test accounts removed
```

### After Launch

Keep the project repository available after handoff so future maintenance can be performed without rebuilding the project from scratch.

For ongoing maintenance, document:

```text
□ Where the Git repository is located
□ Where the site is hosted
□ Where the domain is registered
□ Where environment variables are managed
□ Which third-party services are connected
□ Which accounts have administrative access
□ How to deploy updates
```

The client should own the production infrastructure, while
