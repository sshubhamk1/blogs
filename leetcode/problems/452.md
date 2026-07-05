# [452. Minimum Number of Arrows to Burst Balloons](https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons)

## Problem Statement

There are some spherical balloons taped onto a flat wall that represents the $XY$-plane. The balloons are represented as a 2D integer array `points` where `points[i] = [xstart, xend]` denotes a balloon whose horizontal diameter stretches between $x_{start}$ and $x_{end}$. You do not know the exact $y$-coordinates of the balloons.

Arrows can be shot up directly vertically (in the positive $y$-direction) from different points along the $x$-axis. A balloon with $x_{start}$ and $x_{end}$ is burst by an arrow shot at $x$ if $x_{start} \le x \le x_{end}$. There is no limit to the number of arrows that can be shot. A shot arrow keeps traveling up infinitely, bursting any balloons in its path.

Given the array `points`, return the minimum number of arrows that must be shot to burst all balloons.

## Intuition

The problem asks for the minimum number of points (arrows) needed to hit all given intervals. This is a classic interval problem that can be solved using a **Greedy Approach**. 

To minimize the number of arrows, we want each arrow to burst as many balloons as possible. This happens when we pick an $x$-coordinate that falls within the intersection of the maximum number of balloon intervals. We can approach this by either finding the overlapping "common window" among consecutive balloons or by sorting the balloons by their end positions to ensure each arrow is placed at the most efficient position.

---

## Solutions

### Solution 1: Interval Intersection (Sorting by Start)

In this approach, we first sort the balloons based on their starting coordinates. We then maintain a "common window" (the intersection) where all balloons encountered so far overlap. As we iterate through the sorted balloons, if a new balloon overlaps with our current window, we shrink the window to reflect the new intersection. If a balloon does not overlap, it means the current window has reached its limit, so we must fire an arrow and start a new window.

```python
from typing import List

class Solution:
    def findMinArrowShots(self, points: List[List[int]]) -> int:
        if not points:
            return 0
        
        # Sort balloons based on their start coordinates
        points.sort()
        
        arrow_count = 0
        n = len(points)
        
        # Initialize the intersection window with the first balloon
        current_window_start = points[0][0]
        current_window_end = points[0][1]
        
        for i in range(1, n):
            # If the next balloon overlaps with the current window
            if points[i][0] <= current_window_end:
                # Update the intersection window to find the common overlap
                current_window_start = max(current_window_start, points[i][0])
                current_window_end = min(current_window_end, points[i][1])
            else:
                # No overlap: the current window is exhausted. 
                # Increment arrow count and start a new window
                arrow_count += 1
                current_window_start, current_window_end = points[i]
        
        # Add the final arrow for the last window
        return arrow_count + 1
```

**Complexity Analysis:**
*   **Time Complexity:** $O(N \log N)$, where $N$ is the number of balloons, due to the sorting step.
*   **Space Complexity:** $O(1)$ or $O(N)$ depending on the implementation of the sorting algorithm used by the language.

---

### Solution 2: Greedy Strategy (Sorting by End)

A more efficient way to implement the greedy strategy is to sort the balloons by their **end coordinates**. By always shooting an arrow at the end of the current balloon, we maximize the chances of hitting subsequent balloons that start before or at that position.

```python
from typing import List

class Solution:
    def findMinArrowShots(self, points: List[List[int]]) -> int:
        if not points:
            return 0
            
        # Sort balloons based on their end coordinates
        # This ensures we always pick the optimal position to burst the current balloon
        points.sort(key=lambda x: x[1])
        
        # Initialize with the end of the first balloon
        last_arrow_pos = points[0][1]
        arrows_needed = 1
        
        for i in range(1, len(points)):
            current_start = points[i][0]
            
            # If the current balloon starts after the last arrow position
            if current_start > last_arrow_pos:
                # We need a new arrow
                arrows_needed += 1
                # The new arrow is placed at the end of the current balloon
                last_arrow_pos = points[i][1]
                
        return arrows_needed
```

**Complexity Analysis:**
*   **Time Complexity:** $O(N \log N)$ for sorting the array.
*   **Space Complexity:** $O(1)$ as we only use a few variables for tracking.