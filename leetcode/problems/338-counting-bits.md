# [338. Counting Bits](https://leetcode.com/problems/counting-bits)

## Problem Statement

Given an integer $n$, return an array `ans` of length $n + 1$ such that for each $i$ ($0 \le i \le n$), `ans[i]` is the number of $1$s in the binary representation of $i$.

### Example 1:
**Input:** $n = 2$  
**Output:** `[0, 1, 1]`  
**Explanation:**
- $0 \to 0$
- $1 \to 1$
- $2 \to 10$

### Example 2:
**Input:** $n = 5$  
**Output:** `[0, 1, 1, 2, 1, 2]`  
**Explanation:**
- $0 \to 0$
- $1 \to 1$
- $2 \to 10$
- $3 \to 11$
- $4 \to 100$
- $5 \to 101$

### Constraints:
- $0 \le n \le 10^5$

## Approach

To solve this problem, we need to iterate through every integer from $0$ up to $n$ and count how many set bits (1s) each integer contains in its binary form.

A highly efficient way to count set bits for a single integer is using **Brian Kernighan's Algorithm**. The fundamental idea behind this algorithm is that the operation `n & (n - 1)` always flips the least significant set bit of $n$ to $0$. 

For example, if we have $n = 6$ (binary `110`):
1. `6 & 5` $\to$ `110 & 101` = `100` (binary for 4). One bit removed.
2. `4 & 3` $\to$ `100 & 011` = `000` (binary for 0). Second bit removed.
3. The loop terminates when $n$ reaches $0$.

By repeatedly applying this bitwise operation, the number of iterations required to reduce the integer to $0$ is exactly equal to the number of set bits present in that integer. We apply this logic to every number in the range $[0, n]$ and store the results in an array.

## Complexity Analysis

* **Time Complexity:** $O(n \cdot \text{set\_bits})$, which effectively behaves as $O(n \log n)$. For each of the $n$ numbers, we perform operations proportional to the number of set bits, and a number $n$ has at most $\log_2(n)$ bits.
* **Space Complexity:** $O(1)$, excluding the space required for the output array, as we only use a few variables for counting.

## Code

```python
class Solution:
    def countBits(self, n: int) -> list[int]:
        """
        Returns an array where each index i contains the number of 1's 
        in the binary representation of i.
        """
        
        def count_set_bits(num: int) -> int:
            """
            Uses Brian Kernighan's algorithm to count set bits.
            """
            set_bits_count = 0
            while num > 0:
                # This operation clears the least significant set bit
                num &= (num - 1)
                set_bits_count += 1
            return set_bits_count

        # Generate the result array by calculating bits for each i from 0 to n
        return [count_set_bits(i) for i in range(n + 1)]
```