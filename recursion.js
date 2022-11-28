// print fib array iteratively

function printFibI(n) {
    let a = 1;
    let b = 1;
    let c;
    let array = [];
    if (n === 0) {
        array = [0];
        return array;
    } else if (n === 1) {
        array = [0, 1];
        return array;
    } else if (n === 2) {
        array = [0, 1, 1];
        return array;
    } else {
        array = [0, 1, 1];
        for (let i = 2; i < n; i++) {
            c = a + b;
            a = b;
            b = c;
            array.push(c);
        }
        return array;
    }
}

// print fib array recursively
