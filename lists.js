class Node {
    constructor(value = null) {
        this.data = value;
        this.next = null;
    }
}

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
        return this.size;
    }

    // * return head of list
    getHead() {
        return this.head;
    }

    // * return tail of list
    getTail() {
        let tailNode = this.head;
        if (this.size <= 1) {
            tailNode = this.head;
        } else {
            let i = 0;
            while (i < this.size - 1) {
                tailNode = tailNode.next;
                i++;
            }
        }
        return tailNode;
    }

    // * return node at given index
    getNodeAt(targetIndex) {
        const checkError = (index) => {
            if (typeof index !== 'number') {
                return [true, 'getNodeAt() ** ERROR: index not of type Number **'];
            } else if (index >= this.size) {
                return [true, 'getNodeAt() ** ERROR: index out of range **'];
            } else if (index % 1 !== 0) {
                return [true, 'getNodeAt() ** ERROR: index not whole integer **'];
            } else {
                return false;
            }
        }
        let error = checkError(targetIndex);
        if (error[0] === true) {
            console.log(error[1]);
        } else {
            if (targetIndex < 0) {
                targetIndex += this.size;
            }
            let i = 0;
            let targetNode = this.head;
            while (i < targetIndex) {
                targetNode = targetNode.next;
                i++;
            }
            return targetNode;
        }
    }

    // * return index of passed value
    getIndexOf(value) {
        let doesContain = this.contains(value);
        if (doesContain === false) {
            console.log('getIndexOf() ** ERROR: value does not exist **');
        } else {
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
            return targetIndex;
        }
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
        return contains;
    }

    // * append to end of list
    append(value) {
        if (this.head.data === null) {
            this.head.data = value;
            this.size++;
        } else {
            let tailNode = this.getTail();
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
    insertAt(value, targetIndex) {
        const checkError = (index) => {
            if (typeof index !== 'number') {
                return [true, 'insertAt() ** ERROR: index not of type Number **'];
            } else if (index > this.size) {
                return [true, 'insertAt() ** ERROR: index out of range **'];
            } else if (index % 1 !== 0) {
                return [true, 'insertAt() ** ERROR: index not whole integer **'];
            } else {
                return false;
            }
        }
        let error = checkError(targetIndex);
        if (error[0] === true) {
            console.log(error[1]);
        } else {
            let newNode = new Node(value);
            if (targetIndex === 0) {
                if (this.size === 0) {
                    this.head.data = value;
                } else {
                    newNode.next = this.head;
                    this.head = newNode;
                }
                this.size++;
            } else {
                let previousNode = this.getNodeAt(targetIndex - 1);
                newNode.next = previousNode.next;
                previousNode.next = newNode;
                this.size++;
            }
        }
    }

    // * remove node at given index
    removeAt(targetIndex) {
        const checkError = (index) => {
            if (typeof index !== 'number') {
                return [true, 'removeAt() ** ERROR: index not of type Number **'];
            } else if (index >= this.size && this.size > 0) {
                return [true, 'removeAt() ** ERROR: index out of range **'];
            } else if (index % 1 !== 0) {
                return [true, 'removeAt() ** ERROR: index not whole integer **'];
            } else if (this.head.data === null) {
                return [true, 'removeAt() ** ERROR: no data at head'];
            } else {
                return false;
            }
        }
        let error = checkError(targetIndex);
        if (error[0] === true) {
            console.log(error[1]);
        } else {
            if (targetIndex === 0) {
                if (this.size === 1) {
                    this.head.data = null;
                } else {
                    let newHead = this.head.next;
                    this.head = newHead;
                }
            } else {
                let previousNode = this.getNodeAt(targetIndex - 1);
                let newNext = previousNode.next.next;
                previousNode.next = newNext;
            }
            this.size--;
        }
    }

    // * pop last item from list
    pop() {
        const checkError = () => {
            if (this.head.data === null) {
                return [true, 'removeAt() ** ERROR: no data at head'];
            } else {
                return false;
            }
        }
        let error = checkError();
        if (error[0] === true) {
            console.log(error[1]);
        } else {
            let lastNode;
            if (this.size === 1) {
                lastNode = new Node(this.head.data);
                this.head.data = null;
            } else {
                let nextToLast = this.getNodeAt(this.size - 2);
                lastNode = nextToLast.next;
                nextToLast.next = null;
            }
            this.size --;
            return lastNode;
        }
    }

    // * shift first item from list
    shift() {
        const checkError = () => {
            if (this.head.data === null) {
                return [true, 'removeAt() ** ERROR: no data at head'];
            } else {
                return false;
            }
        }
        let error = checkError();
        if (error[0] === true) {
            console.log(error[1]);
        } else {
            let firstNode;
            firstNode = new Node(this.head.data);
            if (this.size === 1) {
                this.head.data = null;
            } else {
                this.head = this.head.next;
            }
            this.size--;
            return firstNode;
        }
    }

    // * represent list as a string value
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
        return listString;
    }
}