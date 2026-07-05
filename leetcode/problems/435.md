# [435. Non-overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals)

## Problem Statement

Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, return the **minimum number of intervals** you need to remove to make the rest of the intervals non-overlapping.

**Note:** Intervals that only touch at a single point are considered non-overlapping. For example, $[1, 2]$ and $[2, 3]$ are non-overlapping.

---

## Approach

This problem is a classic application of the **Greedy Algorithm**, specifically a variation of the "Interval Scheduling Maximization Problem."

### The Strategy
To minimize the number of intervals we remove, we must maximize the number of intervals we keep. The optimal strategy is to always pick the interval that **finishes the earliest**. By choosing the interval with the smallest end time, we leave as much room as possible for subsequent intervals to fit without overlapping.

### Step-by-Step Logic
1.  **Sort the Intervals:** We sort the intervals based on their **end times** ($end_i$). This is crucial because the end time determines how much space is left for future intervals.
2.  **Track the Last End Time:** We maintain a variable, let's call it `last_end_time`, which tracks the end of the last interval we decided to keep. Initially, this can be set to $-\infty$.
3.  **Iterate and Compare:** For each interval `[start, end]` in the sorted list:
    *   If `start >= last_end_time`, it means there is no overlap. We "keep" this interval and update `last_end_time = end`.
    *   If `start < last_end_time`, it means there is an overlap. To minimize removals, we must remove one of the overlapping intervals. In our greedy approach, we effectively "remove" the current interval and increment our `removed_count`.

---

## Implementation

```python
import math
from typing import List

class Solution:
    def eraseOverlapIntervals(self, intervals: List[List[int]]) -> int:
        # Step 1: Sort intervals by their end times.
        # This allows us to always pick the interval that finishes earliest.
        intervals.sort(key=lambda x: x[1])
        
        # last_end_time tracks the end of the last added non-overlapping interval.
        last_end_time = -math.inf
        removed_count = 0
        
        for start, end in intervals:
            if start >= last_end_time:
                # No overlap: update the end time to the current interval's end.
                last_end_time = end
            else:
                # Overlap detected: increment the count of intervals to remove.
                removed_count += 1
                
        return removed_count
```

---

## Complexity Analysis

### Time Complexity
The time complexity is dominated by the sorting step.
*   **Sorting:** $O(N \log N)$, where $N$ is the number of intervals in the input array.
*   **Iteration:** $O(N)$ to traverse the sorted list once.
*   **Total Time Complexity:** $O(N \log N)$.

### Space Complexity
*   **Space Complexity:** $O(1)$ or $O(N)$. While the algorithm itself uses constant extra space, the space complexity of the sorting algorithm used by Python (Timsort) can be $O(N)$ in the worst case.