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

        // levelOrder() {

        // }
        // preOrder() {

        // }
        // inOrder() {

        // }
        // postOrder() {

        // }
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
            this.scrubValueInput(value);
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
            this.scrubValueInput(value);
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
            this.scrubValueInput(value);
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
                    node.data = this.findNextBiggest(node.right);
                    node.right = this.delete(node.data, node.right);
                }
            }
            return node;
        }
        findValue(value, node = this.root) {
            this.scrubValueInput(value);
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
        findNextBiggest(root) { // ! revisit -- check node.left vs node.right
            let minValue = root.data;
            while (root.left !== null) {
                minValue = root.left.data;
                root = root.left;
            }
            return minValue;
        }
        findNextSmallest(root) {    // ! make to compliment findNextBiggest()
            let minValue = root.data;
            while (root.left !== null) {
                minValue = root.left.data;
                root = root.left;
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
        scrubValueInput(value) {
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

let testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let testTree = buildTree(testArray);
console.log(testTree);
testTree.printTree();
let nextBiggest = testTree.findNextBiggest(8);
console.log(nextBiggest);
