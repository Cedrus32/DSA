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

        printTree(node = this.root, prefix = '', isLeft = true) {
            if (node.right !== null) {
                this.printTree(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
            }
            console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
            if (node.left !== null) {
                this.printTree(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
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

testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let testTree = buildTree(testArray);
console.log(testTree);
testTree.printTree();
