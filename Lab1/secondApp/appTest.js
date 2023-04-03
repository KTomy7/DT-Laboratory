function test() {
    console.log(sum(0)==0?"Passed":"Failed");
    console.log(sum(2)==3?"Passed":"Failed");
    console.log(sum(4)==10?"Passed":"Failed");
    console.log(sum()=="n is undefined"?"Passed":"Failed");
}
 
function test1() {
    var result = sum("abc");
    console.log(result == "n is not a number"?"Passed":"Failed");
}

function test2() {
    var result = sum(true);
    console.log(result == "n is not a number"?"Passed":"Failed");
}

test();
test1();
test2();
