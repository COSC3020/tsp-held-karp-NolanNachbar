function tsp_hk(distance_matrix) {
    let n = distance_matrix.length;
    if (n <= 1) return 0; // handle cases like the first two test cases
    let memo = new Map();
    function heldKarp(citiesLeft, currentCity) {
        // generate a key for the current state
        const key = `${currentCity}:${citiesLeft.join(',')}`;
        // If it has already been done don't recompute it
        if (memo.has(key)) return memo.get(key);
        if (citiesLeft.length === 1) {
            const cost = distance_matrix[currentCity][citiesLeft[0]];
            memo.set(key, cost);
            return cost;
        }
        let minCost = Infinity;
        // Recursively calculate the cost for all possible next cities
        for (let i = 0; i < citiesLeft.length; i++) {
            const nextCity = citiesLeft[i];
            const newCitiesLeft = [...citiesLeft.slice(0, i), ...citiesLeft.slice(i + 1)]; // Create a deep copy of citiesleft minus ith element
            const cost = distance_matrix[currentCity][nextCity] + heldKarp(newCitiesLeft, nextCity);
            minCost = Math.min(minCost, cost);
        }
        memo.set(key, minCost);
        return minCost;
    }

    let minTourCost = Infinity;
    for (let start = 0; start < n; start++) {
        let citiesLeft = Array.from({ length: n }, (_, i) => i);
        citiesLeft = [...citiesLeft.slice(0, start), ...citiesLeft.slice(start + 1)];
        minTourCost = Math.min(minTourCost, heldKarp(citiesLeft, start));
    }
    return minTourCost;
}
