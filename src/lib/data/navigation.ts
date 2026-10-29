import type { Pathname } from '$app/types';

export type NavPage = {
	name: string;
	href: Pathname;
};

export const pages: NavPage[] = [
	{ name: 'Performance', href: '/performance' },
	{ name: 'Lessons', href: '/lessons' },
	{ name: 'Compositions', href: '/compositions' },
	{ name: 'Contact', href: '/contact' }
];
