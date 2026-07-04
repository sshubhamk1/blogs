# [739. Daily Temperatures](https://leetcode.com/problems/daily-temperatures)

When tackling array-based problems where you need to find the "next greater element" or the "nearest larger neighbor," a specific data structure often emerges as the most efficient tool: the **Monotonic Stack**. 

Today, we are diving into [739. Daily Temperatures](https://leetcode.com/problems/daily-temperatures) to see exactly how this concept works to optimize what would otherwise be a brute-force approach.

## The Problem Statement

Given an array of integers `temperatures`, where `temperatures[i]` is the temperature on the $i^{th}$ day, return an array `answer` such that `answer[i]` is the number of days you have to wait until a warmer temperature occurs. If there is no future day for which this is true, keep `answer[i] = 0` instead.

**Example:**
- **Input:** `temperatures = [73, 74, 75, 71, 69, 72, 76, 73]`
- **Output:** `[1, 1, 4, 2, 1, 1, 0, 0]`

---

## The Intuition: Why a Monotonic Stack?

A naive approach would be to use a nested loop to check every subsequent day for each temperature. However, this would result in a time complexity of $O(n^2)$, which is inefficient for large datasets.

Instead, we use a **Monotonic Decreasing Stack**. 

The idea is to keep track of the indices of days for which we haven't yet found a warmer temperature. We store these indices in a stack. Because we only push indices onto the stack when the current temperature is *lower* than or equal to the temperature at the index on the top of the stack, the temperatures corresponding to the indices in our stack will always be in non-increasing order.

As soon as we encounter a temperature higher than the one at the index stored at the top of our stack, we have found the "next warmer day" for that index. We "pop" the index from the stack, calculate the difference between the current day and that stored index, and update our result.

## The Implementation

Here is the clean implementation of this logic in Python:

```python
from typing import List

class Solution:
    def dailyTemperatures(self, temperatures: List[int]) -> List[int]:
        total_days = len(temperatures)
        # Initialize the result array with 0s
        days_to_warmer = [0] * total_days
        # This stack will store indices of temperatures we haven't found a warmer day for yet
        stack = []

        for current_index, current_temp in enumerate(temperatures):
            # While the stack is not empty and the current temperature 
            # is higher than the temperature at the index on top of the stack
            while stack and current_temp > temperatures[stack[-1]]:
                # The index of the day we just found a warmer temperature for
                previous_index = stack.pop()
                # The number of days to wait is the difference between the indices
                days_to_warmer[previous_index] = current_index - previous_index
            
            # Push the current day's index onto the stack to find its warmer day later
            stack.append(current_index)
            
        return days_to_warmer
```

## Step-by-Step Walkthrough

Let's trace the algorithm with the input: `[73, 74, 75, 71]`

1.  **Index 0 (Temp 73):** Stack is empty. Push `0`. $\text{Stack} = [0]$.
2.  **Index 1 (Temp 74):** $74 > \text{temperatures}[0]$ ($73$). 
    *   Pop `0`.
    *   `days_to_warmer[0] = 1 - 0 = 1`.
    *   Push `1`. $\text{Stack} = [1]$.
3.  **Index 2 (Temp 75):** $75 > \text{temperatures}[1]$ ($74$).
    *   Pop `1`.
    *   `days_to_warmer[1] = 2 - 1 = 1`.
    *   Push `2`. $\text{Stack} = [2]$.
4.  **Index 3 (Temp 71):** $71 \ngtr \text{temperatures}[2]$ ($75$).
    *   Push `3`. $\text{Stack} = [2, 3]$.

**Final Result Calculation:** Any indices remaining in the stack (like `2` and `3`) naturally correspond to the `0` values we initialized in our `days_to_warmer` array, signifying no warmer day was found.

## Complexity Analysis

### Time Complexity: $O(n)$
Even though there is a `while` loop inside a `for` loop, each index is pushed onto the stack exactly once and popped from the stack at most once. Therefore, the total number of operations is proportional to $2n$, which simplifies to $O(n)$, where $n$ is the length of the temperature array.

### Space Complexity: $O(n)$
In the worst-case scenario (e.g., a strictly decreasing temperature list like `[100, 90, 80, 70]`), we might end up storing all $n$ indices in our stack, leading to a space complexity of $O(n)$.

## Summary
The monotonic stack is a powerful pattern for solving "next element" problems. By maintaining a sorted order of indices within the stack, we transform a potentially quadratic problem into a linear one, making our solution highly efficient for large-scale data.