# [208. Implement Trie (Prefix Tree)](https://leetcode.com/problems/implement-trie-prefix-tree)

## Problem Statement

A **Trie** (pronounced as "try") or **Prefix Tree** is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. Tries are highly efficient for tasks involving string prefix matching.

Common applications include:
* **Autocomplete systems:** Suggesting words based on a partial prefix.
* **Spell checkers:** Verifying if a word exists in a dictionary.
* **IP Routing:** Longest prefix matching in networking.

Implement the `Trie` class:
* `Trie()` Initializes the trie object.
* `void insert(String word)` Inserts the string `word` into the trie.
* `boolean search(String word)` Returns `true` if the string `word` is in the trie (i.e., it was inserted before), and `false` otherwise.
* `boolean startsWith(String prefix)` Returns `true` if there is a previously inserted string that has the prefix `prefix`, and `false` otherwise.

---

## Complexity Analysis

Let $L$ represent the length of the string (word or prefix) being processed.

### Time Complexity

| Operation | Complexity | Description |
| :--- | :--- | :--- |
| `insert` | $O(L)$ | Each character in the word is visited once to create or traverse nodes. |
| `search` | $O(L)$ | Each character in the word is visited once to traverse the tree. |
| `startsWith` | $O(L)$ | Each character in the prefix is visited once to traverse the tree. |

### Space Complexity

* **Space Complexity:** $O(N \times L)$, where $N$ is the total number of words inserted and $L$ is the average length of the words. In the worst case, every character of every word requires a dedicated node in the Trie.

---

## Approach

The implementation uses a hierarchical tree structure where each node represents a character. Instead of using a standard boolean flag for the end of a word, we use a special key `None` within a dictionary to denote that a valid word terminates at that specific node.

### Detailed Logic:
1. **Node Structure:** Each `Node` contains a dictionary (`children`) where keys are characters and values are the next `Node` objects.
2. **`insert`:** We traverse the tree character by character. If a character is not present in the current node's dictionary, we create a new `Node`. Once the loop finishes, we mark the end of the word by setting `node.children[None] = True`.
3. **`search`:** We follow the characters of the word through the tree. If a character is missing, the word does not exist. If we reach the end of the word, we check if `None` exists in the current node's dictionary to ensure it's a complete word and not just a prefix of a longer word.
4. **`startsWith`:** This follows the same logic as `search`, but we don't check for the `None` terminator. We only check if the path for the prefix exists.

## My Solution

```python
class Node:
    """Represents a single character node in the Trie."""
    def __init__(self):
        # Dictionary to store child nodes
        # We use None as a special key to mark the end of a valid word
        self.children = {}

class Trie:
    def __init__(self):
        """
        Initializes the trie object.
        """
        self.root = Node()

    def insert(self, word: str) -> None:
        """
        Inserts the string word into the trie.
        """
        current_node = self.root
        for char in word:
            # If the character is not in the current node's children, add it
            if char not in current_node.children:
                current_node.children[char] = Node()
            current_node = current_node.children[char]
        
        # Mark the end of the word by adding None as a key
        current_node.children[None] = True

    def search(self, word: str) -> bool:
        """
        Returns true if the string word is in the trie, and false otherwise.
        """
        current_node = self.root
        for char in word:
            # If at any point the character is not found, return False
            if char not in current_node.children:
                return False
            current_node = current_node.children[char]
        
        # Check if the None key exists to confirm it is a complete word
        return current_node.children.get(None, False)

    def startsWith(self, prefix: str) -> bool:
        """
        Returns true if there is a previously inserted string that has the given prefix.
        """
        current_node = self.root
        for char in prefix:
            # If character path doesn't exist, prefix doesn't exist
            if char not in current_node.children:
                return False
            current_node = current_node.children[char]
        
        # If we traversed the entire prefix, return True
        return True

# Your Trie object will be instantiated and called as such:
# obj = Trie()
# obj.insert(word)
# param_2 = obj.search(word)
# param_3 = obj.startsWith(prefix)
```