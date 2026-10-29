import type { RequestHandler } from './$types';

const siteUrl = 'https://matmontgomerymusic.com';

const pages = ['/', '/lessons', '/compositions', '/performance', '/contact'];

export const GET: RequestHandler = () => {
	const urls = pages
		.map(
			(path) => `
				<url>
					<loc>${siteUrl}${path === '/' ? '/' : path}</loc>
				</url>`
		)
		.join('');

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
		<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
			${urls}
		</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8'
		}
	});
};
