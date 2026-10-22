export type MusicStyle =
	| 'swing'
	| 'rock'
	| 'latin'
	| 'modern'
	| '6/8'
	| '3/4'
	| 'funk'
	| 'gospel'
	| 'soul'
	| 'calypso'
	| 'dance';

export type FeaturedInstrument =
	| 'alto sax'
	| 'tenor sax'
	| 'bari sax'
	| 'trumpet'
	| 'trombone'
	| 'guitar'
	| 'piano'
	| 'bass'
	| 'drums'
	| 'any';

export interface Composition {
	publisherId: string;
	title: string;
	composer: string;
	arranger?: string;
	commission?: string;
	ensemble: string;
	difficulty: string;
	styles: MusicStyle[];
	price: number;
	description: string;
	coverArt: string;
	score: string;
	recording: string;
	trumpet1Range: number;
	feature: FeaturedInstrument[];
	writtenSolo: boolean;
	editorsChoice: boolean;
}
