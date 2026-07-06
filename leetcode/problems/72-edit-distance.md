# [72. Edit Distance](https://leetcode.com/problems/edit-distance)

## Problem Statement

Given two strings `word1` and `word2`, return the minimum number of operations required to convert `word1` to `word2`.

You have the following three operations permitted on a word:

1. **Insert** a character
2. **Delete** a character
3. **Replace** a character

### Example 1:
**Input:** `word1 = "horse"`, `word2 = "ros"`  
**Output:** `3`  
**Explanation:** 
- `horse` $\to$ `rorse` (replace 'h' with 'r')
- `rorse` $\to$ `rose` (remove 'r')
- `rose` $\to$ `ros` (remove 'e')

### Example 2:
**Input:** `word1 = "intention"`, `word2 = "execution"`  
**Output:** `5`  
**Explanation:** 
- `intention` $\to$ `inention` (remove 't')
- `inention` $\to$ `enention` (replace 'i' with 'e')
- `enention` $\to$ `exention` (replace 'n' with 'x')
- `exention` $\to$ `exection` (replace 'n' with 'c')
- `exection` $\to$ `execution` (insert 'u')

### Constraints:
* $0 \le \text{word1.length}, \text{word2.length} \le 500$
* `word1` and `word2` consist of lowercase English letters.

---

## Approach

This problem is a classic application of **Dynamic Programming (DP)**, specifically a variation of the Levenshtein Distance algorithm. We want to find the minimum cost to transform one string into another by building a solution for smaller prefixes and using those to solve the larger problem.

### 1. Defining the State
Let $dp[i][j]$ represent the minimum number of operations required to convert the prefix of `word1` of length $i$ (i.e., `word1[0...i-1]`) into the prefix of `word2` of length $j$ (i.e., `word2[0...j-1]`).

### 2. Base Cases
* **Converting to an empty string:** To convert a string of length $i$ to an empty string, we must perform $i$ deletions. Therefore, $dp[i][0] = i$.
* **Converting from an empty string:** To convert an empty string to a string of length $j$, we must perform $j$ insertions. Therefore, $dp[0][j] = j$.

### 3. State Transitions
When considering the $i$-th character of `word1` and the $j$-th character of `word2`:

* **If the characters are the same** (`word1[i-1] == word2[j-1]`):
  No new operation is required. The cost is the same as the cost for the previous prefixes:
  $$dp[i][j] = dp[i-1][j-1]$$

* **If the characters are different** (`word1[i-1] != word2[j-1]`):
  We must perform one of the three allowed operations and take the minimum result:
  1. **Replace:** $1 + dp[i-1][j-1]$
  2. **Delete:** $1 + dp[i-1][j]$
  3. **Insert:** $1 + dp[i][j-1]$
  
  Thus, the transition is:
  $$dp[i][j] = 1 + \min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1])$$

---

## Code

```python
class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        # Get the lengths of both strings
        m, n = len(word1), len(word2)
        
        # Initialize the DP table with dimensions (m+1) x (n+1)
        # dp[i][j] will store the edit distance between word1[:i] and word2[:j]
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        
        # Base case: Converting word1[:i] to an empty word2 requires i deletions
        for i in range(m + 1):
            dp[i][0] = i
            
        # Base case: Converting an empty word1 to word2[:j] requires j insertions
        for j in range(n + 1):
            dp[0][j] = j
            
        # Fill the DP table
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                # If characters don't match, consider the three possible operations
                # and pick the one that results in the minimum operations
                dp[i][j] = 1 + min(
                    dp[i-1][j],    # Deletion
                    dp[i][j-1],    # Insertion
                    dp[i-1][j-1]   # Replacement
                )
                
                # If the current characters match, the cost is the same as 
                # the previous prefixes without an operation.
                if word1[i-1] == word2[j-1]:
                    dp[i][j] = min(dp[i][j], dp[i-1][j-1])
                    
        return dp[m][n]
```

## Complexity Analysis

* **Time Complexity:** $O(m \times n)$
  We iterate through every cell in the $m \times n$ DP table exactly once, where $m$ is the length of `word1` and $n$ is the length of `word2`. Each cell operation takes $O(1)$ constant time.

* **Space Complexity:** $O(m \times n)$
  We use a 2D array of size $(m+1) \times (n+1)$ to store the minimum operations for all prefix combinations. 

> **Note:** The space complexity can be optimized to $O(\min(m, n))$ because each row in the DP table only depends on the current row and the previous row.