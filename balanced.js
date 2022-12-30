function buildTree(array) {
    class Node {
        constructor(value = null) {
            this.data = value;
            this.left = null;
            this.right = null;
        }
    }
    class Tree {
        constructor(node = null) {
            this.root = node;
        }

        isBalanced() {
            let leftHeight = this.getHeight(this.root.left);
            let rightHeight = this.getHeight(this.root.right);
            let difference = leftHeight - rightHeight;
            if (difference >= -1 && difference <= 1) {
                return true;
            } else {
                return false;
            }
        }
        rebalance() {
            let newArray = this.inOrder();
            newArray = removeDuplicates(newArray);
            let newList = makeNodeList(newArray, 0, newArray.length - 1);
            this.root = newList;
        }
        levelOrder(node = this.root) {
            let queue = [];
            let array = [];
            queue.push(node);
            while (queue.length !== 0) {
                let childNode = queue.shift();
                array.push(childNode.data);
                if (childNode.left !== null) {
                    queue.push(childNode.left);
                }
                if (childNode.right !== null) {
                    queue.push(childNode.right);
                }
            }
            return array;
        }
        preOrder(node = this.root, array = []) {
            if (node === null) {
                return;
            } else {
                array.push(node.data);
                this.preOrder(node.left, array);
                this.preOrder(node.right, array);
            }
            return array;
        }
        inOrder(node = this.root, array = []) {
            if (node === null) {
                return;
            } else {
                this.inOrder(node.left, array);
                array.push(node.data);
                this.inOrder(node.right, array);
            }
            return array;
        }
        postOrder(node = this.root, array = []) {
            if (node === null) {
                return;
            } else {
                this.postOrder(node.left, array);
                this.postOrder(node.right, array);
                array.push(node.data);
            }
            return array;
        }
        getHeight(node = this.root) {
            if (node === null) {
                return 0;
            } else {
                let lh = this.getHeight(node.left);
                let rh = this.getHeight(node.right);
                if (lh > rh) {
                    return lh + 1;
                } else {
                    return rh + 1;
                }
            }
        }
        getDepth(value, node = this.root) {
            // depth === # edges from root from root to provided node
            this.checkForInputError(value);
            let depth;
            if (node === null) {
                depth = 'value not found';
            }
            if (node.data === value) {
                return 0;
            } else {
                if (value < node.data) {
                    depth = this.getDepth(value, node.left) + 1;
                } else if (value > node.data) {
                    depth = this.getDepth(value, node.right) + 1;
                }
            }
            return depth;
        }
        insert(value, node = this.root) {
            this.checkForInputError(value);
            if (node === null) {
                node = new Node(value);
                return node;
            } else {
                if (value < node.data) {
                    node.left = this.insert(value, node.left);
                } else if (value > node.data) {
                    node.right = this.insert(value, node.right);
                }
            }
            return node;
        }
        delete(value, node = this.root) {
            this.checkForInputError(value);
            if (node === null) {
                return null;
            } else if (value < node.data) {
                node.left = this.delete(value, node.left);
            } else if (value > node.data) {
                node.right = this.delete(value, node.right);
            } else if (value === node.data) {
                if (node.left === null) {
                    return node.right;
                } else if (node.right === null) {
                    return node.left;
                } else {
                    node.data = this.findNextBiggest(node);
                    node.right = this.delete(node.data, node.right);
                }
            }
            return node;
        }
        findValue(value, node = this.root) {
            this.checkForInputError(value);
            let targetNode;
            if (node === null) {
                targetNode = 'value not found';
            } else if (value === node.data) {
                return node;
            } else {
                if (value < node.data) {
                    targetNode = this.findValue(value, node.left);
                } else if (value > node.data) {
                    targetNode = this.findValue(value, node.right);
                }
            }
            return targetNode;
        }
        findNextBiggest(node) {
            node = node.right
            let minValue = node.data;
            while (node.left !== null) {
                minValue = node.left.data;
                node = node.left;
            }
            return minValue;
        }
        printTree(node = this.root, prefix = '', isLeft = true) {
            if (node.right !== null) {
                this.printTree(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
            }
            console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
            if (node.left !== null) {
                this.printTree(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
            }
        }
        checkForInputError(value) {
            if (value === undefined) {
                console.log('no value provided');
                return;
            }
        }
    }

    function sort(array) {
        let length = array.length;
        if (length <= 1) {
            return array
        } else {
            let midpoint = Math.floor(array.length / 2);
            let left = sort(array.slice(0, midpoint));
            let right = sort(array.slice(midpoint, length));
            let mergedArray = [];
            let l = 0;
            let r = 0;
            while (l < (left.length) && r < (right.length)) {
                let leftItem = left[l];
                let rightItem = right[r];
                if (leftItem < rightItem) {
                    mergedArray.push(leftItem);
                    l++;
                } else {
                    mergedArray.push(rightItem);
                    r++;
                }
            }
            return [...mergedArray, ...left.slice(l), ...right.slice(r)];
        }
    }
    function removeDuplicates(array) {
        array = [... new Set(array)];
        return array;
    }
    function makeNodeList(array, startIndex, endIndex) {
        let node;
        if (startIndex > endIndex) {
            return null;
        } else {
            let middleIndex = Math.floor((startIndex + endIndex) / 2);
            node = new Node(array[middleIndex])
            node.left = makeNodeList(array, startIndex, middleIndex - 1);
            node.right = makeNodeList(array, middleIndex + 1, endIndex)
        }
        return node;
    }

    array = sort(array);
    array = removeDuplicates(array);
    let list = makeNodeList(array, 0, array.length - 1);
    let tree = new Tree(list);
    return tree;
}

function automate() {
    // create
    let testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
    let testTree = buildTree(testArray);
    console.log(testTree);
    console.log(`balanced?: ${testTree.isBalanced()}`);
    testTree.printTree();

    // traverse
    let levelOrder = testTree.levelOrder();
    console.log(`level order: [${levelOrder}]`);
    let preOrder = testTree.preOrder();
    console.log(`pre order: [${preOrder}]`);
    let inOrder = testTree.inOrder();
    console.log(`in order: [${inOrder}]`);
    let postOrder = testTree.postOrder();
    console.log(`post order: [${postOrder}]`);

    // add data
    for (let i = 200; i < 210; i++) {
        testTree.insert(i);
    }
    console.log(testTree);
    console.log(`balanced?: ${testTree.isBalanced()}`);
    testTree.printTree();

    // rebalance
    testTree.rebalance();
    console.log(`balanced?: ${testTree.isBalanced()}`);
    testTree.printTree();

    // traverse
    levelOrder = testTree.levelOrder();
    console.log(`level order: [${levelOrder}]`);
    preOrder = testTree.preOrder();
    console.log(`pre order: [${preOrder}]`);
    inOrder = testTree.inOrder();
    console.log(`in order: [${inOrder}]`);
    postOrder = testTree.postOrder();
    console.log(`post order: [${postOrder}]`);
}

// ----------- ----------- ----------- ----------- ----------- -----------
automate();
