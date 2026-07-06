# [1268. Search Suggestions System](https://leetcode.com/problems/search-suggestions-system)

## Problem Statement

You are given an array of strings `products` and a string `searchWord`.

Design a system that suggests at most three product names from `products` after each character of `searchWord` is typed. Suggested products should have a common prefix with `searchWord`. If there are more than three products with a common prefix, return the three lexicographically smallest products.

Return a list of lists of the suggested products after each character of `searchWord` is typed.

## Intuition

The problem asks us to find strings with a specific prefix and return the top three lexicographical results. This is a classic use case for a **Trie (Prefix Tree)** data structure. A Trie allows us to efficiently navigate through characters and find all words that share a common prefix.

By building a Trie from the `products` array, we can traverse the tree character by character as the `searchWord` is typed. Once we reach the node representing the current prefix, we can perform a Depth First Search (DFS) to find the first three words that complete that prefix. Since we traverse the children of each node in alphabetical order, the first three words we encounter are guaranteed to be the lexicographically smallest ones.

## Complexity Analysis

Let $N$ be the number of products, $L$ be the maximum length of a product, and $M$ be the length of the `searchWord`.

**Time Complexity:** $O(N \cdot L + M \cdot L)$
- **Building the Trie:** We insert $N$ products, each of length up to $L$, resulting in $O(N \cdot L)$.
- **Searching:** For each of the $M$ characters in `searchWord`, we traverse the Trie and potentially perform a DFS. In the worst case, the search takes $O(L)$ per character.

**Space Complexity:** $O(N \cdot L)$
- The Trie stores all characters of all products. In the worst case, this occupies $O(N \cdot L)$ space.

## Implementation

```python
import string
from typing import List

class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end_of_word = False

    def insert(self, word: str):
        current_node = self
        for char in word:
            if char not in current_node.children:
                current_node.children[char] = TrieNode()
            current_node = current_node.children[char]
        current_node.is_end_of_word = True

    def get_top_k_words(self, current_node: 'TrieNode', prefix: str, count: int = 3):
        """
        Performs a DFS to find the top 'count' lexicographical words 
        starting from the current node.
        """
        if count <= 0 or not current_node:
            return []

        suggestions = []
        
        # If the current node marks the end of a valid word, add it to suggestions
        if current_node.is_end_of_word:
            suggestions.append(prefix)
            count -= 1

        # Traverse children in alphabetical order to ensure lexicographical smallest results
        for char in string.ascii_lowercase:
            if count == 0:
                break
            
            if char in current_node.children:
                child_suggestions = self.get_top_k_words(
                    current_node.children[char], 
                    prefix + char, 
                    count
                )
                
                if child_suggestions:
                    # Adjust count based on words found in the subtree
                    suggestions.extend(child_suggestions)
                    count -= len(child_suggestions)
                    
                    # Further limit suggestions to the requested count
                    if len(suggestions) >= 3:
                        suggestions = suggestions[:3]
                        count = 0 # Stop further processing
                        break
                        
        return suggestions[:3]

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str):
        self.root.insert(word)

    def get_suggestions(self, prefix_node: TrieNode, current_prefix: str):
        return self.root.get_top_k_words(prefix_node, current_prefix)

class Solution:
    def suggestedProducts(self, products: List[str], searchWord: str) -> List[List[str]]:
        trie = Trie()
        for product in products:
            trie.insert(product)

        results = []
        current_node = trie.root
        prefix_built = ""

        for char in searchWord:
            prefix_built += char
            
            # If the path breaks, no more words will match for this and subsequent characters
            if not current_node or char not in current_node.children:
                current_node = None
                results.append([])
            else:
                current_node = current_node.children[char]
                # Perform DFS from the current node to get top 3 suggestions
                results.append(trie.get_suggestions(current_node, prefix_built))
                
        return results
```