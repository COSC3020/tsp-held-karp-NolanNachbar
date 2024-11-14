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
    let visited = Array(n).fill(0);
    let unvisited = Array.from({ length: n }, (v, i) => i);
    
    function heldKarp(cities, start) {
        // if |cities| == 2
        if (cities.length === 2) {
            return distance_matrix[cities[0]][cities[1]];
        }

        let min = Infinity;

        for (let i = 0; i < cities.length; i++) {
            let currentCity = cities[i];
            
            if (visited[currentCity] === 1 || currentCity === start) continue;

            visited[currentCity] = 1;
            
            let remainingCities = cities.filter(city => city !== currentCity);
            let cost = heldKarp(remainingCities, currentCity) + distance_matrix[start][currentCity];
            
            min = Math.min(min, cost);

            visited[currentCity] = 0;
        }
        
        return min;
    }

    return heldKarp(unvisited, 0);
}
