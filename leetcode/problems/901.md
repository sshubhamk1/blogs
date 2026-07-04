# [901. Online Stock Span](https://leetcode.com/problems/online-stock-span)

In financial technology and algorithmic trading, processing time-series data efficiently is crucial. A common task is calculating the "span" of a stock's price—essentially looking backward to see how many consecutive days the price stayed at or below the current price.

In this post, we will dive into an optimized approach to solving the **Online Stock Span** problem using a **Monotonic Stack**.

---

## 🧠 Problem Statement

Design an algorithm that collects daily price quotes for a stock and returns the **span** of that stock's price for the current day.

The **span** of the stock's price on a given day is defined as the maximum number of consecutive days (starting from today and going backward) for which the stock price was less than or equal to today's price.

### Example 1:
**Input:** 
`prices = [7, 2, 1, 2, 3, 2, 4, 2]`
**Output:**
- `next(7)` $\rightarrow 1$
- `next(2)` $\rightarrow 1$
- `next(1)` $\rightarrow 1$
- `next(2)` $\rightarrow 3$ (prices: $[2, 1, 2]$ are $\le 2$)
- `next(3)` $\rightarrow 4$ (prices: $[3, 2, 1, 2]$ are $\le 3$)

---

## 💡 Intuition and Approach

### The Naive Approach
The simplest way to solve this would be to maintain a list of all previous prices. For every new price, we iterate backward through the list until we find a price greater than the current one. While intuitive, this results in a **$O(n^2)$** time complexity in the worst case (e.g., a strictly decreasing sequence of prices), which is inefficient for large datasets.

### The Optimized Approach: Monotonic Stack
To achieve better performance, we use a **Monotonic Stack**. The key insight is this: **We don't need to store every single previous price.** 

Instead, we only need to store prices that are "significant"—specifically, prices that are higher than the ones we've already processed. When we encounter a new price, it "absorbs" the spans of all previous prices that are smaller than or equal to it.

**The Strategy:**
1. We maintain a stack of tuples: `(price, span)`.
2. For every new `price`:
   - Start with a `current_span` of $1$ (representing the current day).
   - While the stack is not empty and the price at the top of the stack is $\le$ the current `price`:
     - Pop the top element from the stack.
     - Add its `span` to our `current_span`.
   - Push the `(price, current_span)` onto the stack.
   - Return the `current_span`.

By storing the accumulated span alongside the price, we bypass the need to re-examine every single previous day.

---

## 💻 Implementation

Here is the clean and efficient implementation in Python:

```python
class StockSpanner:

    def __init__(self):
        """
        Initialize the StockSpanner object.
        We use a stack to store tuples of (price, span).
        """
        self.stack = []

    def next(self, price: int) -> int:
        """
        Returns the span of the stock's price given that today's price is 'price'.
        """
        # The current day always counts as a span of 1
        current_span = 1
        
        # If the current price is greater than or equal to the price on the top of the stack,
        # it means the current price's span includes the span of the previous prices.
        while self.stack and self.stack[-1][0] <= price:
            # Pop the previous price and add its accumulated span to the current span
            previous_price, previous_span = self.stack.pop()
            current_span += previous_span
            
        # Push the current price and its calculated span onto the stack
        self.stack.append((price, current_span))
        
        return current_span

# Your StockSpanner object will be instantiated and called as such:
# obj = StockSpanner()
# param_1 = obj.next(price)
```

---

## 📊 Complexity Analysis

### Time Complexity: $O(1)$ (Amortized)
At first glance, the `while` loop inside the `next()` method might look like it could lead to $O(n)$ per call. However, if we look at the lifecycle of each price:
- Each price is pushed onto the stack **exactly once**.
- Each price is popped from the stack **at most once**.

Therefore, across $n$ calls to `next()`, the total number of operations is proportional to $n$. This gives us an **amortized time complexity of $O(1)$** per `next()` call.

### Space Complexity: $O(n)$
In the worst-case scenario (e.g., prices are in strictly decreasing order), we might end up storing every single price in the stack. Thus, the space complexity is **$O(n)$**, where $n$ is the number of calls to the `next()` function.

---

## ✅ Conclusion
The Monotonic Stack is a powerful tool for problems involving "nearest larger/smaller element" queries. By storing the cumulative span instead of just the raw price, we transformed an $O(n^2)$ brute-force approach into a highly efficient $O(n)$ amortized solution, making it perfect for real-time data streaming!