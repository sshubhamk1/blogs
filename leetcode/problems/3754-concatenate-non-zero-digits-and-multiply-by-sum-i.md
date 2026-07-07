# [3754. Concatenate Non-Zero Digits and Multiply by Sum I](https://leetcode.com/problems/concatenate-non-zero-digits-and-multiply-by-sum-i)

## Problem Statement

You are given an integer $n$.

1. Form a new integer $x$ by concatenating all the non-zero digits of $n$ in their original order. If there are no non-zero digits, $x = 0$.
2. Let $\text{sum}$ be the sum of the digits in $x$.

Return an integer representing the value of $x \times \text{sum}$.

### Example 1
**Input:** `n = 10203004`  
**Output:** `12340`  
**Explanation:**
- The non-zero digits are $1, 2, 3,$ and $4$. Thus, $x = 1234$.
- The sum of digits is $\text{sum} = 1 + 2 + 3 + 4 = 10$.
- Therefore, the answer is $x \times \text{sum} = 1234 \times 10 = 12340$.

### Example 2
**Input:** `n = 1000`  
**Output:** `1`  
**Explanation:**
- The only non-zero digit is $1$, so $x = 1$ and $\text{sum} = 1$.
- Therefore, the answer is $x \times \text{sum} = 1 \times 1 = 1$.

### Constraints
- $0 \le n \le 10^9$

---

## Approach

This problem is straightforward to implement. To solve it, we need to extract the digits, filter out the zeros, and then perform two aggregations: one to concatenate the digits into a single number and another to calculate their sum.

While a simple loop would suffice, we can use Python's functional programming tools like `reduce` to make the digit summation more expressive. This is a great way to practice higher-order functions which are useful for more complex data manipulation tasks.

### Step-by-Step Breakdown

1.  **Extract Non-Zero Digits**: Convert the integer $n$ to a string to easily iterate through its digits. We filter this list to keep only characters that are not `'0'`.
2.  **Handle Edge Cases**: If the list of non-zero digits is empty (which happens if $n=0$ or $n$ consists only of zeros), the problem defines $x = 0$, making the final result $0$.
3.  **Calculate the Sum**: Use the `reduce` function to iterate through the non-zero digits and accumulate their sum.
4.  **Form $x$ and Multiply**: Concatenate the non-zero digits using `"".join()` and convert the resulting string back into an integer $x$. Finally, return $x \times \text{sum}$.

### Complexity Analysis

*   **Time Complexity**: $O(d)$, where $d$ is the number of digits in $n$. Given the constraint $n \le 10^9$, $d$ is at most 10, making this operation extremely fast—essentially $O(1)$ in practice.
*   **Space Complexity**: $O(d)$ to store the list of non-zero digits before processing them.

---

## Implementation

```python
from functools import reduce

class Solution:
    def sumAndMultiply(self, n: int) -> int:
        # 1. Extract all non-zero digits as strings
        # This allows us to easily join them later and iterate through them
        non_zero_digits = [char for char in str(n) if char != '0']
        
        # 2. Handle the case where there are no non-zero digits
        if not non_zero_digits:
            return 0
        
        # 3. Calculate the sum of the non-zero digits using reduce
        # We initialize the accumulator at 0 to ensure we are working with integers
        digit_sum = reduce(lambda a, b: a + int(b), non_zero_digits, 0)
        
        # 4. Form the integer 'x' by joining the non-zero digits
        x = int("".join(non_zero_digits))
        
        # 5. Return the product of x and the sum of its digits
        return x * digit_sum
```