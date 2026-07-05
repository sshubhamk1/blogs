# [1301. Number of Paths with Max Score](https://leetcode.com/problems/number-of-paths-with-max-score)

## Problem Statement

You are given a square board of characters. You can move on the board starting at the bottom-right square marked with the character **'S'**.

You need to reach the top-left square marked with the character **'E'**. The rest of the squares are labeled either with a numeric character $1, 2, \dots, 9$ or with an obstacle **'X'**. In one move, you can move **up**, **left**, or **up-left** (diagonally) only if there is no obstacle there.

Return a list of two integers:
1. The maximum sum of numeric characters you can collect.
2. The number of paths that result in that maximum sum, taken modulo $10^9 + 7$.

In case there is no path, return `[0, 0]`.

## Approach

To solve this problem, we use **Dynamic Programming (DP)**. Since our movement is restricted to upward, leftward, and diagonal upward-left movements, the state of any cell $(i, j)$ depends on the cells below it, to its right, or below-right of it. 

Instead of a traditional top-down DP, we use a bottom-up approach starting from the source **'S'** (bottom-right) and propagating the scores towards the destination **'E'** (top-left).

### Intuition
We maintain a 2D DP table where each cell `dp[i][j]` stores two values:
- `dp[i][j][0]`: The maximum score achievable when reaching cell $(i, j)$ from the starting point.
- `dp[i][j][1]`: The number of distinct paths that reach cell $(i, j)$ with that specific maximum score.

We iterate through the grid starting from the bottom-right corner. For each cell, if it is not an obstacle and is reachable, we calculate its numeric value and update its neighbors (up, left, and diagonal) using a "push" mechanism.

## Complexity Analysis

- **Time Complexity:** $\mathcal{O}(N^2)$, where $N$ is the side length of the board. We visit each cell once and perform a constant number of operations (checking 3 neighbors) for each cell.
- **Space Complexity:** $\mathcal{O}(N^2)$ to store the DP table containing scores and path counts for each cell.

## Implementation

```python
class Solution:
    def pathsWithMaxScore(self, board: List[str]) -> List[int]:
        n = len(board)
        MOD = 10**9 + 7
        
        # dp[i][j] stores [max_score, num_ways] to reach cell (i, j)
        # We initialize with 0 score and 0 ways.
        dp = [[[0, 0] for _ in range(n)] for _ in range(n)]
        
        # Base case: Starting at the bottom-right corner 'S'
        # The initial score collected is 0.
        dp[n-1][n-1] = [0, 1]
        
        # Iterate backwards from the bottom-right to the top-left
        for r in range(n - 1, -1, -1):
            for c in range(n - 1, -1, -1):
                # Skip obstacles or cells that are currently unreachable
                if board[r][c] == 'X' or dp[r][c][1] == 0:
                    continue
                
                # Determine the numeric value of the current cell
                # 'S' and 'E' do not contribute to the sum
                current_val = int(board[r][c]) if board[r][c].isdigit() else 0
                
                # Possible moves: Up, Left, and Diagonal (Up-Left)
                for dr, dc in [(-1, 0), (0, -1), (-1, -1)]:
                    nr, nc = r + dr, c + dc
                    
                    # Check if the neighbor is within grid boundaries
                    if 0 <= nr < n and 0 <= nc < n:
                        new_score = dp[r][c][0] + current_val
                        
                        # If we found a path with a strictly higher score
                        if new_score > dp[nr][nc][0]:
                            dp[nr][nc][0] = new_score
                            dp[nr][nc][1] = dp[r][c][1]
                        
                        # If we found another path with the same maximum score
                        elif new_score == dp[nr][nc][0]:
                            dp[nr][nc][1] = (dp[nr][nc][1] + dp[r][c][1]) % MOD
                            
        # The result is stored at the target cell (0, 0)
        # If dp[0][0][1] is 0, it correctly returns [0, 0]
        return dp[0][0]
```