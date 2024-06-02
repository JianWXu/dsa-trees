/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    let stack = [{ node: this.root, depth: 1 }];
    let minDepth = Infinity;

    while (stack.length > 0) {
      let { node, depth } = stack.pop();

      if (!node.left && !node.right) {
        minDepth = Math.min(minDepth, depth);
      }

      if (node.right) {
        stack.push({ node: node.right, depth: depth + 1 });
      }

      if (node.left) {
        stack.push({ node: node.left, depth: depth + 1 });
      }
    }

    return minDepth;
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    let stack = [{ node: this.root, depth: 1 }];
    let maxDepth = 0;

    while (stack.length > 0) {
      let { node, depth } = stack.pop();

      maxDepth = Math.max(maxDepth, depth);

      if (node.right) {
        stack.push({ node: node.right, depth: depth + 1 });
      }

      if (node.left) {
        stack.push({ node: node.left, depth: depth + 1 });
      }
    }
    return maxDepth;
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let maxSum = -Infinity;

    function helper(node) {
      if (!node) return 0;

      // Recursively find the maximum sum on the left and right subtrees
      let leftMax = Math.max(0, helper(node.left));
      let rightMax = Math.max(0, helper(node.right));

      // Calculate the maximum sum passing through the current node
      let currentMax = node.val + Math.max(leftMax, rightMax);

      // Update the global maximum sum
      maxSum = Math.max(maxSum, currentMax);

      // Return the maximum extendable sum from this node
      return node.val + Math.max(leftMax, rightMax);
    }

    helper(this.root);
    return maxSum;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    let val = null;
    let stack = [this.root]; // Initialize the stack with the root node
    if (!stack.length) return null; // Check if the stack is empty

    while (stack.length > 0) {
      let node = stack.pop();

      if (
        node.left &&
        node.left.val > lowerBound &&
        (!val || node.left.val < val)
      ) {
        stack.push(node.left);
        val = node.left.val;
      }

      if (
        node.right &&
        node.right.val > lowerBound &&
        (!val || node.right.val < val)
      ) {
        stack.push(node.right);
        val = node.right.val;
      }
    }
    return val;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  //   areCousins(node1, node2) {}

  //   /** Further study!
  //    * serialize(tree): serialize the BinaryTree object tree into a string. */

  //   static serialize() {}

  //   /** Further study!
  //    * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  //   static deserialize() {}

  //   /** Further study!
  //    * lowestCommonAncestor(node1, node2): find the lowest common ancestor
  //    * of two nodes in a binary tree. */

  //   lowestCommonAncestor(node1, node2) {}
}

module.exports = { BinaryTree, BinaryTreeNode };
