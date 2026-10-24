import type { Difficulty } from "$lib/types/compositions"

export const difficulty = {
    E: 'easy',
    ME: 'medium-easy',
    M: 'medium',
    MA: 'medium-advanced',
    A: 'advanced'
} satisfies Record<Difficulty, string>;