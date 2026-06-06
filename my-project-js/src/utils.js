export function formatTaskName(name){
    if (typeof name !== 'string' || !name) return '';
    return name.trim().charAt(0).toUpperCase() + name.trim().slice(1).toLowerCase();
}

/*
* 2. Pure function: calculates the completion percentage
*/

export function calculateCompletionRate(completedCount, totalCount) {
    if (totalCount <= 0 || completedCount < 0) return 0;
    if (completedCount > totalCount) return 100;

    const percentage = (completedCount / totalCount) * 100;
    return Math.round(percentage);
}

export class HabitTracker {
    constructor() {
        this.streak = 0;
    }

    completeHabit(didCompleteToday) {
        if(didCompleteToday) {
            this.streak++;
        } else {
            this.streak = 0;
        }
        return this.streak;
    }

    reset(){
        this.streak = 0;
    }
}

export function isBetterDataforTravel(a, b) {
    // Compara dos arrays `a` y `b` de fechas (Date o strings).
    // Devuelve un objeto con `allPresent: boolean` y `missing: string[]`
    // donde `missing` son las fechas de `b` que no están en `a`.
    if (!Array.isArray(a) || !Array.isArray(b)) return { allPresent: false, missing: [] };

    const normalize = (v) => {
        if (v instanceof Date && !isNaN(v)) return v.toISOString().slice(0, 10);
        if (typeof v === 'string') {
            const d = new Date(v);
            if (!isNaN(d)) return d.toISOString().slice(0, 10);
            return v.trim();
        }
        return String(v);
    };

    const setA = new Set(a.map(normalize));
    const missing = [];

    for (const item of b) {
        const key = normalize(item);
        if (!setA.has(key)) missing.push(key);
    }

    return { allPresent: missing.length === 0, missing };
}