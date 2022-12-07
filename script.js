const displayScreen = document.querySelector('.output');
const inputField = document.querySelector('.input-field');
const allButtons = document.querySelectorAll('.buttons');
const equalButton = document.querySelectorAll('.eq');
const input = document.querySelector(".num");
allButtons.forEach(btn => btn.addEventListener('click', getResult));
let final;
let garbage = [];
let expr = [];
let isLastInputOperator = false;
let lastIndex = 0;
let isLastPoint = false;
function getResult(e) {
    const ele = e.target.innerText;
    console.log(expr);
    // Push element in array if its a number
    if ((/[0-9]/).test(ele)) {
        !(/[0-9]/).test(expr[lastIndex]) ? expr.push(ele) : expr[lastIndex] += ele;
        isLastInputOperator = false;
        calculate(expr);
    }
    if (ele === "C") {
        expr = [];
        lastIndex = 0;
    }
    del(ele);
    if (ele === "." && !isLastPoint) {
        expr[lastIndex] ? expr.push(ele) : expr[lastIndex] += ele;
        isLastPoint = true;
    }
    // if the pressed button is an operator btn then push it into the array
    // if there is already an operator in arr then pop it and push new one
    if ((/[-x+%÷]/).test(ele) && !(/\//).test(ele)) {
        isLastInputOperator === true ? expr.pop() : lastIndex += 2;
        if (expr[0]) {
            expr.push(ele);
            isLastInputOperator = true;
            isLastPoint = false;
        }
    }
    if ((/\//).test(ele) && !isLastInputOperator) {
        expr[lastIndex] = `${parseFloat(expr[lastIndex]) * -1}`;
        calculate(expr);
    }
    if (ele === "=" && !isLastInputOperator)
        calculate(expr);
    input.value = expr.join("");
}
function del(ele) {
    if (ele === "del" && expr[0]) {
        if (expr[lastIndex].length === 1) {
            expr.splice(-1, 1);
            lastIndex -= 1;
            isLastInputOperator = !isLastInputOperator;
        }
        else {
            expr[lastIndex] = expr[lastIndex].slice(0, -1);
            console.log(expr[lastIndex].slice(0, -1));
            calculate(expr);
        }
    }
}
function calculate(arr) {
    let pr0 = arr.slice();
    let pr1 = pr0.map((i, ind) => i = (/[x%÷]/).test(i) ? evaluateP0(i, ind, pr0) : i);
    garbage.reverse().forEach(t => pr1.splice(t, 1));
    // cant use regexp here because if value it negative it will evaluate
    // the (/[-+]/).text(ele) as true because there is a negative there
    // result2 = result.map((i, ind) => !(/0-9/).test(i) ? evaluateP1(i, ind) : i);
    // OR
    let pr2 = pr1.map((i, ind) => !(/[0-9]/).test(i) ? evaluateP1(i, ind, pr1) : i);
    displayScreen.innerText = pr2[pr2.length - 1];
    if (!expr[0])
        displayScreen.innerText = '0';
    console.log(pr2[pr2.length - 1, "p-1"]);
    garbage = [];
}
function evaluateP0(i, ind, arr) {
    let returnVal = i;
    let [a, b] = [parseFloat(arr[ind - 1]), parseFloat(arr[ind + 1])];
    if (i === "x")
        returnVal = `${a * b}`;
    if (i === "÷")
        returnVal = `${(a / b).toFixed(5)}`;
    if (i === "%")
        returnVal = `${a % b}`;
    arr[ind + 1] = returnVal;
    garbage.push(ind - 1);
    garbage.push(ind);
    return returnVal;
}
function evaluateP1(i, ind, arr2) {
    let returnVal = i;
    let [a, b] = [parseFloat(arr2[ind - 1]), parseFloat(arr2[ind + 1])];
    if (i === "-")
        returnVal = `${a - b}`;
    if (i === "+")
        returnVal = `${a + b}`;
    arr2[ind + 1] = returnVal;
    return returnVal;
}
//# sourceMappingURL=script.js.map