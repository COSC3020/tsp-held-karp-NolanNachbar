# Traveling Salesperson Problem -- Held-Karp Algorithm

This exercise is about the Traveling Salesperson Problem I mentioned in the
lecture on NP-hard problems -- given a set of cities, determine the length of
the shortest tour that visits all of them. We can get from any city to any other
city, i.e. the graph of cities is completely connected. We consider the version
of the Traveling Salesperson Problem that finds the shortest tour to visit $n$
cities, starting at a city and ending at the $n$ th city; it *does not* go
back to the start. The start city may be any of the cities. Remember that the
graph for a TSP is undirected, i.e. the cost is the same in either direction.

The Held-Karp algorithm for solving the Traveling Salesperson Problem is a
recursive algorithm that considers every subset of cities and finds shortest
tours within them. It takes advantage of the fact that every subroute of a route
of minimum length is of minimum length itself. The main idea is that to solve
the problem of finding the shortest route for $n$ cities, we first solve the
problem of finding the shortest route for $n-1$ cities, and then find the
shortest route from the $n-1$st city to the $n$th city. The pseudocode for the
algorithm is as follows:

```javascript
// cities is the set of cities not visited so far, including start
heldKarp(cities, start)
  if |cities| == 2
    return length of tour that starts at start, goes directly to other city in cities
  else
    return the minimum of
      for each city in cities, unless the city is start
        // reduce the set of cities that are unvisited by one  (the old start), set the new start, add on the distance from old start to new start
        heldKarp(cities - start, city) + distance from start to city
```

Implement a dynamic programming version (which could use memoization) of the
Held-Karp algorithm. If you use memoization, make sure that the cache is reset
every time the function is called such that multiple calls do not end up using
old and incorrect values. Start with the template I provided in `code.js`.

The function takes a distance matrix (the adjacency matrix for the graph where
the values in the cells are the distances between the corresponding cities) and
returns the length of the shortest tour (not the tour itself).

Test your new function; I've provided some basic testing code in `code.test.js`.

## Runtime Analysis

What is the worst-case asymptotic time complexity of your implementation? What
is the worst-case asymptotic memory complexity? Add your answer, including your
reasoning, to this markdown file.

Recall my code (comments and line spaces removed for brevity):
```js
function tsp_hk(distance_matrix) {
    let n = distance_matrix.length;
    if (n <= 1) return 0;
    const memo = Array.from({ length: n }, () => Array(1 << n).fill(-1)); // memory complexity of $\Theta(2^n)$
    function heldKarp(citiesLeft, currentCity) {
        let bitmask = 0;
        for (const city in citiesLeft) {  // Time  complexity of $\Theta(n)$
            bitmask |= 1 << citiesLeft[city];
        }
        if (memo[currentCity][bitmask] !== -1) return memo[currentCity][bitmask];
        if (citiesLeft.length === 1) return distance_matrix[currentCity][citiesLeft[0]];
        let minCost = Infinity;
        for (let i = 0; i < citiesLeft.length; i++) { // Time  complexity of $\Theta(n)$
            const nextCity = citiesLeft[i];
            const newCitiesLeft = citiesLeft.filter((_, index) => index !== i);  // Time  complexity of $\Theta(n)$
            // Because of dynamic programming and a city is either in the subset or out, there are 2^n recursive calls on the line below
            const cost = distance_matrix[currentCity][nextCity] + heldKarp(newCitiesLeft, nextCity); // memory and time complexity of $\Theta(2^n)$
            minCost = Math.min(minCost, cost);
        }
        memo[currentCity][bitmask] = minCost;
        return minCost;
    }
    let minTourCost = Infinity;
    for (let start = 0; start < n; start++) { // Time  complexity of $\Theta(n)$
        const citiesLeft = Array.from({ length: n }, (_, i) => i).filter((city) => city !== start); // memory complexity of $\Theta(n)$
        minTour = Math.min(minTourCost, heldKarp(citiesLeft, start)); 
    }
    return minTour;
}
```
Adding those up:

For time complexity, we have $\Theta(n * (n + n * 2^n)) \in \Theta(n^2 * 2^n)$.

For memory complexity, we have $\Theta(2^n + n * (n + 2^n)) \in \Theta(n * 2^n)$.


I wrote the non dynamic version using the provided pseudocode but I was stuck on using memoization so I looked at this: 

https://github.com/COSC3020/tsp-held-karp-Assel-Aljazwe/blob/Code-%26-Analysis/code.js

I used the idea of ```1 << n``` from it which it looks like is called bitmasking or bit shifting. I don't remeber seeing this before so I looked it up https://rambutan.readthedocs.io/projects/librambutan/en/latest/lang/cpp/bitshift.html

https://www.geeksforgeeks.org/left-shift-bitwise-operator-in-javascript/

I also used the general outline of his code because of the memoization but I tried to write it independent from his code. I know that because I used his outline our code might look similar so I used a 2d array instead of a map like he did for the memoiztion part. 

https://stackoverflow.com/questions/29285897/difference-between-for-in-and-for-of-statements

I used this to help me understand the basics of the problem. 
https://www.geeksforgeeks.org/travelling-salesman-problem-using-dynamic-programming/

I certify that I have listed all sources used to complete this exercise, including the use of any Large Language Models. All of the work is my own, except where stated otherwise. I am aware that plagiarism carries severe penalties and that if plagiarism is suspected, charges may be filed against me without prior notice.
