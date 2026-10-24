import { writable } from 'svelte/store';

export const activeAudio = writable<HTMLAudioElement | null>(null);