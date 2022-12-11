// ! find way to reuse code?
// ! make values private?
// * use recursion when more efficient
// ! wrap methods in try-catch for error handling -- many methods do not consider inputs outside bounds of list
// ! make into module, so that class List can be exported into other projects

class List {
    // container for the list itself
    constructor(head, ...data) {
        this.head = new Node(head);
        this.size = 0;
        if (head !== undefined) {
            this.size++;
        }
        if ([...data].length > 0) {
            [...data].forEach(item => this.append(item));
        }
    }

    // * return size of list (number of nodes)
    getSize() {
        console.log(this.size);
        return this.size;
    }

    // * return head of list
    getHead() {
        console.log(this.head);
        return this.head;
    }

    // * return tail of list
    getTail() {
        let i = 0;
        let tailNode = this.head;
        while (i < this.size - 1) {
            tailNode = tailNode.next;
            i++;
        }
        console.log(tailNode);
        return tailNode;
    }

    // * return node at given index
    getNodeAt(targetIndex) {
        // ^ errors: index out of range, index not an integer
        if (targetIndex < 0) {
            targetIndex += this.size;
        }
        let i = 0;
        let targetNode = this.head;
        while (i < targetIndex) {
            targetNode = targetNode.next;
            i++;
        }
        console.log(targetNode);
        return targetNode;
    }

    // * return index of passed value
    getIndexOf(value) {
        // ^ errors: value does not exist in list
        const getIndex = (i, targetValue, node) => {
            let targetIndex;
            if (node.data === targetValue) {
                targetIndex = i;
            } else {
                i++;
                targetIndex = getIndex(i, targetValue, node.next);
            }
            return targetIndex;
        }
        let targetIndex = getIndex(0, value, this.head);
        console.log(targetIndex);
        return targetIndex;
    }

    // * return true if passed value is contained in list
    contains(value) {
        const checkValue = (targetValue, node) => {
            let contains;
            if (node.data === targetValue) {
                contains = true;
            } else if (node.next === null) {
                contains = false;
            } else {
                contains = checkValue(targetValue, node.next);
            }
            return contains;
        }
        let contains = checkValue(value, this.head);
        console.log(contains);
        return contains;
    }

    // * append to end of list
    append(value) {
        // ^ reuse getTail()
        const getTailNode = () => {
            let i = 0;
            let tailNode = this.head;
            while (i < this.size - 1) {
                tailNode = tailNode.next;
                i++;
            }
            return tailNode;
        }
        if (this.head.data === null) {
            this.head.data = value;
            this.size++;
        } else {
            let tailNode = getTailNode();
            tailNode.next = new Node(value);
            this.size++;
        }
    }

    // * prepend to start of list
    prepend(value) {
        if (this.head.data === null) {
            this.head.data = value;
            this.size++;
        } else {
            let newNode = new Node(value);
            newNode.next = this.head;
            this.head = newNode;
            this.size++;
        }
    }

    // * insert new node at given index
    insertAt(value, index) {
        // ^ errors: index out of range, index is not an integer
        const traverseToTarget = (i, targetIndex, node) => {
            let previousNode;
            if (i === targetIndex - 1) {
                previousNode = node;
            } else {
                i++;
                previousNode = traverseToTarget(i, targetIndex, node.next);
            }
            return previousNode;
        }
        let newNode = new Node(value);
        if (index === 0) {
            if (this.size === 0) {
                this.head.data = value;
            } else {
                newNode.next = this.head;
                this.head = newNode;
            }
            this.size++;
        } else {
            let previousNode = traverseToTarget(0, index, this.head);
            newNode.next = previousNode.next;
            previousNode.next = newNode;
            this.size++;
        }
    }

    // * remove node at given index
    removeAt(index) {
        // ^ errors: index out of range, index not an integer, head already === null (empty list)
        const traverseToTarget = (i, targetIndex, node) => {
            let previousNode;
            if (i === targetIndex - 1) {
                previousNode = node;
            } else {
                i++;
                previousNode = traverseToTarget(i, targetIndex, node.next);
            }
            return previousNode;
        }
        if (index === 0) {
            if (this.size === 1) {
                this.head.data = null;
            } else {
                let newHead = this.head.next;
                this.head = newHead;
            }
            this.size--;
        } else {
            let previousNode = traverseToTarget(0, index, this.head);
            let newNext = previousNode.next.next;
            previousNode.next = newNext;
            this.size--;
        }
    }

    // * pop last item from list
    pop() {
        // ^ errors: head already === null (empty list)
        let lastNode;
        const getNextToLast = (node) => {
            if (node.next.next !== null) {
                getNextToLast(node.next);
            } else {
                lastNode = node.next;
                node.next = null;
            }
        }
        if (this.size === 1) {
            this.head.data = null;
            lastNode = this.head;
        } else {
            getNextToLast(this.head);
        }
        this.size --;
        return lastNode;
    }

    // * shift first item from list
    shift() {
        // ^ errors: head already === null (empty list)
        let firstNode;
        if (this.size === 1) {
            this.head.data = null;
            firstNode = this.head;
        } else {
            firstNode = new Node(this.head.data);
            this.head = this.head.next;
        }
        this.size--;
        return firstNode;
    }

    // * represent list as a string value ( value ) -> ( value ) -> ( value ) -> null
    print() {
        const appendData = (node) => {
            listString += `( ${node.data} ) -> `;
            if (node.next === null) {
                listString += 'null';
            }
        }
        let listString = '';
        let node = this.head;
        let i = 0;
        if (this.size === 0) {
            listString = '( null ) -> null'
        } else {
            while (i < this.size) {
                appendData(node);
                node = node.next;
                i++;
            }
        }
        console.log(listString);
        return listString;
    }
}

class Node {
    constructor(value = null) {
        this.data = value;
        this.next = null;
    }
}

let testList = new List(1);

// testList.getSize();
// testList.getHead();
// testList.getTail();
// testList.contains(-1);
// testList.getNodeAt(3);
// testList.getIndexOf(6);

// testList.append(6);
// testList.prepend(0);
// testList.insertAt(2.5, 2);
// testList.removeAt(0);
// let lastNode = testList.pop();
// console.log(lastNode);
// let firstNode = testList.shift();
// console.log(firstNode);

testList.print();
console.log(testList);