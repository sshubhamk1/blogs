# [714. Best Time to Buy and Sell Stock with Transaction Fee](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee)

## Problem Statement

You are given an array `prices` where `prices[i]` is the price of a given stock on the $i^{th}$ day, and an integer `fee` representing a transaction fee.

Find the maximum profit you can achieve. You may complete as many transactions as you like, but you need to pay the transaction fee for each transaction.

**Note:**
* You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).
* The transaction fee is only charged once for each stock purchase and sale.

**Example 1:**
**Input:** `prices = [1, 3, 2, 8, 4, 9], fee = 2`  
**Output:** `8`  
**Explanation:** The maximum profit can be achieved by:
* Buying at `prices[0] = 1`
* Selling at `prices[3] = 8`
* Buying at `prices[4] = 4`
* Selling at `prices[5] = 9`  
The total profit is $((8 - 1) - 2) + ((9 - 4) - 2) = 8$.

**Example 2:**
**Input:** `prices = [1, 3, 7, 5, 10, 3], fee = 3`  
**Output:** `6`

**Constraints:**
* $1 \le \text{prices.length} \le 5 \times 10^4$
* $1 \le \text{prices}[i] < 5 \times 10^4$
* $0 \le \text{fee} < 5 \times 10^4$

---

## Approach

This problem can be modeled using **Dynamic Programming (DP)**. To solve it efficiently, we need to track our financial state at the end of each day. Since we can either be holding a stock or not holding a stock, we can define two distinct states for any given day $i$.

### The Two States

1.  **State 1: Not Holding a Stock (`max_profit_no_stock`)**  
    This represents the maximum profit we can have on day $i$ if we do **not** own a stock.
    
2.  **State 2: Holding a Stock (`max_profit_holding_stock`)**  
    This represents the maximum profit we can have on day $i$ if we **do** own a stock.

### State Transitions

For every new day, we calculate our new states based on the states from the previous day:

**1. To be in the "Not Holding" state today:**
* We either already had no stock yesterday and did nothing today.
* Or, we had a stock yesterday and sold it today at the current `price`.
$$\text{max\_profit\_no\_stock} = \max(\text{max\_profit\_no\_stock}, \text{max\_profit\_holding\_stock} + \text{price})$$

**2. To be in the "Holding" state today:**
* We either already had a stock yesterday and did nothing today.
* Or, we had no stock yesterday and we bought a stock today at the current `price`. When we buy, we must also account for the transaction `fee`.
$$\text{max\_profit\_holding\_stock} = \max(\text{max\_profit\_holding\_stock}, \text{max\_profit\_no\_stock} - \text{price} - \text{fee})$$

### Why this works
By iterating through the prices once and updating these two values, we essentially explore all possible transaction paths. The `max` function ensures that we only transition to a state if it results in a higher profit than our current state. By the end of the loop, the maximum profit will be the value in the `max_profit_no_stock` state, as it is never optimal to end the period holding a stock that has lost value or cost us money.

---

## Complexity Analysis

* **Time Complexity:** $O(n)$, where $n$ is the length of the `prices` array. We iterate through the list exactly once.
* **Space Complexity:** $O(1)$. We only maintain two variables (`max_profit_no_stock` and `max_profit_holding_stock`) regardless of the input size.

---

## Implementation

```python
import math
from typing import List

class Solution:
    def maxProfit(self, prices: List[int], fee: int) -> int:
        # max_profit_no_stock: The maximum profit if we don't hold a stock at the end of the day.
        max_profit_no_stock = 0
        
        # max_profit_holding_stock: The maximum profit if we are currently holding a stock.
        # Initialized to -infinity because we haven't bought anything yet.
        max_profit_holding_stock = -math.inf
        
        for price in prices:
            # 1. Update max_profit_no_stock:
            # Either we stay without a stock, or we sell our current stock at today's price.
            max_profit_no_stock = max(max_profit_no_stock, max_profit_holding_stock + price)
            
            # 2. Update max_profit_holding_stock:
            # Either we keep our current stock, or we buy a new stock using our available profit.
            # We subtract the fee at the time of purchase to simplify the calculation.
            max_profit_holding_stock = max(max_profit_holding_stock, max_profit_no_stock - price - fee)
            
        return max_profit_no_stock
```