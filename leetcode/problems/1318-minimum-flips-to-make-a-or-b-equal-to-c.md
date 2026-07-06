# [1318. Minimum Flips to Make a OR b Equal to c](https://leetcode.com/problems/minimum-flips-to-make-a-or-b-equal-to-c/description)

## Problem Statement

Given three positive integers $a$, $b$, and $c$. Return the minimum number of flips required in the bits of $a$ and $b$ to make the condition $(a \text{ OR } b) == c$ true.

A **flip operation** consists of changing a single bit from $1$ to $0$ or from $0$ to $1$ in the binary representation of the numbers.

### Example 1:
**Input:** `a = 2, b = 6, c = 5`  
**Output:** `3`  
**Explanation:** After flips, $a = 1$, $b = 4$, and $c = 5$ such that $(a \text{ OR } b) == c$.

### Example 2:
**Input:** `a = 4, b = 2, c = 7`  
**Output:** `1`

### Example 3:
**Input:** `a = 1, b = 2, c = 3`  
**Output:** `0`

### Constraints:
- $1 \le a \le 10^9$
- $1 \le b \le 10^9$
- $1 \le c \le 10^9$

---

## Approach

To solve this problem, we need to analyze the numbers bit by bit. Since the maximum value is $10^9$, which fits within a 32-bit integer, we can iterate through each bit position from $0$ to $31$.

For each bit position $i$, we compare the $i$-th bit of $a$, $b$, and $c$. The bitwise OR operation $a \mid b = c$ dictates the following rules for each bit:

1.  **If the $i$-th bit of $c$ is $0$:**
    - Both the $i$-th bit of $a$ and the $i$-th bit of $b$ **must** be $0$.
    - If the $i$-th bit of $a$ is $1$, we need $1$ flip.
    - If the $i$-th bit of $b$ is $1$, we need $1$ flip.
    - Therefore, if $c_i = 0$, the number of flips required is the sum of the bits in $a$ and $b$ at that position (where bits are treated as $0$ or $1$).

2.  **If the $i$-th bit of $c$ is $1$:**
    - At least one of the $i$-th bits of $a$ or $b$ **must** be $1$.
    - If both $a_i$ and $b_i$ are $0$, we need exactly $1$ flip (either $a$ or $b$ must be changed to $1$) to satisfy the OR condition.
    - If at least one of them is already $1$, no flips are required for this position.

By summing the required flips across all 32 bits, we arrive at the minimum total flips.

### Complexity Analysis

- **Time Complexity:** $O(1)$ — We always iterate through a fixed number of bits (32), regardless of the input size.
- **Space Complexity:** $O(1)$ — We only use a few integer variables for counting and bit manipulation.

---

## Implementation

```python
class Solution:
    def minFlips(self, a: int, b: int, c: int) -> int:
        """
        Calculates the minimum flips to satisfy (a | b == c)
        """
        flip_count = 0
        
        # Iterate through 32 bits to cover the range up to 10^9
        for i in range(32):
            # Extract the i-th bit and convert to 1 (if set) or 0 (if not set)
            bit_a = 1 if (a & (1 << i)) else 0
            bit_b = 1 if (b & (1 << i)) else 0
            bit_c = 1 if (c & (1 << i)) else 0
            
            if bit_c == 0:
                # Case: Target bit in c is 0. 
                # Both a and b must have 0 at this position.
                # If either (or both) have 1, we must flip them.
                flip_count += (bit_a + bit_b)
            else:
                # Case: Target bit in c is 1.
                # At least one of a or b must have 1 at this position.
                # If both are 0, we need 1 flip to change one of them to 1.
                if bit_a + bit_b == 0:
                    flip_count += 1
                    
        return flip_count
```