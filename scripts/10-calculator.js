function clearAll() {
    document.querySelector('.result').innerHTML = '';
    result = '';
}

let result = '';

function addToResult(value) {
    result += value;
    // console.log(result);
    document.querySelector('.result').innerHTML=result;
}

function doOperation() {
    const res = eval(result);
    // console.log(typeof res);
    result = String(res);

    document.querySelector('.result').innerHTML=result;
}