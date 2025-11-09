const { NotImplementedError } = require("../lib/errors");
const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    let node = new Node(data);

    if (!this.rootNode) {
      this.rootNode = node;
    } else {
      let currentNode = this.rootNode;

      while (currentNode) {
        if (currentNode.data > node.data) {
          if (!currentNode.left) {
            currentNode.left = node;
            break;
          }
          currentNode = currentNode.left;
        } else {
          if (!currentNode.right) {
            currentNode.right = node;
            break;
          }
          currentNode = currentNode.right;
        }
      }
    }
  }

  find(data) {
    if (!this.rootNode) {
      return null;
    }

    if (this.rootNode.data === data) {
      return this.root();
    }

    let currentNode = this.rootNode;

    while (currentNode) {
      if (currentNode.data > data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }

      if (currentNode?.data === data) {
        return currentNode;
      }
    }

    return null;
  }

  has(data) {
    if (!this.rootNode) {
      return false;
    }

    if (this.rootNode.data === data) {
      return true;
    }

    let currentNode = this.rootNode;

    while (currentNode) {
      if (currentNode.data > data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }

      if (currentNode?.data === data) {
        return true;
      }
    }

    return false;
  }

  remove(data) {
    let currentNode = this.rootNode;
    let parentNode = null;

    while (currentNode) {
      if (currentNode.data > data) {
        parentNode = currentNode;
        currentNode = currentNode.left;
      } else if (currentNode.data < data) {
        parentNode = currentNode;
        currentNode = currentNode.right;
      } else {
        if (!currentNode) {
          return;
        }

        if (!currentNode.left && !currentNode.right) {
          if (!parentNode) {
            this.rootNode = null;
          } else {
            if (parentNode.left === currentNode) {
              parentNode.left = null;
            } else {
              parentNode.right = null;
            }
          }
        } else if (currentNode.left && currentNode.right) {
          let minCurrentNode = currentNode.right;
          let minParentNode = null;

          while (minCurrentNode.left) {
            minParentNode = minCurrentNode;
            minCurrentNode = minCurrentNode.left;
          }

          currentNode.data = minCurrentNode.data;

          if (minCurrentNode.right) {
            minParentNode.left = minCurrentNode.right;
          } else {
            // minParentNode.left = null;
          }
        } else {
          if (!parentNode) {
            this.rootNode =
              currentNode.left !== null ? currentNode.left : currentNode.right;
          } else {
            if (parentNode.left === currentNode) {
              parentNode.left = currentNode.left || currentNode.right;
            } else {
              parentNode.right = currentNode.right || currentNode.left;
            }
          }
        }
        break;
      }
    }
  }

  min() {
    if (!this.root) {
      return null;
    }

    let currentNode = this.rootNode;

    while (currentNode.left) {
      currentNode = currentNode.left;
    }

    return currentNode.data;
  }

  max() {
    let currentNode = this.rootNode;

    while (currentNode.right) {
      currentNode = currentNode.right;
    }

    return currentNode.data;
  }
}

module.exports = {
  BinarySearchTree,
};
