# [1358. Number of Substrings Containing All Three Characters](https://leetcode.com/problems/number-of-substrings-containing-all-three-characters)

## Problem Overview

Given a string $s$ consisting of characters from the set $\{'a', 'b', 'c'\}$, your task is to find the total number of substrings that contain at least one occurrence of all three characters.

For example, in the string `"abcabc"`, valid substrings include `"abc"`, `"abca"`, `"abcab"`, `"abcabc"`, `"bca"`, and many others. 

Given the constraints where the string length $N$ can be up to $5 \times 10^4$, an $O(N^2)$ brute-force solution will be too slow. We need an efficient approach—ideally $O(N)$—to ensure the solution performs well within the time limits.

---

## Approach 1: Sliding Window (Using a Frequency Map)

A common technique for substring problems involving specific character requirements is the **Sliding Window (Two Pointers)** approach. We can maintain a window and track the frequency of each required character within that window.

### The Logic

The strategy is to expand the window by moving a `right` pointer until the window becomes "valid"—meaning it contains at least one 'a', one 'b', and one 'c'.

Once the window from index `left` to `right` is valid, we can make a crucial observation: **any substring that starts at the current `left` and ends at `right` or any index further to the right will also be valid.**

Therefore, if the window $[left, right]$ is valid, there are exactly $n - right$ valid substrings that start at the current `left` index (one ending at `right`, one at `right + 1`, ..., up to one ending at $n-1$).

1.  **Expand**: Increment the `right` pointer and update the character frequency.
2.  **Validate & Shrink**: While the window contains at least one of each character:
    *   Add the count of all possible valid substrings starting at `left` to our total: $n - right$.
    *   Shrink the window from the `left` to see if the next starting position also forms a valid window.

### Implementation

```python
from collections import defaultdict

class Solution:
    def numberOfSubstrings(self, s: str) -> int:
        total_count = 0
        n = len(s)
        # Frequency map to track 'a', 'b', and 'c' in the current window
        char_frequency = defaultdict(int)
        left = 0

        def is_window_valid() -> bool:
            # The window is valid only if all three characters are present
            return (char_frequency['a'] > 0 and 
                    char_frequency['b'] > 0 and 
                    char_frequency['c'] > 0)

        for right in range(n):
            # Include the character at the right pointer
            char_frequency[s[right]] += 1

            # If the current window is valid, all substrings starting at 'left'
            # and ending at 'right' or any index after 'right' are valid.
            while is_window_valid():
                # Adding the count of substrings: [left, right], [left, right+1], ..., [left, n-1]
                total_count += (n - right)
                
                # Shrink the window from the left to find the next valid starting point
                char_frequency[s[left]] -= 1
                left += 1
                
        return total_count
```

### Complexity Analysis
* **Time Complexity:** $O(N)$, where $N$ is the length of the string. Although there is a nested `while` loop, each pointer (`left` and `right`) travels from $0$ to $N$ exactly once.
* **Space Complexity:** $O(1)$, as the frequency map only stores a constant number of keys ('a', 'b', and 'c').

---

## Approach 2: Optimized Sliding Window (Tracking Last Seen Indices)

We can refine the sliding window logic even further. Instead of managing a frequency map and a nested loop, we can simply track the **most recent index** where each character was encountered.

### The Logic

As we iterate through the string with a single pointer $i$, we update the last seen position of the current character.

At any index $i$, let the last seen positions of 'a', 'b', and 'c' be $i_a, i_b,$ and $i_c$. A substring ending at index $i$ is valid if and only if it starts at or before the minimum of these three indices.

Let $m = \min(i_a, i_b, i_c)$.

If $m \ge 0$, then the valid substrings ending at index $i$ are those starting at indices $\{0, 1, 2, \dots, m\}$. This gives us exactly $m + 1$ valid substrings ending at index $i$.

### Implementation

```python
class Solution:
    def numberOfSubstrings(self, s: str) -> int:
        total_valid_substrings = 0
        # Initialize last seen positions of 'a', 'b', and 'c' to -1
        last_seen_indices = {'a': -1, 'b': -1, 'c': -1}

        for i, char in enumerate(s):
            # Update the last seen position of the current character
            last_seen_indices[char] = i
            
            # Find the minimum of the last seen positions
            # This index represents the start of the shortest valid substring ending at index 'i'
            min_last_idx = min(last_seen_indices.values())
            
            # If min_last_idx is -1, we haven't encountered all three characters yet.
            # If it is >= 0, then all substrings starting from index 0 up to min_last_idx
            # and ending at index i are valid.
            if min_last_idx != -1:
                total_valid_substrings += (min_last_idx + 1)
                
        return total_valid_substrings
```

### Complexity Analysis
* **Time Complexity:** $O(N)$, where $N$ is the length of the string. We perform a single linear pass through the input.
* **Space Complexity:** $O(1)$, as we only store three integer values in our dictionary regardless of the input size.

---

## Summary

| Approach | Technique | Time Complexity | Space Complexity | Pros/Cons |
| :--- | :--- | :--- | :--- | :--- |
| **Approach 1** | Sliding Window (Map) | $O(N)$ | $O(1)$ | Intuitive and highly adaptable to problems with more than 3 characters. |
| **Approach 2** | Last Seen Indices | $O(N)$ | $O(1)$ | Highly optimized; minimal operations per step; very elegant. |

**Final Verdict:** While both approaches are $O(N)$, **Approach 2** is generally faster in practice due to its simplicity and fewer operations per iteration. It is the most efficient way to solve this problem.