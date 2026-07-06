# Solving Longest Common Subsequence (LCS) using Dynamic Programming

Finding commonalities between two sequences is a fundamental problem in computer science, with applications ranging from bioinformatics (comparing DNA strands) to version control systems (like the `diff` command in Git). One of the most classic versions of this is finding the **Longest Common Subsequence (LCS)**.

In this article, we will break down the problem, understand the difference between a subsequence and a substring, and implement an efficient solution using Dynamic Programming.

## Problem Statement

Given two strings, `text1` and `text2`, return the length of their longest common subsequence. If there is no common subsequence, return $0$.

### What is a Subsequence?

A **subsequence** is a new string generated from the original string by deleting zero or more characters without changing the relative order of the remaining characters. 

**Important Distinction:**
*   **Substring:** Must be a *contiguous* block of characters. For `"abcde"`, `"abc"` is a substring.
*   **Subsequence:** Does *not* need to be contiguous, but must maintain order. For `"abcde"`, `"ace"` is a subsequence, but `"aec"` is not because the order is changed.

### Example Cases

**Example 1:**
*   **Input:** `text1 = "abcde"`, `text2 = "ace"`
*   **Output:** `3`
*   **Explanation:** The longest common subsequence is `"ace"`, which has a length of $3$.

**Example 2:**
*   **Input:** `text1 = "abc"`, `text2 = "abc"`
*   **Output:** `3`
*   **Explanation:** The strings are identical, so the LCS is `"abc"`.

**Example 3:**
*   **Input:** `text1 = "abc"`, `text2 = "def"`
*   **Output:** `0`
*   **Explanation:** No characters are common between the two strings.

---

## The Approach: Dynamic Programming

The problem can be solved efficiently using a 2-dimensional Dynamic Programming (DP) approach. We break the problem into smaller subproblems by comparing prefixes of the two strings.

### Defining the State

Let $m$ be the length of `text1` and $n$ be the length of `text2`. We create a 2D table `dp` of size $(m+1) \times (n+1)$, where:

$dp[i][j]$ represents the length of the Longest Common Subsequence of the prefix `text1[0...i-1]` and `text2[0...j-1]`.

### The Recurrence Relation

When comparing the $i$-th character of `text1` and the $j$-th character of `text2`, we face two possibilities:

1.  **The characters match (`text1[i-1] == text2[j-1]`):**
    If they match, this character contributes $1$ to the length of the LCS found in the previous prefixes.
    $$dp[i][j] = 1 + dp[i-1][j-1]$$

2.  **The characters do not match (`text1[i-1] \neq text2[j-1]`):**
    If they don't match, the LCS length must be the maximum value found by either:
    *   Ignoring the current character of `text1`.
    *   Ignoring the current character of `text2`.
    $$dp[i][j] = \max(dp[i-1][j], dp[i][j-1])$$

### Base Case
If either string is empty, the length of the LCS is $0$. This is naturally handled by initializing the first row and first column of our DP table to $0$.

---

## Implementation

Here is the optimized Python implementation:

```python
class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        m, n = len(text1), len(text2)
        
        # Initialize a 2D DP table with zeros
        # dp[i][j] will store the LCS length of text1[0...i-1] and text2[0...j-1]
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        
        # Fill the DP table
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if text1[i-1] == text2[j-1]:
                    # Characters match: extend the previous subsequence length by 1
                    dp[i][j] = 1 + dp[i-1][j-1]
                else:
                    # Characters do not match: take the maximum result from skipping 
                    # one character from either text1 or text2
                    dp[i][j] = max(dp[i-1][j], dp[i][j-1])
                    
        # The result is stored in the bottom-right cell of the table
        return dp[m][n]
```

## Complexity Analysis

### Time Complexity
The algorithm uses nested loops to iterate through the lengths of both strings. Therefore, the time complexity is:
$$O(m \times n)$$
where $m$ and $n$ are the lengths of `text1` and `text2` respectively.

### Space Complexity
We use a 2D grid of size $(m+1) \times (n+1)$ to store the results of the subproblems. Thus, the space complexity is:
$$O(m \times n)$$

*(Note: This can be further optimized to $O(\min(m, n))$ space since each row only depends on the previous row, but the 2D approach is standard for clarity.)*

## Summary

The Longest Common Subsequence problem is a classic example of how Dynamic Programming can transform an exponential-time recursive problem into a manageable polynomial-time solution. By building a table of subproblem results, we avoid redundant computations and efficiently find the optimal solution.