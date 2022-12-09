// ! wrap methods in try-catch for error handling -- many methods do not consider inputs outside bounds of list
// ! find way to reuse code
// ! use recursion when possible
// ! make into module, so that class List can be exported into other projects

class List {
    // container for the list itself
    constructor(head, ...data) {
        this.head = new Node(head);
        this.size = 1;
        if ([...data].length > 0) {
            [...data].forEach(item => this.append(item));
        }
    }

    // * append to end of list
    append(value) {
        const getLastNode = (node) => {
            let last;
            if (node.next !== null) {
                last = getLastNode(node.next);
            } else {
                last = node;
            }
            return last;
        }
        let lastNode = getLastNode(this.head);
        lastNode.next = new Node(value);
        this.size++;
    }

    // * prepend to start of list
    prepend(value) {
        let newNode = new Node(value);
        newNode.next = this.head;
        this.head = newNode;
        this.size++;
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
        const getTail = (node) => {
            let tail;
            if (node.next !== null) {
                tail = getTail(node.next);
            } else {
                tail = node;
            }
            return tail;
        }
        let tailNode = getTail(this.head);
        console.log(tailNode);
        return tailNode;
    }

    // * return node at given index
    getAtIndex(targetIndex) {
        if (targetIndex < 0) {
            targetIndex += this.size;
            console.log(targetIndex);
        }
        if (targetIndex >= this.size) {
            let error = 'index out of range';
            console.log(error);
            return error;
        } else {
            let currentIndex = 0;
            let node = this.head;
            while (currentIndex < targetIndex) {
                node = node.next;
                currentIndex++;
            }
            console.log(node);
            return node;
        }
    }

    // * pop last item from list
    pop() {
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
            this.head = null;
            lastNode = this.head;
        } else {
            getNextToLast(this.head);
        }
        this.size --;
        return lastNode;
    }

    // * shift first item from list
    shift() {
        let firstNode;
        firstNode = new Node(this.head.data);
        this.head = this.head.next;
        this.size--;
        return firstNode;
    }

    // * return true if passed value is contained in list
    contains(value) {
        let i = 0;
        let contains = false;;
        let node = this.head
        while (i < this.size) {
            if (node.data === value) {
                contains = true;
                break;
            } else {
                node = node.next;
            }
            i++;
        }
        console.log(contains);
        return contains;
    }

    // * return index of passed value
    getIndexOf(value) {
        // check if node contains
        // if yes... return index counter
        // if no... check next node, increment index counter
        let i = 0;
        let node = this.head
        while (i < this.size) {
            if (node.data === value) {
                break;
            } else {
                node = node.next;
                i++;
            }
        }
        console.log(i);
        return i;
    }

    // * insert new node at given index
    insertAt(value, index) {
        let i = 0;
        let node = this.head;
        let previousNode;
        let nextNode;
        while (i <= index) {
            if (i === index - 1) {
                previousNode = node;
            } else if (i === index) {
                nextNode = node;
                let newNode = new Node(value);
                newNode.next = nextNode;
                previousNode.next = newNode;
            }
            node = node.next;
            i++;
        }
        this.size++;
    }

    // * remove node at given index
    removeAt(index) {
        let i = 0;
        if (index === 0) {
            let nextNode = this.head.next;
            this.head = nextNode;
        } else if (index === this.size - 1) {
            const getNextToLast = (node) => {
                if (node.next.next !== null) {
                    getNextToLast(node.next);
                } else {
                    node.next = null;
                }
            }
            if (this.size === 1) {
                this.head = null;
            } else {
                getNextToLast(this.head);
            }
            this.size --;
        } else {
            let node = this.head;
            let previousNode;
            let nextNode
            while (i <= index) {
                if (i === index - 1) {
                    previousNode = node;
                } if (i === index) {
                    nextNode = node.next;
                    previousNode.next = nextNode;
                }
                node = node.next;
                i++;
            }
        }
        this.size--;
    }

    // * represent list as a string value ( value ) -> ( value ) -> ( value ) -> null
    print() {
        const appendData = (node) => {
            listString += `( ${node.data} ) -> `;
            if (node.next === null) {
                listString += ' null ';
            }
        }
        let listString = '';
        let node = this.head;
        let i = 0;
        while (i < this.size) {
            console.log(node);
            appendData(node);
            node = node.next;
            i++;
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

let testList = new List(1, 2, 3, 4, 5);
// console.log(testList);

// testList.append(6);
// testList.prepend(0);
// testList.insertAt(4.5, 5);
// testList.removeAt(5);
// let lastNode = testList.pop();
// let firstNode = testList.shift();

// testList.getSize();
// testList.getHead();
// testList.getTail();
// testList.getAtIndex(3);
// testList.getIndexOf(6);
// testList.contains(8);

// testList.print();