
// Utilties for searching and sorting data. 

/**
 * Get the levenshtein distance between two strings.
 * @param {string} a - The first string.
 * @param {string} b - The second string.
 * @returns {number} The levenshtein distance between the two strings.
 */
export function levenshteinDistance(a, b) {
    if (a === b) {
        return 0;
    }
    if (a.length > b.length) {
        [a, b] = [b, a];
    }

    let la = a.length;
    let lb = b.length;

    // Short circuit for trivial cases
    if (la === 0) {
        return lb;
    }
    if (lb === 0) {
        return la;
    }

    // Create the vector for the distances
    const vector = new Array(la + 1);
    for (let i = 0; i <= la; i++) {
        vector[i] = i;
    }

    // Calculate the Levenshtein distance between substrings
    for (let j = 1; j <= lb; j++) {
        let upperLeft = vector[0];
        vector[0] = j;

        for (let i = 1; i <= la; i++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            const temp = vector[i];  // Save current vector[i] before modifying it
            vector[i] = Math.min(vector[i] + 1,  // Deletion
                                  vector[i - 1] + 1,  // Insertion
                                  upperLeft + cost); // Substitution
            upperLeft = temp;  // Update upperLeft to the former vector[i] for next iteration
        }
    }

    return vector[la];
}



