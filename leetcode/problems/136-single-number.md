# [136. Single Number](https://leetcode.com/problems/single-number)

## Problem Statement

Given a non-empty array of integers `nums`, every element appears twice except for one. Your goal is to find that single unique element.

To solve this efficiently, you must implement a solution that meets the following constraints:
*   **Time Complexity:** $O(n)$ (Linear runtime)
*   **Space Complexity:** $O(1)$ (Constant extra space)

### Examples

**Example 1:**
**Input:** `nums = [2, 2, 1]`  
**Output:** `1`

**Example 2:**
**Input:** `nums = [4, 1, 2, 1, 2]`  
**Output:** `4`

**Example 3:**
**Input:** `nums = [1]`  
**Output:** `1`

## Approach

The most efficient way to solve this problem while adhering to the $O(1)$ space constraint is to use the **Bitwise XOR** operation.

### The Logic of XOR

The XOR ($\oplus$) operator has several mathematical properties that make it ideal for finding unique elements in a collection of pairs:

1.  **Self-Inverse Property:** Any number XORed with itself results in zero.
    $$x \oplus x = 0$$
2.  **Identity Property:** Any number XORed with zero remains unchanged.
    $$x \oplus 0 = x$$
3.  **Commutative and Associative Properties:** The order in which you perform XOR operations does not matter.
    $$a \oplus b = b \oplus a$$
    $$(a \oplus b) \oplus c = a \oplus (b \oplus c)$$

### How it applies to this problem

When we iterate through the array and apply the XOR operation to every number, the elements that appear twice will eventually pair up and cancel each other out to zero ($x \oplus x = 0$). Since zero XORed with any number returns that number ($0 \oplus y = y$), the only value left standing after the entire array has been processed will be the single, unique number.

**Example Walkthrough (`nums = [4, 1, 2, 1, 2]`):**

1.  $0 \oplus 4 = 4$
2.  $4 \oplus 1 = 5$ (binary `100 ^ 001 = 101`)
3.  $5 \oplus 2 = 7$ (binary `101 ^ 010 = 111`)
4.  $7 \oplus 1 = 6$ (binary `111 ^ 001 = 110`)
5.  $6 \oplus 2 = 4$ (binary `110 ^ 010 = 100`)

**Final Result:** `4`

## Complexity Analysis

*   **Time Complexity:** $O(n)$, where $n$ is the length of the array. We traverse the list exactly once to perform the XOR operations.
*   **Space Complexity:** $O(1)$. We only use a single variable to store the cumulative XOR result, regardless of the input size.

## Implementation

The following implementation utilizes Python's `functools.reduce` to apply the XOR operation cumulatively across the list.

```python
from functools import reduce
from typing import List

class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        """
        Finds the single element in an array where every other element appears twice.
        
        Args:
            nums: A list of integers where every element appears twice except for one.
            
        Returns:
            The unique integer that appears only once.
        """
        # Using reduce to apply the XOR operator (^) across all elements in the list.
        # All duplicate pairs will cancel each other out to 0, leaving the unique number.
        return reduce(lambda accumulator, current_value: accumulator ^ current_value, nums)
```