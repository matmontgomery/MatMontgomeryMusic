import type { Pathname } from '$app/types';

export type NavPage = {
    name: string;
    href: Pathname;
};

export const pages: NavPage[] = [
    { name: 'Events', href: '/events' },
    { name: 'About', href: '/about' }
];