// To do: add keyboard functionality

const history = document.getElementById('history');
const total = document.getElementById('total');

const equation = () => {
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
  total.innerHTML = joinedTotal;
};

const logic = arr => {
  console.log(arr);
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
  total.innerHTML = '';
  history.innerHTML = '';
};

const clearTotal = () => {
  total.innerHTML = '';
};

const backspaceTotal = num => {
  for (let i = 0; i < num; i++) {
    total.innerHTML = total.innerHTML.substring(0, total.innerHTML.length - 1);
  }
};
