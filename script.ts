const displayScreen = document.querySelector<HTMLDivElement>('.output');
const inputField = document.querySelector('.input-field');
const allButtons = document.querySelectorAll('.buttons');
const equalButton = document.querySelectorAll('.eq');
const input = document.querySelector<HTMLInputElement>(".num");

allButtons.forEach(btn => btn.addEventListener('click', getResult));



let final: string;
let trash: number[] = [];
let expr: string[] = []
let isLastInputOperator = false;
let lastIndex = 0;
let isLastPoint = false;


function getResult(e: any) {
    const ele = e.target.innerText;
    console.log(expr);

    // Push element in array if its a number
    if (!(/[-=x+%÷C]/).test(ele) && (/[0-9]/).test(ele)) {
        !(/[0-9]/).test(expr[lastIndex]) ? expr.push(ele) : expr[lastIndex] += ele
        isLastInputOperator = false;
        calculate(expr)
    }
    if (ele === "del") {
        if (expr[lastIndex].length === 1) {
            expr.splice(-1, 1);
            lastIndex -= 1;
            isLastInputOperator = !isLastInputOperator;
            console.log("deleted");

        } else {
            expr[lastIndex] = expr[lastIndex].slice(0, -1);
        }
    }
    if ((/./).test(ele) && !isLastPoint && !expr[lastIndex] === undefined) {
        expr[lastIndex] += ele;
        isLastPoint = true;
        console.log('haha');
    }

    // if the pressed button is an operator btn then push it into the array
    // if there is already an operator in arr then pop it and push new one
    if ((/[-x+%÷]/).test(ele) && !(/\//).test(ele)) {
        isLastInputOperator === true ? expr.pop() : lastIndex += 2;
        if (expr[0]) {
            expr.push(ele)
            isLastInputOperator = true;
        }
    }

    if ((/\//).test(ele)) {
        expr[lastIndex] = `${parseFloat(expr[lastIndex]) * -1}`
        calculate(expr)
    }
    if ((/=/).test(ele) && !isLastInputOperator) calculate(expr)
    input.value = expr.join("")
}

function calculate(arr: string[]) {
    let pr0 = arr.slice()
    let pr1 = pr0.map((i, ind) => i = (/[x%÷]/).test(i) ? evaluateP0(i, ind, pr0) : i)
    trash.reverse().forEach(t => pr1.splice(t, 1));
    // cant use regexp here because if value it negative it will evaluate
    // the (/[-+]/).text(ele) as true because there is a negative there
    // result2 = result.map((i, ind) => !(/0-9/).test(i) ? evaluateP1(i, ind) : i);
    // OR
    let pr2 = pr1.map((i, ind) => !(/[0-9]/).test(i) ? evaluateP1(i, ind, pr1) : i);
    displayScreen.innerText = pr2[pr2.length - 1];
    trash = []
    console.log(expr, "expr");
    console.log(pr1, "pr1");
    console.log(pr2, "pr2");
}

function evaluateP0(i: string, ind: number, arr: string[]) {
    let returnVal = i;
    let [a, b] = [parseFloat(arr[ind - 1]), parseFloat(arr[ind + 1])]
    if (i === "x") returnVal = `${a * b}`
    if (i === "÷") returnVal = `${(a / b).toFixed(5)}`
    if (i === "%") returnVal = `${a % b}`
    arr[ind + 1] = returnVal
    trash.push(ind - 1)
    trash.push(ind)
    return returnVal;
}

function evaluateP1(i: string, ind: number, arr2: string[]) {
    let returnVal = i;
    let [a, b] = [parseFloat(arr2[ind - 1]), parseFloat(arr2[ind + 1])]
    if (i === "-") returnVal = `${a - b}`
    if (i === "+") returnVal = `${a + b}`
    arr2[ind + 1] = returnVal;
    return returnVal;
}