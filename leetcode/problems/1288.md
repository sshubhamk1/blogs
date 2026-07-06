# [1288. Remove Covered Intervals](https://leetcode.com/problems/remove-covered-intervals)

## Problem Statement

Given an array `intervals` where `intervals[i] = [li, ri)` represents the interval $[l_i, r_i)$, remove all intervals that are covered by another interval in the list.

An interval $[a, b)$ is covered by the interval $[c, d)$ if and only if:
$$c \le a \quad \text{and} \quad b \le d$$

Return the number of remaining intervals.

### Example 1:
**Input:** `intervals = [[1,4],[3,6],[2,8]]`  
**Output:** `2`  
**Explanation:** Interval $[3,6]$ is covered by $[2,8]$, therefore it is removed.

### Example 2:
**Input:** `intervals = [[1,4],[2,3]]`  
**Output:** `1`

---

## Approach

To solve this problem efficiently, we need to identify if an interval is a subset of another. The core idea is to use a **Greedy Approach** combined with **Sorting**.

### The Sorting Strategy
The key to this problem lies in how we sort the intervals. We sort the intervals based on two criteria:
1.  **Start Point (Ascending):** We want to process intervals as they appear from left to right.
2.  **End Point (Descending):** If two intervals have the same start point, we place the longer interval first. This is crucial because the longer interval will automatically cover the shorter one.

By applying this sorting logic, for any two consecutive intervals $i$ and $j$ where $i < j$ in our sorted list, we are guaranteed that:
$$start_i \le start_j$$

Because of this, the only condition we need to check to determine if interval $j$ is covered by an interval seen previously is whether its end point is less than or equal to the maximum end point we have encountered so far.

### Algorithm Steps:
1.  **Sort** the `intervals` array:
    *   Primary key: $l_i$ ascending.
    *   Secondary key: $r_i$ descending.
2.  Initialize `count = 0` and `max_end_so_far = 0`.
3.  Iterate through the sorted intervals:
    *   If the current interval's end point $r_i$ is **greater** than `max_end_so_far`, it means this interval is **not covered** by any previously processed interval.
    *   In this case, increment `count` and update `max_end_so_far = r_i`.
    *   If $r_i \le max\_end\_so\_far$, the current interval is covered, so we ignore it.
4.  Return the `count`.

### Complexity Analysis
*   **Time Complexity:** $O(N \log N)$, where $N$ is the number of intervals. This is due to the sorting step. The subsequent linear scan takes $O(N)$.
*   **Space Complexity:** $O(1)$ or $O(\log N)$ depending on the implementation of the sorting algorithm used by the language.

---

## Implementation

```python
class Solution:
    def removeCoveredIntervals(self, intervals: List[List[int]]) -> int:
        # Sort intervals: 
        # 1. By start point ascending (x[0])
        # 2. By end point descending (-x[1]) if start points are equal
        intervals.sort(key=lambda x: (x[0], -x[1]))
        
        remaining_count = 0
        max_end_so_far = 0
        
        for start, end in intervals:
            # If the current interval's end is greater than the max end seen so far,
            # it is a unique interval that is not covered by previous ones.
            if end > max_end_so_far:
                remaining_count += 1
                max_end_so_far = end
            # If end <= max_end_so_far, the current interval is covered by 
            # a previous interval because the start point is already guaranteed 
            # to be >= the start point of the interval that provided max_end_so_far.
                
        return remaining_count
```