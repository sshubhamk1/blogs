# [1358. Number of Substrings Containing All Three Characters](https://leetcode.com/problems/number-of-substrings-containing-all-three-characters)

## Problem Overview

Given a string `s` consisting of characters from 'a', 'b', and 'c', the goal is to find the total number of substrings that contain at least one occurrence of all three characters ('a', 'b', and 'c').

For example, if the input string is `"abcabc"`, the valid substrings include `"abc"`, `"abca"`, `"abcab"`, `"abcabc"`, `"bca"`, and so on. Since the length of the string can be up to $5 \times 10^4$, an efficient $O(N)$ solution is required to pass the time constraints.

---

## Approach 1: Sliding Window (Using a Frequency Map)

The first approach uses a **Sliding Window (Two Pointers)** technique combined with a frequency map to keep track of the character counts within the current window.

### The Logic

The core idea is to expand a window by moving a `right` pointer until the window satisfies our condition (containing at least one 'a', one 'b', and one 'c'). 

Once the window from `left` to `right` becomes valid, we realize that **every substring that starts at the current `left` and ends at any index from `right` to the end of the string** is also valid. 

1.  Expand the `right` pointer to include a new character.
2.  While the window is valid (contains 'a', 'b', and 'c'):
    *   Calculate how many valid substrings start at the current `left` index. If the window is valid, there are $n - right$ such substrings.
    *   Shrink the window from the `left` to explore the next possible starting position.

### Implementation

```python
from collections import defaultdict

class Solution:
    def numberOfSubstrings(self, s: str) -> int:
        total_count = 0
        n = len(s)
        char_counts = defaultdict(int)
        left = 0

        # Helper function to check if the current window contains all three characters
        def is_valid() -> bool:
            return char_counts['a'] > 0 and char_counts['b'] > 0 and char_counts['c'] > 0

        for right in range(n):
            # Add the current character to the frequency map
            char_counts[s[right]] += 1

            # When the window becomes valid, we know that any substring starting 
            # at 'left' and ending at or after 'right' is valid.
            while is_valid():
                # Add all substrings from 'right' to the end of the string
                total_count += (n - right)
                
                # Shrink the window from the left to check for smaller valid windows
                char_counts[s[left]] -= 1
                left += 1
                
        return total_count
```

### Complexity Analysis
*   **Time Complexity:** $O(N)$, where $N$ is the length of the string. Although there is a nested `while` loop, the `left` and `right` pointers each traverse the string exactly once.
*   **Space Complexity:** $O(1)$, because the dictionary will only ever store a maximum of three keys ('a', 'b', and 'c').

---

## Approach 2: Optimized Sliding Window (Tracking Last Seen Indices)

While the first approach is efficient, we can optimize it further. Instead of maintaining a frequency map and a nested loop, we can simply keep track of the **last seen index** for each of the three characters.

### The Logic

As we iterate through the string, we update the last recorded position of 'a', 'b', or 'c'. 

At any given index $i$, the smallest index among the last seen positions of 'a', 'b', and 'c' tells us the **latest possible starting point** for a valid substring ending at $i$. 

Let $min\_idx = \min(\text{last\_a}, \text{last\_b}, \text{last\_c})$. 
If $min\_idx \ge 0$, then all substrings starting at index $0, 1, \dots, min\_idx$ and ending at index $i$ are valid. This gives us exactly $min\_idx + 1$ valid substrings ending at the current index $i$.

### Implementation

```python
class Solution:
    def numberOfSubstrings(self, s: str) -> int:
        total_substrings = 0
        # Initialize the last seen positions of a, b, and c to -1
        last_seen = {'a': -1, 'b': -1, 'c': -1}

        for i, char in enumerate(s):
            # Update the last seen index for the current character
            last_seen[char] = i
            
            # The smallest index among the last seen positions 
            # represents the starting point of the shortest valid substring ending at i.
            min_last_idx = min(last_seen.values())
            
            # If min_last_idx is -1, we haven't seen all three characters yet.
            # If it is >= 0, add the number of valid starting positions.
            if min_last_idx != -1:
                total_substrings += (min_last_idx + 1)
                
        return total_substrings
```

### Complexity Analysis
*   **Time Complexity:** $O(N)$, where $N$ is the length of the string. We perform a single pass through the string.
*   **Space Complexity:** $O(1)$, as we only store three integer variables regardless of the input size.

---

## Summary

| Approach | Technique | Time Complexity | Space Complexity | Pros/Cons |
| :--- | :--- | :--- | :--- | :--- |
| **Approach 1** | Sliding Window (Map) | $O(N)$ | $O(1)$ | Intuitive and easy to generalize for more characters. |
| **Approach 2** | Last Seen Indices | $O(N)$ | $O(1)$ | Highly optimized; minimal operations per iteration. |

For this problem, **Approach 2** is the most elegant and efficient way to handle the constraints, as it avoids the overhead of a frequency map and nested loop logic.