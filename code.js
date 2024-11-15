// // cities is the set of cities not visited so far, including start
// heldKarp(cities, start)
//   if |cities| == 2
//     return length of tour that starts at start, goes directly to other city in cities
//   else
//     return the minimum of
//       for each city in cities, unless the city is start
//         // reduce the set of cities that are unvisited by one  (the old start), set the new start, add on the distance from old start to new start
//         heldKarp(cities - start, city) + distance from start to city

function tsp_hk(distance_matrix) {
    let n = distance_matrix.length;

    if (n <= 1) return 0; // handle cases like the first two test cases

    // I had to look up how 1 << n would work but it gives the number of possible subsets of cities
    
    // this is a 2d array to store the already computed results; the first dimension is the current city
    // and the second is the bitmask representation of whether or not the city has been visited
    const memo = Array.from({ length: n }, () => Array(1 << n).fill(-1));

    // heldKarp is the recursive function that solves the TSP using dynamic programming
    function heldKarp(citiesLeft, currentCity) {
        let bitmask = 0;
        
        for (const city of citiesLeft) {
            bitmask |= 1 << city;
        }

        // if it has already been done don't recompute it
        if (memo[currentCity][bitmask] !== -1) return memo[currentCity][bitmask];

        if (citiesLeft.length === 1) return distance_matrix[currentCity][citiesLeft[0]];

        let minCost = Infinity;

        for (let i = 0; i < citiesLeft.length; i++) {
            const nextCity = citiesLeft[i];
            // I learned about filter in functional programming
            const newCitiesLeft = citiesLeft.filter((_, index) => index !== i);
            //console.log(citiesLeft, newCitiesLeft, "i = ", i);
            const cost = distance_matrix[currentCity][nextCity] + heldKarp(newCitiesLeft, nextCity);

            minCost = Math.min(minCost, cost);
        }
        
        memo[currentCity][bitmask] = minCost;
        return minCost;
    }

    let minTourCost = Infinity;

    for (let start = 0; start < n; start++) {
        const citiesLeft = Array.from({ length: n }, (_, i) => i).filter((city) => city !== start);
        const cost = heldKarp(citiesLeft, start);
        minTour = Math.min(minTourCost, cost);
    }

    return minTour;
}
