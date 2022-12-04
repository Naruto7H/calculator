const displayScreen = document.querySelector<HTMLInputElement>('.screen-z');
const inputField = document.querySelector('.input-field');
const allButtons = document.querySelectorAll('.buttons');
const equalButton = document.querySelectorAll('.buttons')[19];


allButtons.forEach(btn => btn.addEventListener('click', getResult));


let impVal: string[] = []
let result: string[];
let result2: string[];
let final: string;
let txt = '';
let isLastInputOperator = false
let currentIndex = 0;
let trash: number[] = [];

function getResult(e: any) {
    const ele = e.target.innerText;

    if (!(/[-=x+%÷/]/).test(ele)) {
        impVal[currentIndex] === undefined ? impVal[currentIndex] = ele : impVal[currentIndex] += ele
        txt += ele
        isLastInputOperator = false;
    }
    if ((/[-x+%÷]/).test(ele) && !(/[+-]/).test(ele)) {
        isLastInputOperator === true ? impVal.pop() : currentIndex += 2;
        impVal.push(ele)
        isLastInputOperator = true;
        txt += ele
    }
    if ((/\//).test(ele)) console.log(`${parseFloat(impVal[currentIndex])*-1} hahah`)

    if ((/=/).test(ele)) {
        result = impVal.map((i, ind) => i = (/[x%÷]/).test(i) ? evaluateP0(i, ind) : i)
        trash.reverse()
        trash.forEach(t => result.splice(t, 1))
        result2 = result.map((i, ind) => (/[-+]/).test(i) ? evaluateP1(i, ind) : i)

        displayScreen!.value = result2[result2.length-1]
    }
    console.log(ele);
    console.log(...impVal);
    console.log(result);
    console.log(result2);
    
}

function evaluateP0(i: string, ind: number) {
    let returnVal = i;
    let [a, b] = [parseFloat(impVal[ind-1]), parseFloat(impVal[ind+1])]
    if (i === "x") returnVal = `${a * b}`
    if (i === "÷") returnVal = `${(a / b).toFixed(5)}`
    if (i === "%") returnVal = `${a % b}`
    impVal[ind+1] = returnVal
    trash.push(ind - 1)
    trash.push(ind)
    return returnVal;
}

function evaluateP1(i: string, ind: number) {
    let returnVal = i;
    let [a, b] = [parseFloat(result[ind-1]), parseFloat(result[ind+1])]
    if (i === "-") returnVal = `${a - b}`
    if (i === "+") returnVal = `${a + b}`
    result[ind+1] = returnVal
    return returnVal;
}