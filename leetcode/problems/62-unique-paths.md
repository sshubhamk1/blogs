# [62. Unique Paths](https://leetcode.com/problems/unique-paths)

# Problem Statement

There is a robot on an $m \times n$ grid. The robot is initially located at the top-left corner (i.e., $\text{grid}[0][0]$). The robot tries to move to the bottom-right corner (i.e., $\text{grid}[m - 1][n - 1]$). The robot can only move either **down** or **right** at any point in time.

Given the two integers $m$ and $n$, return the number of possible unique paths that the robot can take to reach the bottom-right corner.

The test cases are generated so that the answer will be less than or equal to $2 \times 10^9$.

### Example 1:
**Input:** $m = 3, n = 7$  
**Output:** 28

### Example 2:
**Input:** $m = 3, n = 2$  
**Output:** 3  
**Explanation:** From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
1. Right $\to$ Down $\to$ Down
2. Down $\to$ Down $\to$ Right
3. Down $\to$ Right $\to$ Down

### Constraints:
* $1 \le m, n \le 100$

---

# Approach

To solve this problem efficiently, we can use **Dynamic Programming (DP)**.

### Intuition
The robot's movement is highly constrained: it can only move **down** or **right**. This means that to arrive at any specific cell $(i, j)$, the robot must have come from either:
1. The cell directly above it: $(i-1, j)$
2. The cell directly to its left: $(i, j-1)$

Therefore, the total number of ways to reach cell $(i, j)$ is the sum of the number of ways to reach the cell above it and the number of ways to reach the cell to its left. This observation allows us to break the problem into smaller subproblems and build up the solution.

### Mathematical Formulation
Let $dp[i][j]$ represent the number of unique paths to reach the cell at row $i$ and column $j$.

The recurrence relation is:
$$dp[i][j] = dp[i-1][j] + dp[i][j-1]$$

**Base Case:**
To start the process, we know there is exactly $1$ way to be at the starting position (the top-left corner).
$$dp[1][1] = 1$$

By iterating through the grid and applying this relation, we can compute the number of paths for every cell until we reach the bottom-right corner at $dp[m][n]$.

# Complexity Analysis

* **Time Complexity:** $O(m \times n)$  
  We iterate through every cell in the $m \times n$ grid exactly once, performing a constant time addition operation at each step.

* **Space Complexity:** $O(m \times n)$  
  We maintain a 2D array (DP table) of size $(m+1) \times (n+1)$ to store the number of paths for each cell.

# Code

```python
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        # Initialize a 2D DP table with size (m+1) x (n+1)
        # Using (m+1) and (n+1) allows us to handle grid boundaries easily.
        paths = [[0] * (n + 1) for _ in range(m + 1)]
        
        # Base case: There is 1 way to stay at the starting cell.
        paths[1][1] = 1
        
        # Fill the DP table iteratively
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                # For the starting cell, we've already initialized it.
                # For all other cells, the number of paths is the sum of 
                # paths from the cell above and the cell to the left.
                if i == 1 and j == 1:
                    continue
                
                paths[i][j] = paths[i - 1][j] + paths[i][j - 1]
                
        # The answer is stored in the bottom-right corner cell.
        return paths[m][n]
```