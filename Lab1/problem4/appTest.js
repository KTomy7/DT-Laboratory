function test1() {
    var result = getFibonacci(2);
    if (result.toString() == '0,1') {
        console.log('Test 1 passed');
    } else {
        console.log('Test 1 FAILED. Result: ' + result);
    }
}

function test2() {
    var result = getFibonacci(5);
    if (result.toString() == '0,1,1,2,3') {
        console.log('Test 2 passed');
    } else {
        console.log('Test 2 FAILED. Result: ' + result);
    }
}

function test3() {
    var result = getFibonacci();
    if (result == 'not allowed') {
        console.log('Test 3 passed');
    } else {
        console.log('Test 3 FAILED. Result: ' + result);
    }
}

function test4() {
    var result = getFibonacci(11);
    if (result == 'not allowed') {
        console.log('Test 4 passed');
    } else {
        console.log('Test 4 FAILED. Result: ' + result);
    }
}

test1();
test2();
test3();
test4();
