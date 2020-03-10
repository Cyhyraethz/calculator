// To do: prevent consecutive duplicates in history
// To do: add keyboard functionality to calculator
// To do: add error message when dividing by zero

const history = document.getElementById('history');
const total = document.getElementById('total');

const equation = () => {
  operateTemporary();
  if (!total.innerHTML) {
    return;
  } else {
    if (total.innerHTML[total.innerHTML.length - 1].search(/\d/) < 0) {
      backspaceTotal(3);
    }
    let oldTotal = total.innerHTML;
    let splitTotal = total.innerHTML.split(' ');
    logic(splitTotal);
    let joinedTotal =
      Math.round((parseFloat(splitTotal.join('')) + Number.EPSILON) * 10000) /
      10000;
    let recent = document.createElement('p');
    recent.innerHTML = oldTotal + ' = ' + joinedTotal;
    if (history.firstChild) {
      history.insertBefore(recent, history.firstChild);
    } else {
      history.appendChild(recent);
    }
    total.innerHTML = `<p id='temporary'>${joinedTotal}</p>`;
  }
};

const logic = arr => {
  if (arr[arr.length - 1] === '') {
    arr.splice(arr.length - 2, 2);
  }
  while (arr.length > 1) {
    if (arr.join(' ').search(/[*/]/) > -1) {
      let index = arr.join('').indexOf(/[*/]/);
      let num2 = arr.splice(index, 1);
      let operator = arr.splice(index, 1);
      let num1 = arr.splice(index, 1, 'placeholder');
      let newTotal = operate(operator, num1, num2);
      arr.splice(arr.indexOf('placeholder'), 1, newTotal.toString());
    } else {
      let num1 = arr.splice(0, 1);
      let operator = arr.splice(0, 1);
      let num2 = arr.splice(0, 1);
      let newTotal = operate(operator, num1, num2);
      arr.unshift(newTotal);
    }
  }
};

const operate = (operator, num1, num2) => {
  if (operator[0] === '+') {
    return parseFloat(num1) + parseFloat(num2);
  } else if (operator[0] === '-') {
    return parseFloat(num1) - parseFloat(num2);
  } else if (operator[0] === '*') {
    return parseFloat(num1) * parseFloat(num2);
  } else if (operator[0] === '/') {
    return parseFloat(num1) / parseFloat(num2);
  }
};

const num = num => {
  removeTemporary();
  let splitTotal = total.innerHTML.split(' ');
  if (
    splitTotal[splitTotal.length - 1][0] === '0' &&
    splitTotal[splitTotal.length - 1].indexOf('.') < 0 &&
    splitTotal[splitTotal.length - 1].indexOf(' ') < 0
  ) {
    splitTotal[splitTotal.length - 1] = num;
    total.innerHTML = splitTotal.join(' ');
  } else {
    total.innerHTML += num;
  }
};

const symbol = symbol => {
  operateTemporary();
  let currentNum = total.innerHTML.split(' ')[
    total.innerHTML.split(' ').length - 1
  ];
  if (!isNaN(parseFloat(currentNum))) {
    if (currentNum[currentNum.length - 1] === '.') {
      backspaceTotal();
    }
    total.innerHTML += ` ${symbol} `;
  }
};

const decimal = () => {
  operateTemporary();
  let currentNum = total.innerHTML.split(' ')[
    total.innerHTML.split(' ').length - 1
  ];
  if (currentNum.indexOf('.') < 0) {
    if (currentNum.length < 1) {
      total.innerHTML += '0.';
    } else {
      total.innerHTML += '.';
    }
  }
};

const clearAll = () => {
  removeTemporary();
  total.innerHTML = '';
  history.innerHTML = '';
};

const clearTotal = () => {
  removeTemporary();
  total.innerHTML = '';
};

const backspaceTotal = num => {
  operateTemporary();
  if (num) {
    while (num > 0) {
      total.innerHTML = total.innerHTML.substring(
        0,
        total.innerHTML.length - 1
      );
      num--;
    }
  } else {
    total.innerHTML = total.innerHTML.substring(0, total.innerHTML.length - 1);
  }
};

const removeTemporary = () => {
  if (Boolean(document.getElementById('temporary'))) {
    const temporary = document.getElementById('temporary');
    if (temporary.parentNode) {
      temporary.parentNode.removeChild(temporary);
    }
  }
};

const operateTemporary = () => {
  if (Boolean(document.getElementById('temporary'))) {
    const temporary = document.getElementById('temporary');
    const content = temporary.innerHTML;
    total.innerHTML = content;
    if (temporary.parentNode) {
      temporary.parentNode.removeChild(temporary);
    }
  }
};
