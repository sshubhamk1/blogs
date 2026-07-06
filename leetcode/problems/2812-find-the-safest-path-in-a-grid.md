# [2812. Find the Safest Path in a Grid](https://leetcode.com/problems/find-the-safest-path-in-a-grid/)

## Problem Overview

In this problem, we are presented with an $n \times n$ grid consisting of $0$s and $1$s. The cells containing a $1$ represent the locations of thieves. We define the **"safeness factor"** of a cell as the shortest Manhattan distance from that cell to the nearest thief. 

Our objective is to find a path starting from the top-left corner $(0, 0)$ and ending at the bottom-right corner $(n-1, n-1)$ such that we **maximize the minimum safeness factor** encountered along the path. 

In simpler terms: we want to find a route that stays as far away from the thieves as possible, maximizing the "clearance" we maintain throughout the journey.

---

## Approach

To solve this problem efficiently, we can decompose it into two distinct algorithmic phases:

### 1. Calculating Distance to the Nearest Thief (Multi-Source BFS)
Before we can find the safest path, we must know the "safeness factor" (distance to the nearest thief) for every cell in the grid. 

The most efficient way to compute distances from multiple source points simultaneously is using a **Multi-Source Breadth-First Search (BFS)**.

*   **Initialization:** We identify all thief locations (cells with value `1`) and add their coordinates to a queue.
*   **Traversal:** We perform a level-order BFS. For each level of the search, we increment our distance counter.
*   **Updating Safeness:** As we traverse, we calculate the distance from each cell to the closest thief and store it. After this phase, each cell in our grid will represent its shortest distance to any thief.

### 2. Finding the Maximum Safeness Path (Modified Dijkstra)
Once every cell is annotated with its safeness factor, the problem transforms into a variation of the **"Widest Path Problem"**. We need to find a path where the smallest value encountered is as large as possible.

We use a **Priority Queue (Max-Heap)** to explore the grid greedily:

*   **Greedy Strategy:** At each step, we always choose to move to the adjacent cell that has the highest possible safeness factor. This ensures that we explore the "safest" possible routes first.
*   **Implementation Detail:** Since Python’s `queue.PriorityQueue` is a min-heap, we store the distances as negative values to simulate max-heap behavior.
*   **Path Tracking:** We maintain a variable `max_min_safeness` to track the bottleneck (the minimum safeness value) encountered on the path so far.
*   **Termination:** The first time the BFS/Dijkstra search reaches the target cell $(n-1, n-1)$, the minimum safeness value recorded on that path will be our optimal answer.

---

## Complexity Analysis

*   **Time Complexity:** $O(N^2 \log N)$
    *   The **Multi-source BFS** visits each cell exactly once: $O(N^2)$.
    *   The **Modified Dijkstra** uses a Priority Queue. In the worst case, we perform operations for all $N^2$ cells, leading to $O(N^2 \log N)$.
*   **Space Complexity:** $O(N^2)$
    *   We utilize a `visited` set and a priority queue that can, in the worst case, store a significant portion of the $N^2$ cells.

---

## Implementation

```python
from collections import deque
from queue import PriorityQueue
from typing import List

class Solution:
    def maximumSafenessFactor(self, grid: List[List[int]]) -> int:
        n = len(grid)
        
        # Step 1: Find all thief locations to start Multi-Source BFS
        # All cells with 1 are starting points for our distance calculation
        thief_locations = []
        for r in range(n):
            for c in range(n):
                if grid[r][c] == 1:
                    thief_locations.append((r, c))
        
        # Multi-source BFS to calculate distance to nearest thief for every cell
        visited_bfs = set(thief_locations)
        distance_queue = deque(thief_locations)
        directions = [(1, 0), (-1, 0), (0, 1), (0, -1)]
        
        current_distance = 0
        while distance_queue:
            # Process current level of BFS
            for _ in range(len(distance_queue)):
                r, c = distance_queue.popleft()
                # Store the distance in the grid itself
                grid[r][c] = current_distance
                
                for dr, dc in directions:
                    nr, nc = r + dr, c + dc
                    # Boundary check and check if cell was already visited
                    if 0 <= nr < n and 0 <= nc < n and (nr, nc) not in visited_bfs:
                        visited_bfs.add((nr, nc))
                        distance_queue.append((nr, nc))
            
            current_distance += 1

        # Step 2: Modified Dijkstra to find the path with the maximum minimum-distance
        # The starting safeness is the value at the starting cell (0, 0)
        start_safeness = grid[0][0]
        
        # If the starting cell is already a thief, safeness is 0
        if start_safeness == 0:
            return 0

        # Max-heap using PriorityQueue (storing negative values for max-heap behavior)
        # We store (-safeness_factor, row, col)
        pq = PriorityQueue()
        pq.put((-start_safeness, 0, 0))
        
        visited_dijkstra = set([(0, 0)])
        max_min_safeness = start_safeness

        while not pq.empty():
            # current_path_safeness is the minimum safeness encountered on the current path
            neg_current_min_dist, r, c = pq.get()
            current_path_min_dist = -neg_current_min_dist

            # Update the overall result with the bottleneck distance
            max_min_safeness = min(max_min_safeness, current_path_min_dist)

            # If we reached the destination, return the result
            if r == n - 1 and c == n - 1:
                return max_min_safeness

            for dr, dc in directions:
                nr, nc = r + dr, c + dc
                if 0 <= nr < n and 0 <= nc < n and (nr, nc) not in visited_dijkstra:
                    visited_dijkstra.add((nr, nc))
                    # We pass the minimum of the current path's safeness and the neighbor's safeness
                    # to keep track of the bottleneck in the priority queue
                    pq.put((-grid[nr][nc], nr, nc))

        return grid[n-1][n-1]
```