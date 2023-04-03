document.getElementById("add").addEventListener("click", add);
document.getElementById("subtract").addEventListener("click", subtract);
document.getElementById("multiply").addEventListener("click", multiply);
document.getElementById("divide").addEventListener("click", divide);

function add() {
    var firstNumber = parseInt(document.getElementById("firstNumber").value);
    var secondNumber = parseInt(document.getElementById("secondNumber").value);
    var result = firstNumber + secondNumber;
    document.getElementById("result").value = result;
    document.getElementById("firstNumber").value = "";
    document.getElementById("secondNumber").value = "";
}

function subtract() {
    var firstNumber = parseInt(document.getElementById("firstNumber").value);
    var secondNumber = parseInt(document.getElementById("secondNumber").value);
    var result = firstNumber - secondNumber;
    document.getElementById("result").value = result;
    document.getElementById("firstNumber").value = "";
    document.getElementById("secondNumber").value = "";
}

function multiply() {
    var firstNumber = parseInt(document.getElementById("firstNumber").value);
    var secondNumber = parseInt(document.getElementById("secondNumber").value);
    var result = firstNumber * secondNumber;
    document.getElementById("result").value = result;
    document.getElementById("firstNumber").value = "";
    document.getElementById("secondNumber").value = "";
}

function divide() {
    var firstNumber = parseInt(document.getElementById("firstNumber").value);
    var secondNumber = parseInt(document.getElementById("secondNumber").value);
    var result = firstNumber / secondNumber;
    document.getElementById("result").value = result;
    document.getElementById("firstNumber").value = "";
    document.getElementById("secondNumber").value = "";
}
